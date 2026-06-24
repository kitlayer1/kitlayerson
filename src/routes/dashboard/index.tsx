import { component$, useStore, useVisibleTask$, $, useSignal, useStyles$ } from '@builder.io/qwik';
import style0 from "./dashboard.css?inline";
import { supabase } from "~/lib/supabaseClient";
import { DashboardHeader } from "./header/dashboardHeader";
import { LogoPreviewModal } from "./previewModal/previewModal";
import { DashboardButton } from "./button/dashboardButtons";
import { adjustSvgLayout } from "~/routes/app/logoUtils";

export default component$(() => {
  useStyles$(style0);

  const state = useStore({
    user: null as { id: string; name: string } | null,
    logos: [] as any[],
    showAll: false,
    selectedLogo: null as any | null,
  });

  // Modal kapanmasını zorla tetiklemek için
  const modalKey = useSignal(0);

  const loadLogos = $(async () => {
    if (!state.user?.id) return;

    const { data, error } = await supabase
      .from("logo_sessions")
      .select("*")
      .eq("user_id", state.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Logo yüklenemedi:", error);
      return;
    }

    state.logos = (data || []).map((logo) => ({
      ...logo,
      preview_svg: logo.logo_svg_color || logo.logo_svg || "",
    }));
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const { data: authData } = await supabase.auth.getSession();
    const session = authData.session;

    if (!session?.user) {
      window.location.href = "/login";
      return;
    }

    state.user = {
      id: session.user.id,
      name: session.user.user_metadata?.full_name || "Kullanıcı",
    };

    await loadLogos();
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const refreshOnFocus = () => loadLogos();

    window.addEventListener("focus", refreshOnFocus);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) refreshOnFocus();
    });

    return () => {
      window.removeEventListener("focus", refreshOnFocus);
    };
  });

  const sanitizeSvg = (svg: string): string => {
    if (!svg) return "";
    let cleaned = svg.trim();

    if (!cleaned.includes('xmlns="http://www.w3.org/2000/svg"')) {
      cleaned = cleaned.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    cleaned = adjustSvgLayout(cleaned);

    return cleaned
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "");
  };

  const extractBgColor = (svg: string): string => {
    if (!svg) return "var(--color-bg-white)";
    const match = svg.match(/<rect[^>]*fill="([^"]+)"/);
    return match ? match[1] : "var(--color-bg-white)";
  };

  const visibleLogos = state.showAll ? state.logos : state.logos.slice(0, 10);

  return (
    <div class="settings-layout">
      <main class="dashboard-content">
        <DashboardHeader />

        <div class="dashboard-container">
          <DashboardButton />

          <div class="section">
            <div class="logos-grid">
              {/* Yeni Logo Oluşturma Kartı */}
              <div
                class="logo-card"
                onClick$={() => (window.location.href = "/app?reset=true")}
              >
                <div class="logo-preview" style="background: white; border: 1px solid #E0E0E0;">
                  <div class="fallback-svg" style="background: transparent;">
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 50px; height: 50px; color: #B2B2B2;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus">
                      <path d="M5 12h14"/>
                      <path d="M12 5v14"/>
                    </svg>
                  </div>
                </div>
                <div class="logo-footer">
                  <span class="logo-name">Create new logo</span>
                </div>
              </div>

              {/* Logo kartları */}
              {visibleLogos.map((logo) => {
                const date = new Date(logo.created_at || Date.now());
                const diffTime = Math.abs(Date.now() - date.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                let timeText = `created ${diffDays} days ago`;
                if (diffDays === 0) timeText = "created today";
                if (diffDays === 1) timeText = "created 1 day ago";

                return (
                  <div
                    class="logo-card"
                    key={logo.id}
                    onClick$={() => {
                      state.selectedLogo = logo;
                      modalKey.value++;
                    }}
                  >
                    <div class="logo-preview" style={{ background: extractBgColor(logo.preview_svg || "") }}>
                      {logo.paid && <span class="premium-badge">PRO</span>}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                        opacity: 0.04,
                        fontSize: '3rem',
                        fontWeight: '900',
                        color: '#000',
                        transform: 'rotate(-30deg)',
                        whiteSpace: 'nowrap',
                        userSelect: 'none',
                        zIndex: 10,
                        fontFamily: 'sans-serif'
                      }}>kitlayer</div>
                      {sanitizeSvg(logo.preview_svg || "") ? (
                        <div
                          class="svg-wrapper"
                          dangerouslySetInnerHTML={sanitizeSvg(logo.preview_svg)}
                        />
                      ) : (
                        <div class="fallback-svg">
                          <svg viewBox="0 0 200 200">
                            <rect width="200" height="200" fill="#f3f4f6" />
                            <text x="100" y="105" text-anchor="middle" font-size="64" fill="#9ca3af">?</text>
                          </svg>
                        </div>
                      )}
                    </div>

                    <div class="logo-footer">
                      <span class="logo-name">{logo.brand_name || "Untitled"}</span>
                      <span class="logo-date">{timeText}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {state.logos.length > 10 && (
              <div class="see-all-container">
                <button
                  class="see-all-btn"
                  onClick$={() => (state.showAll = !state.showAll)}
                >
                  {state.showAll ? "See Less" : "See All"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Logo Preview Modal - key ile force re-render */}
      {state.selectedLogo && (
        <LogoPreviewModal
          key={modalKey.value} // ← Bu satır çok önemli!
          logo={state.selectedLogo}
          onClose$={() => {
            console.log("Modal kapatılıyor → selectedLogo null");
            state.selectedLogo = null;
              console.log("state.selectedLogo", state.selectedLogo);
            modalKey.value++; // Kapatıldıktan sonra key değişsin (temizlik)
          }}
        />
      )}
    </div>
  );
});