import { component$, useSignal, useComputed$, $, useOnDocument, useVisibleTask$, type PropFunction, useStyles$ } from '@builder.io/qwik';
import style0 from "./previewModal.css?inline";
import { DownloadModal } from "../../../components/editor/Modal/downloadModal";
import { PricingModal } from "~/components/pricing/pricingModal";
import { adjustSvgLayout } from "~/routes/app/logoUtils";

type LogoMode = "color" | "black" | "white" | "transparent" | "invert";

export const LogoPreviewModal = component$(
  (props: {
    logo: {
      id: string;
      brand_name: string;
      logo_svg_color?: string;
      logo_svg_black?: string;
      logo_svg_white?: string;
      logo_svg_transparent?: string;
      logo_svg_invert?: string;
      palette?: string | any;
      plan_type?: string;
      paid?: boolean;
      created_at?: string;
    };
    onClose$: PropFunction<() => void>;
  }) => {
  useStyles$(style0);

    const { logo, onClose$ } = props;
    const mode = useSignal<LogoMode>("color");
    const scrollPosition = useSignal(0);
    const showDownloadModal = useSignal(false);
    const showPricingModal = useSignal(false);
    const downloadBtnRef = useSignal<Element | undefined>();

    const currentSvg = useComputed$(() => {
      let rawSvg = "";
      switch (mode.value) {
        case "black":
          rawSvg = logo?.logo_svg_black || logo?.logo_svg_color || "";
          break;
        case "white":
          rawSvg = logo?.logo_svg_white || logo?.logo_svg_color || "";
          break;
        case "transparent":
          rawSvg = logo?.logo_svg_transparent || logo?.logo_svg_color || "";
          break;
        case "invert":
          rawSvg = logo?.logo_svg_invert || logo?.logo_svg_color || "";
          break;
        default:
          rawSvg = logo?.logo_svg_color || "";
          break;
      }
      return adjustSvgLayout(rawSvg);
    });

    const generateSvg = $(async (svgMode?: string) => {
      let rawSvg = "";
      switch (svgMode) {
        case "black":
          rawSvg = logo?.logo_svg_black || logo?.logo_svg_color || "";
          break;
        case "white":
          rawSvg = logo?.logo_svg_white || logo?.logo_svg_color || "";
          break;
        case "transparent":
          rawSvg = logo?.logo_svg_transparent || logo?.logo_svg_color || "";
          break;
        case "invert":
          rawSvg = logo?.logo_svg_invert || logo?.logo_svg_color || "";
          break;
        default:
          rawSvg = logo?.logo_svg_color || "";
          break;
      }
      return adjustSvgLayout(rawSvg);
    });

    const hasSvg = useComputed$(() => !!currentSvg.value);

    const extractBgColor = (svg: string): string => {
      if (!svg) return "var(--color-bg-white)";
      const match = svg.match(/<rect[^>]*fill="([^"]+)"/);
      return match ? match[1] : "var(--color-bg-white)";
    };

    // Scroll'u engelle
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      scrollPosition.value = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
      document.body.classList.add('modal-open');
      document.body.style.top = `-${scrollPosition.value}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';

      const preventTouch = (e: TouchEvent) => { e.preventDefault(); };
      document.addEventListener('touchmove', preventTouch, { passive: false });

      return () => {
        document.body.classList.remove('modal-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.height = '';
        document.body.style.overflow = '';
        document.removeEventListener('touchmove', preventTouch);
        window.scrollTo(0, scrollPosition.value);
      };
    });

    // ESC tuşu ile kapatma
    useOnDocument("keydown", $((event: KeyboardEvent) => { if (event.key === "Escape") onClose$(); }));

    return (
      <div class="logo-preview-overlay" onClick$={(e) => { if (e.target === e.currentTarget) onClose$(); }}>
        <div class="logo-preview-modal" onClick$={(e) => e.stopPropagation()}>
          
          {/* HEADER */}
          <div class="modal-header">
            <div class="header-left">
              <div class="header-logo-info">
                <div class="header-icon">
                  <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 24.1352C0 25.8013 1.35069 27.152 3.01684 27.152H21.1178C22.784 27.152 24.1347 25.8013 24.1347 24.1352V7.54258L16.5926 0.000488281H3.01684C1.35069 0.000488281 0 1.35117 0 3.01732V24.1352Z" fill="#7C7D89"/>
                    <path opacity="0.8" d="M16.5918 4.52525C16.5918 6.1914 17.9425 7.54208 19.6086 7.54208H24.1339L16.5918 0V4.52525Z" fill="#ABADBC"/>
                    <path opacity="0.9" d="M12.5904 12.7762V10.6828H10.5586V8.58968H12.5904V6.49625H10.5586V4.40281H12.5904V2.30974H10.5586V0.216309H12.5904V2.30974H14.6221V4.40281H12.5904V6.49625H14.6221V8.58968H12.5904V10.6828H14.6221V18.6867H10.5586V12.7762H12.5904ZM13.8833 14.9927H11.2974V17.9479H13.8833V14.9927Z" fill="white"/>
                  </svg>
                </div>
                <div class="header-texts">
                  <h3>{logo.brand_name || "Kitlayer"}</h3>
                  <span class="header-date">
                    Crated: {logo.created_at ? new Date(logo.created_at).toLocaleDateString() : "21.02.2026"}
                  </span>
                </div>
              </div>
            </div>
            <div class="header-right">
              {!logo.paid && (
                <button class="upgrade-btn-header" onClick$={() => (showPricingModal.value = true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-fading-arrow-up-icon lucide-circle-fading-arrow-up"><path d="M12 2a10 10 0 0 1 7.38 16.75"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/><path d="M2.5 8.875a10 10 0 0 0-.5 3"/><path d="M2.83 16a10 10 0 0 0 2.43 3.4"/><path d="M4.636 5.235a10 10 0 0 1 .891-.857"/><path d="M8.644 21.42a10 10 0 0 0 7.631-.38"/></svg>
                  <span>Upgrade</span>
                </button>
              )}
              <button 
                ref={downloadBtnRef}
                class="download-btn-header" 
                onClick$={() => (showDownloadModal.value = true)}
              >
                <span>Download</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div class="header-divider"></div>
              <button class="close-btn-header" onClick$={onClose$}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>
          </div>

          {/* BODY */}
          <div class="modal-main-content">
            {/* LEFT SIDEBAR */}
            <div class="modal-sidebar">
              <span class="sidebar-title">Type:</span>
              <div class="sidebar-tabs">
                {[
                  { id: "color", label: "Main Logo" },
                  { id: "invert", label: "Inverted Logo" },
                  { id: "black", label: "Black Logo" },
                  { id: "white", label: "White Logo" },
                  { id: "transparent", label: "Transparent" }
                ].map((item) => (
                  <button
                    key={item.id}
                    class={{ active: mode.value === item.id }}
                    onClick$={() => { mode.value = item.id as LogoMode; }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5z"/>
                    </svg>
                    {item.label}
                  </button>
                ))}
              </div>

              <div class="sidebar-spacer"></div>

            </div>

            {/* RIGHT PREVIEW AREA */}
            <div class="modal-preview-area">
              <div class="preview-container" style={{ background: extractBgColor(currentSvg.value), position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  opacity: 0.04,
                  fontSize: '8rem',
                  fontWeight: '900',
                  color: '#000',
                  transform: 'rotate(-30deg)',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                  zIndex: 10,
                  fontFamily: 'sans-serif'
                }}>kitlayer</div>
                {hasSvg.value ? (
                  <div class="svg-preview" dangerouslySetInnerHTML={currentSvg.value} />
                ) : (
                  <div class="no-svg-placeholder">Logo yüklenemedi</div>
                )}
              </div>
              <div class="carousel-dots">
                {[
                  "color",
                  "invert",
                  "black",
                  "white",
                  "transparent"
                ].map((id) => (
                  <span
                    key={id}
                    class={["dot", mode.value === id ? "active" : ""]}
                  ></span>
                ))}
              </div>
            </div>
          </div>

          {/* END OF BODY */}

          {/* MODALS */}
          {showDownloadModal.value && (
            <DownloadModal
              brandName={logo.brand_name}
              generateSvg$={generateSvg}
              palette={typeof logo.palette === 'string' ? JSON.parse(logo.palette) : logo.palette}
              closeMethod$={$(() => (showDownloadModal.value = false))}
              triggerElement={downloadBtnRef.value as HTMLElement}
              isPaid={logo.paid}
              planType={logo.plan_type as any}
              onShowPricing$={$(() => {
                showDownloadModal.value = false;
                showPricingModal.value = true;
              })}
            />
          )}

          {showPricingModal.value && (
            <PricingModal
              sessionId={logo.id}
              currentPlan={logo.plan_type as any}
              onClose$={$(() => (showPricingModal.value = false))}
              onSuccess$={$(async () => {
                showPricingModal.value = false;
                window.location.reload();
              })}
            />
          )}
        </div>
      </div>
    );
  }
);