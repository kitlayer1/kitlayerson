import { component$, useSignal, $, useVisibleTask$, useStyles$ } from '@builder.io/qwik';
import { supabase } from "~/lib/supabaseClient";
import { useLocation } from "@builder.io/qwik-city";
import style0 from "./login.css?inline";

export default component$(() => {
  useStyles$(style0);

  const loc = useLocation();
  const step = useSignal<"email" | "otp" | "profile">("email");
  const email = useSignal("");
  const otp = useSignal("");
  const name = useSignal("");
  const surname = useSignal("");
  const loading = useSignal(false);
  const error = useSignal<string | null>(null);
  const resendCooldown = useSignal(0);

  // Giriş yapmadan önceki sayfayı al
  const redirectTo = loc.url.searchParams.get("redirect") || "/";

  const handleEmailLogin = $(async () => {
    if (loading.value) return;
    loading.value = true;
    error.value = null;

    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: { shouldCreateUser: true },
    });

    loading.value = false;

    if (err) {
      error.value = err.message;
    } else {
      step.value = "otp";
      if (resendCooldown.value <= 0) {
        resendCooldown.value = 60;
        const timer = setInterval(() => {
          resendCooldown.value -= 1;
          if (resendCooldown.value <= 0) clearInterval(timer);
        }, 1000);
      }
    }
  });

  const handleOtpVerify = $(async () => {
    if (loading.value) return;
    loading.value = true;
    error.value = null;

    const { data, error: err } = await supabase.auth.verifyOtp({
      email: email.value,
      token: otp.value,
      type: "email",
    });

    loading.value = false;
    if (err) {
      error.value = err.message;
      return;
    }

    const user = data?.user;
    if (user) {
      const { data: profileData, error: profileErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileErr && profileErr.code !== "PGRST116") {
        error.value = profileErr.message;
        return;
      }

      if (profileData) {
        window.location.href = redirectTo;
      } else {
        step.value = "profile";
      }
    }
  });

  const handleOAuthLogin = $(async (provider: "google" | "facebook") => {
    if (loading.value) return;
    loading.value = true;
    error.value = null;

    const { error: err } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/login?redirect=${encodeURIComponent(redirectTo)}`,
      },
    });

    loading.value = false;
    if (err) error.value = err.message;
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const { data, error: err } = await supabase.auth.getUser();
    if (err || !data?.user) return;

    const user = data.user;

    if (step.value === "otp" || step.value === "profile") return;

    const fullName =
      user.user_metadata?.full_name ||
      `${user.user_metadata?.name || ""} ${user.user_metadata?.surname || ""
        }`.trim();

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileData) {
      window.location.href = redirectTo;
      return;
    }

    await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      full_name: fullName || "",
      updated_at: new Date().toISOString(),
    });

    window.location.href = redirectTo;
  });

  const handleProfileSave = $(async () => {
    if (loading.value) return;
    loading.value = true;
    error.value = null;

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      error.value = "User not found.";
      loading.value = false;
      return;
    }

    const { error: err } = await supabase.from("profiles").upsert({
      id: user.id,
      email: email.value,
      full_name: `${name.value} ${surname.value}`.trim(),
      updated_at: new Date().toISOString(),
    });

    loading.value = false;

    if (err) error.value = err.message;
    else window.location.href = redirectTo;
  });

  const handleResend = $(async () => {
    if (resendCooldown.value > 0) return;
    await handleEmailLogin();
  });

  return (
    <div class="login-container">
      <div class="login-left">
        <div class="login-content">
          <div class="logo">Kitlayer.</div>

          {step.value === "email" && (
            <>
              <h1 class="welcome-text">Log in or register</h1>
              <p class="info-texts">Welcome back! Please enter your details.</p>


              <button
                class="google-btn"
                disabled={loading.value}
                onClick$={() => handleOAuthLogin("google")}
                data-mcp-action="oauth-google"
                data-mcp-label="Continue with Google"
              >
                <img src="https://www.vectorlogo.zone/logos/google/google-tile.svg" alt="Google" width="28" height="28" />
                Continue with Google
              </button>

              <button
                class="facebook-btn"
                disabled={loading.value}
                onClick$={() => handleOAuthLogin("facebook")}
                data-mcp-action="oauth-facebook"
                data-mcp-label="Continue with Facebook"
              >
                <img src="https://www.svgrepo.com/show/452196/facebook-1.svg" alt="Facebook" width="28" height="28" />
                Continue with Facebook
              </button>

              <div class="divider">
                <span>or</span>
              </div>

              <input
                type="email"
                class={`email-input ${error.value ? "input-error" : ""}`}
                placeholder="Enter your email address"
                value={email.value}
                onInput$={(e) =>
                  (email.value = (e.target as HTMLInputElement).value)
                }
                data-mcp-form="login-email"
                data-mcp-field="email"
                data-mcp-label="Email Address"
                data-mcp-required="true"
                data-mcp-description="Step 1 of 3: Enter email to receive a one-time passcode"
              />

              {error.value && (
                <div class="error-box">
                  {error.value}
                </div>
              )}

              <button
                class="continue-btn"
                disabled={loading.value || !email.value}
                onClick$={handleEmailLogin}
                data-mcp-action="submit-email"
                data-mcp-label="Continue with Email"
              >
                Continue
              </button>

              <p class="terms">
                By continuing, you agree to our{" "}
                <a
                  href="/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>.
              </p>
            </>
          )}

          {step.value === "otp" && (
            <div
              class="otp-section"
              data-mcp-form="login-otp"
              data-mcp-description="Step 2 of 3: Enter the 6-digit OTP code sent to the user's email"
            >
              <h2 class="welcome-text">Enter your code</h2>
              <p class="info-text">
                <span class="email-text">{email.value}</span>{" "}
                <span class="gray-text">We've sent a code to your address.</span>
              </p>

              <div class={`otp-input-wrapper ${error.value ? "input-error" : ""}`}>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  class="otp-single-input"
                  placeholder="OTP"
                  value={otp.value}
                  onInput$={(e) =>
                    (otp.value = (e.target as HTMLInputElement).value)
                  }
                  data-mcp-field="otp"
                  data-mcp-label="One-Time Passcode"
                  data-mcp-required="true"
                />

                <div class="otp-timer-badge">
                  {resendCooldown.value > 0 ? (
                    <span>{resendCooldown.value}</span>
                  ) : (
                    <button
                      class="otp-resend-inline-btn"
                      onClick$={handleResend}
                      data-mcp-action="resend-otp"
                      data-mcp-label="Resend OTP Code"
                    >
                      Resend Code
                    </button>
                  )}
                </div>
              </div>

              {error.value && (
                <div class="error-box">
                  {error.value}
                </div>
              )}

              <button
                class="continue-btn otp-btn"
                disabled={loading.value || otp.value.length !== 6}
                onClick$={handleOtpVerify}
                data-mcp-action="verify-otp"
                data-mcp-label="Verify OTP and Continue"
              >
                Continue
              </button>
            </div>
          )}

          {step.value === "profile" && (
            <div
              class="otp-section"
              data-mcp-form="login-profile"
              data-mcp-description="Step 3 of 3: New user profile setup — enter name and surname"
            >
              <h2 class="welcome-text">Welcome</h2>
              <p class="info-text">Please fill in your details.</p>

              <input
                type="text"
                class="email-input"
                placeholder="Name"
                value={name.value}
                onInput$={(e) =>
                  (name.value = (e.target as HTMLInputElement).value)
                }
                data-mcp-field="name"
                data-mcp-label="First Name"
                data-mcp-required="true"
              />
              <input
                type="text"
                class="email-input"
                placeholder="Surname (Optional)"
                value={surname.value}
                onInput$={(e) =>
                  (surname.value = (e.target as HTMLInputElement).value)
                }
                data-mcp-field="surname"
                data-mcp-label="Surname"
                data-mcp-required="false"
              />

              {error.value && <p class="error-text">{error.value}</p>}

              <button
                class="continue-btn"
                disabled={loading.value}
                onClick$={handleProfileSave}
                data-mcp-action="save-profile"
                data-mcp-label="Save Profile and Continue"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>

      <div class="login-right">
        <div class="mockup-grid">
          {/* eslint-disable-next-line qwik/jsx-img */}
          <img src="/images/login/login.webp" alt="Login mockup" class="mockup-image" width="600" height="400" />
        </div>
      </div>
    </div>
  );
});