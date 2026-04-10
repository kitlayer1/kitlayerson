import { component$, useSignal, useComputed$, $, useOnDocument, useVisibleTask$, type PropFunction } from "@builder.io/qwik";
import "./previewModal.css";
import { DownloadModal } from "../../../components/editor/Modal/downloadModal";
import { PricingModal } from "~/components/pricing/pricingModal";

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
    };
    onClose$: PropFunction<() => void>;
  }) => {
    const { logo, onClose$ } = props;
    const mode = useSignal<LogoMode>("color");
    const scrollPosition = useSignal(0);
    const showDownloadModal = useSignal(false);
    const showPricingModal = useSignal(false);
    const downloadBtnRef = useSignal<Element | undefined>();

    const currentSvg = useComputed$(() => {
      switch (mode.value) {
        case "black":
          return logo?.logo_svg_black || logo?.logo_svg_color || "";
        case "white":
          return logo?.logo_svg_white || logo?.logo_svg_color || "";
        case "transparent":
          return logo?.logo_svg_transparent || logo?.logo_svg_color || "";
        case "invert":
          return logo?.logo_svg_invert || logo?.logo_svg_color || "";
        default:
          return logo?.logo_svg_color || "";
      }
    });

    const generateSvg = $(async (svgMode?: string) => {
      switch (svgMode) {
        case "black":
          return logo?.logo_svg_black || logo?.logo_svg_color || "";
        case "white":
          return logo?.logo_svg_white || logo?.logo_svg_color || "";
        case "transparent":
          return logo?.logo_svg_transparent || logo?.logo_svg_color || "";
        case "invert":
          return logo?.logo_svg_invert || logo?.logo_svg_color || "";
        default:
          return logo?.logo_svg_color || "";
      }
    });

    const hasSvg = useComputed$(() => !!currentSvg.value);

    // Scroll'u engelle
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      // Scroll pozisyonunu kaydet
      scrollPosition.value = window.scrollY;
      
      // Scrollbar genişliğini hesapla ve CSS değişkeni olarak ata
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
      
      // Body'e class ekle ve pozisyonu sabitle
      document.body.classList.add('modal-open');
      document.body.style.top = `-${scrollPosition.value}px`;

      // iOS için ek önlem
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';

      // Touch hareketlerini engelle
      const preventTouch = (e: TouchEvent) => {
        e.preventDefault();
      };

      document.addEventListener('touchmove', preventTouch, { passive: false });

      // Cleanup function
      return () => {
        document.body.classList.remove('modal-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.height = '';
        document.body.style.overflow = '';
        
        document.removeEventListener('touchmove', preventTouch);
        
        // Kaydedilen pozisyona geri dön
        window.scrollTo(0, scrollPosition.value);
      };
    });

    // ESC tuşu ile kapatma
    useOnDocument(
      "keydown",
      $((event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose$();
        }
      })
    );

    const closeModal = $(() => {
      onClose$();
    });

    return (
      <div
        class="logo-preview-overlay"
        onClick$={(e) => {
          if (e.target === e.currentTarget) {
            closeModal();
          }
        }}
      >
        <div
          class="logo-preview-modal"
          onClick$={(e) => e.stopPropagation()}
        >
          {/* HEADER (Always at Top) */}
          <div class="modal-header">
            <h3>{logo.brand_name}</h3>
            <button
              class="close-btn"
              type="button"
              aria-label="Kapat"
              onClick$={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div class="modal-main-content">
            <div class="modal-preview">
            <div class={`preview-box ${mode.value === 'transparent' ? 'transparent' : ''}`}>
              {hasSvg.value ? (
                <div
                  class="svg-preview"
                  dangerouslySetInnerHTML={currentSvg.value}
                />
              ) : (
                <div class="no-svg-placeholder">
                  Logo önizlemesi yüklenemedi
                </div>
              )}
            </div>

            <div class="preview-tabs">
              {["color", "invert", "black", "white", "transparent"].map((item) => (
                <button
                  key={item}
                  class={{ active: mode.value === item }}
                  onClick$={() => {
                    mode.value = item as LogoMode;
                  }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT - Panel */}
          <div class="modal-right-panel">
            {/* INFO */}
            <div class="modal-info">
              <h2 class="title">Your Previously Created Logo</h2>
              <p class="description">From billing to revenue recognition streamline your entire contract-to-cash process and eliminate manual work.</p>

              <div class="empty-progress-bar"></div>


              {!logo.paid && (
                <div class="upgrade-banner">
                  <div class="upgrade-banner-content">
                    <h3>Have your logo</h3>
                    <p>Upgrade your logo to gain full ownership and unlock commercial usage rights with no restrictions</p>
                  </div>
                  <button 
                    class="upgrade-btn-new"
                    onClick$={() => (showPricingModal.value = true)}
                  >
                    Upgrade
                  </button>
                </div>
              )}

              <button 
                ref={downloadBtnRef}
                class="download-btn-new"
                onClick$={() => (showDownloadModal.value = true)}
              >
                Download
              </button>
            </div>
          </div>
          </div>
          
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