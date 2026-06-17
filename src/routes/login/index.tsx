import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { supabase } from "~/lib/supabaseClient";
import { useLocation } from "@builder.io/qwik-city";
import "./login.css";

export default component$(() => {
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
    loading.value = true;
    error.value = null;

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      error.value = "Kullanıcı bulunamadı.";
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
              >
                <img src="https://www.vectorlogo.zone/logos/google/google-tile.svg" alt="Google" width="28" height="28" />
                Continue with Google
              </button>

              <button
                class="facebook-btn"
                disabled={loading.value}
                onClick$={() => handleOAuthLogin("facebook")}
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
            <div class="otp-section">
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
                />

                <div class="otp-timer-badge">
                  {resendCooldown.value > 0 ? (
                    <span>{resendCooldown.value}</span>
                  ) : (
                    <button class="otp-resend-inline-btn" onClick$={handleResend}>
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
              >
                Continue
              </button>
            </div>
          )}

          {step.value === "profile" && (
            <div class="otp-section">
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
              />
              <input
                type="text"
                class="email-input"
                placeholder="Surname (Optional)"
                value={surname.value}
                onInput$={(e) =>
                  (surname.value = (e.target as HTMLInputElement).value)
                }
              />

              {error.value && <p class="error-text">{error.value}</p>}

              <button
                class="continue-btn"
                disabled={loading.value}
                onClick$={handleProfileSave}
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