import { component$, useSignal, $, QRL, useStyles$ } from '@builder.io/qwik';
import { supabase } from "~/lib/supabaseClient";
import style0 from "./LoginModal.css?inline";

interface LoginModalProps {
  onClose$: QRL<() => void>;
  onSuccess$: QRL<() => void>;
  redirectUrl?: string;
}

export const LoginModal = component$<LoginModalProps>((props) => {
  useStyles$(style0);

  const step = useSignal<"email" | "otp" | "profile">("email");
  const email = useSignal("");
  const otp = useSignal("");
  const name = useSignal("");
  const surname = useSignal("");
  const loading = useSignal(false);
  const error = useSignal<string | null>(null);
  const resendCooldown = useSignal(0);

  const handleEmailLogin = $(async () => {
    if (!email.value) return;
    if (loading.value) return;
    loading.value = true;
    error.value = null;

    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: { shouldCreateUser: true },
    });

    loading.value = false;

    if (err) error.value = err.message;
    else step.value = "otp";
  });

  const handleOtpVerify = $(async () => {
    if (otp.value.length !== 6) return;
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
        props.onSuccess$();
      } else {
        step.value = "profile";
      }
    }
  });

  const handleOAuthLogin = $(async (provider: "google" | "facebook") => {
    if (loading.value) return;
    loading.value = true;
    error.value = null;

    // Preserve the current URL with all query parameters for redirect
    const currentUrl = props.redirectUrl || window.location.href;
    const redirectUrl = `${window.location.origin}/login?redirect=${encodeURIComponent(currentUrl)}`;

    const { error: err } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
      },
    });

    loading.value = false;
    if (err) error.value = err.message;
  });

  const handleProfileSave = $(async () => {
    if (loading.value) return;
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
    else props.onSuccess$();
  });

  const handleResend = $(async () => {
    if (resendCooldown.value > 0) return;
    resendCooldown.value = 30;

    await handleEmailLogin();

    const timer = setInterval(() => {
      resendCooldown.value -= 1;
      if (resendCooldown.value <= 0) clearInterval(timer);
    }, 1000);
  });

  return (
    <div class="login-modal-overlay">
      <div class="login-modal-backdrop" onClick$={() => props.onClose$()} />
      <div class="login-modal-container">
        <button class="login-modal-close" onClick$={() => props.onClose$()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        
        <div class="login-modal-content">
          <div class="login-modal-logo">Kitlayer.</div>
          
          {step.value === "email" && (
            <>
              <h1 class="login-modal-title">Welcome Back</h1>
              <p class="login-modal-desc">
                hesabın varsa giriş yapabilir veya e-posta adresini girerek hesap oluşturabilirsin
              </p>

              {error.value && <p class="login-modal-error">{error.value}</p>}

              <button
                class="login-modal-oauth-btn"
                disabled={loading.value}
                onClick$={() => handleOAuthLogin("google")}
              >
                <img src="https://www.vectorlogo.zone/logos/google/google-tile.svg" alt="Google" width="24" height="24" />
                Google ile giriş
              </button>

              <button
                class="login-modal-oauth-btn"
                disabled={loading.value}
                onClick$={() => handleOAuthLogin("facebook")}
              >
                <img src="https://www.svgrepo.com/show/452196/facebook-1.svg" alt="Facebook" width="24" height="24" />
                Facebook ile giriş
              </button>

              <div class="login-modal-divider">
                <span>veya</span>
              </div>

              <input
                type="email"
                class="login-modal-input"
                placeholder="e-mail"
                value={email.value}
                onInput$={(e) => (email.value = (e.target as HTMLInputElement).value)}
              />

              <button
                class="login-modal-submit-btn"
                disabled={loading.value || !email.value}
                onClick$={handleEmailLogin}
              >
                {loading.value ? "Giriş yapılıyor..." : "Giriş yap"}
              </button>
            </>
          )}

          {step.value === "otp" && (
            <div class="login-modal-otp-section">
              <h2 class="login-modal-title">Enter Your Code</h2>
              <p class="login-modal-info">
                <strong>{email.value}</strong> We've sent a code to your address.
              </p>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                class="login-modal-otp-input"
                placeholder="------"
                value={otp.value}
                onInput$={(e) => (otp.value = (e.target as HTMLInputElement).value)}
              />

              {error.value && <p class="login-modal-error">{error.value}</p>}

              <button
                class="login-modal-submit-btn"
                disabled={loading.value || otp.value.length !== 6}
                onClick$={handleOtpVerify}
              >
                {loading.value ? "Verifying..." : "Continue"}
              </button>

              <button
                class="login-modal-resend-btn"
                disabled={resendCooldown.value > 0}
                onClick$={handleResend}
              >
                {resendCooldown.value > 0 ? `Resend (${resendCooldown.value}s)` : "Resend Code"}
              </button>
            </div>
          )}

          {step.value === "profile" && (
            <div class="login-modal-otp-section">
              <h2 class="login-modal-title">Welcome</h2>
              <p class="login-modal-info">Please fill in your details.</p>

              <input
                type="text"
                class="login-modal-input"
                placeholder="Name"
                value={name.value}
                onInput$={(e) => (name.value = (e.target as HTMLInputElement).value)}
              />
              <input
                type="text"
                class="login-modal-input"
                placeholder="Surname (Optional)"
                value={surname.value}
                onInput$={(e) => (surname.value = (e.target as HTMLInputElement).value)}
              />

              {error.value && <p class="login-modal-error">{error.value}</p>}

              <button
                class="login-modal-submit-btn"
                disabled={loading.value}
                onClick$={handleProfileSave}
              >
                {loading.value ? "Saving..." : "Continue"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
