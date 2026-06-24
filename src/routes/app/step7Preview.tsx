// src/routes/app/components/Step7Preview.tsx
import { component$, $, useSignal, useVisibleTask$, useStyles$ } from '@builder.io/qwik';

import { supabase } from "~/lib/supabaseClient";
import { allFavicons } from "./allFavicons";
import { allFonts } from "./allFonts";
import { colorOptionById } from "./colorOption";
import { getLogoIndices } from './logoUtils';
import { DownloadModal } from "~/components/editor/Modal/downloadModal";
import style0 from "./step7Preview.css?inline";
import { AppHeader } from "./components/header/header";
import { PricingModal } from "~/components/pricing/pricingModal";
import { LoginModal } from "~/components/login/LoginModal";
import ImgStep7Docs from '~/media/images/app/step/step7-docs.svg?jsx';

type LogoMode = "color" | "black" | "white" | "transparent" | "invert";

const toBase64 = async (url: string) => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Base64 dönüşüm hatası:", error);
    return "";
  }
};

const getColorsByMode = (mode: LogoMode, palette: { background: string; text: string; icon?: string }) => {
  switch (mode) {
    case "black":
      return { background: "#ffffff", text: "#000000", icon: "#000000" };
    case "white":
      return { background: "#000000", text: "#ffffff", icon: "#ffffff" };
    case "transparent":
      return {
        background: "transparent",
        text: "#000000",
        icon: "#000000",
      };
    case "invert":
      return {
        background: palette.text,
        text: palette.background,
        icon: palette.background,
      };
    default: // color
      return {
        background: palette.background,
        text: palette.text,
        icon: palette.icon || palette.text,
      };
  }
};

export const Step7Preview = component$(
  (props: {
    brandName: string;
    selectedCategory: string;
    selectedStyleIds: number[];
    colors: number[];
    selectedFontStyleId: number;
    selectedLogoIndex: number;
  }) => {
  useStyles$(style0);

    const svgContainer = useSignal<Element>();
    const showModal = useSignal(false);
    const showPricingModal = useSignal(false);
    const showLoginModal = useSignal(false);
    const sessionId = useSignal<string>("");
    const logoMode = useSignal<LogoMode>("color");
    const isSaving = useSignal(false);
    const isPaid = useSignal(false);
    const planType = useSignal<'started' | 'business' | null>(null);
    const fontsLoaded = useSignal(false);
    const initializationDone = useSignal(false);
    const activeIndex = useSignal(props.selectedLogoIndex);
    const downloadBtnRef = useSignal<Element>();
    const isScrolled = useSignal(false);
    const isMobileMenuOpen = useSignal(false);

    /* ======================
     DATA
    ====================== */

    const usableFavicons = allFavicons.filter((f) =>
      f.category === props.selectedCategory &&
      props.selectedStyleIds.includes(f.styleId),
    );

    const { fIndexHash, fontIndexHash, cIndexHash, pIndexHash } = getLogoIndices(activeIndex.value, props.brandName);

    const favicon =
      usableFavicons[fIndexHash % usableFavicons.length];

    const usableFonts = allFonts.filter(
      (f) => f.styleId === props.selectedFontStyleId,
    );

    const fontFamily =
      usableFonts.length > 0
        ? usableFonts[fontIndexHash % usableFonts.length].fontFamily
        : "sans-serif";

    const fontUrl =
      usableFonts.length > 0
        ? usableFonts[fontIndexHash % usableFonts.length].file
        : null;

    const selectedColorId =
      props.colors[cIndexHash % props.colors.length];

    const option = colorOptionById[selectedColorId];
    const palettes = option?.palettes || [
      { background: "#ffffff", text: "#111111" },
    ];
    const palette = palettes[pIndexHash % palettes.length];


    // Benzersiz bir data hash'i oluştur (tüm props'lardan)
    const getDataHash = $(() => {
      const dataString = JSON.stringify({
        brandName: props.brandName,
        styleIds: props.selectedStyleIds,
        colors: props.colors,
        fontStyleId: props.selectedFontStyleId,
        logoIndex: activeIndex.value,
        faviconId: favicon.id
      });

      // Basit bir hash fonksiyonu
      let hash = 0;
      for (let i = 0; i < dataString.length; i++) {
        const char = dataString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(36);
    });

    /* ======================
     COLOR LOGIC
    ====================== */

    /* ======================
     HELPERS
    ====================== */

    // Font ön yükleme fonksiyonu
    const preloadFont = $(async () => {
      if (!fontUrl) {
        fontsLoaded.value = true;
        return;
      }

      try {
        const opentype = (await import("opentype.js/dist/opentype.module.js")).default;
        const res = await fetch(fontUrl);
        const buffer = await res.arrayBuffer();
        opentype.parse(buffer);
        fontsLoaded.value = true;
        console.log("Font başarıyla yüklendi");
      } catch (e) {
        console.warn("Font yüklenemedi:", e);
        fontsLoaded.value = true;
      }
    });

    const modes: LogoMode[] = ["color", "invert", "black", "white", "transparent"];

    const generateSvg = $(async (forcedMode?: LogoMode) => {
      try {
        const effectiveMode = forcedMode || logoMode.value;
        const colors = getColorsByMode(effectiveMode, palette);

        let iconElement = "";

        try {
          const res = await fetch(favicon?.iconPath);
          let svgText = await res.text();

          // Mevcut fill ve stroke'ları değiştir
          svgText = svgText
            .replace(/fill="((?!none)[^"]+)"/gi, `fill="${colors.icon}"`)
            .replace(/stroke="((?!none)[^"]+)"/gi, `stroke="${colors.icon}"`);

          // CSS içindeki fill/stroke'ları değiştir
          svgText = svgText
            .replace(/fill:\s*((?!none)[^;"]+)/gi, `fill:${colors.icon}`)
            .replace(/stroke:\s*((?!none)[^;"]+)/gi, `stroke:${colors.icon}`);

          // fill'i olmayan SVG elemanlarına fill ekle
          svgText = svgText
            .replace(/<path(?![^>]*fill=)/gi, `<path fill="${colors.icon}"`)
            .replace(/<circle(?![^>]*fill=)/gi, `<circle fill="${colors.icon}"`)
            .replace(/<rect(?![^>]*fill=)/gi, `<rect fill="${colors.icon}"`)
            .replace(/<polygon(?![^>]*fill=)/gi, `<polygon fill="${colors.icon}"`)
            .replace(/<ellipse(?![^>]*fill=)/gi, `<ellipse fill="${colors.icon}"`);

          const viewBoxMatch = svgText.match(/viewBox="([^"]+)"/i);
          const viewBoxAttr = viewBoxMatch ? viewBoxMatch[0] : 'viewBox="0 0 24 24"';
          
          svgText = svgText.replace(/<svg[^>]*>/i, `<svg x="112" y="82" width="176" height="176" ${viewBoxAttr}>`);
          iconElement = svgText;
        } catch (e) {
          console.warn("SVG coloring failed, using fallback:", e);
          const iconUrl = favicon?.iconPath;
          const iconBase64 = iconUrl.startsWith("data:") ? iconUrl : await toBase64(iconUrl);
          iconElement = `<image href="${iconBase64}" x="112" y="82" width="176" height="176" />`;
        }

        let textElement = `
        <text
          x="200"
          y="290"
          font-family="${fontFamily}"
          font-size="52"
          fill="${colors.text}"
          text-anchor="middle"
          dominant-baseline="middle"
        >
          ${props.brandName}
        </text>
      `;

        if (fontUrl) {
          try {
            const opentype = (await import("opentype.js/dist/opentype.module.js")).default;
            const res = await fetch(fontUrl);
            const buffer = await res.arrayBuffer();
            const font = opentype.parse(buffer);

            const path = font.getPath(props.brandName, 0, 0, 42);
            const d = path.toPathData(2);

            const box = path.getBoundingBox();
            const w = box.x2 - box.x1;
            const h = box.y2 - box.y1;

            const x = 200 - (box.x1 + w / 2);
            const y = 290 - (box.y1 + h / 2) + 10;

            textElement = `<path d="${d}" fill="${colors.text}" transform="translate(${x} ${y})" />`;
          } catch (e) {
            console.warn(
              "Font path conversion failed, falling back to <text>",
              e,
            );
          }
        }

        return `
        <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          ${colors.background !== "transparent" ? `<rect width="400" height="400" fill="${colors.background}" />` : ""}
          ${iconElement}
          ${textElement}
        </svg>
      `.trim();
      } catch {
        return "";
      }
    });

    // Mevcut session'ı TÜM PARAMETRELERLE birlikte bul
    const findExistingSessionByData = $(async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session?.user) {
        return null;
      }

      try {
        // Tüm parametreleri kontrol et
        const { data, error } = await supabase
          .from("logo_sessions")
          .select("id, paid, plan_type")
          .eq("user_id", sessionData.session.user.id)
          .eq("brand_name", props.brandName)
          .eq("selected_font_style_id", props.selectedFontStyleId)
          .eq("selected_favicon_id", favicon.id)
          .eq("selected_style_ids", props.selectedStyleIds) // Array karşılaştırması
          .eq("colors", props.colors) // Array karşılaştırması
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          return null;
        }

        if (data) {
          return data;
        }

        return null;
      } catch {
        return null;
      }
    });

    /* ======================
     SAVE TO SUPABASE
    ====================== */

    const saveToSupabase = $(async () => {
      // Önce mevcut session var mı kontrol et (TÜM PARAMETRELERLE)
      const existingSession = await findExistingSessionByData();

      if (existingSession) {
        sessionId.value = existingSession.id;
        isPaid.value = existingSession.paid || false;
        planType.value = existingSession.plan_type || null;

        // Data hash'ine göre localStorage'a kaydet
        const dataHash = await getDataHash();
        localStorage.setItem(`logo_session_${dataHash}`, existingSession.id);

        return existingSession.id;
      }

      // Eğer sessionId zaten varsa kaydetme
      if (sessionId.value) {
        return sessionId.value;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session?.user) {
        return null;
      }

      isSaving.value = true;

      try {
        if (!fontsLoaded.value) {
          await preloadFont();
        }

        const modes: LogoMode[] = [
          "color",
          "black",
          "white",
          "transparent",
          "invert",
        ];
        const svgs: Record<LogoMode, string> = {} as Record<LogoMode, string>;

        for (const m of modes) {
          svgs[m] = await generateSvg(m);

          if (!svgs[m]) {
            throw new Error(`${m} modu için SVG oluşturulamadı`);
          }

          await new Promise(resolve => setTimeout(resolve, 100));
        }

        const colorSvg = svgs.color;

        const insertData = {
          user_id: sessionData.session.user.id,
          brand_name: props.brandName,
          selected_style_ids: props.selectedStyleIds,
          colors: props.colors,
          selected_font_style_id: props.selectedFontStyleId,
          selected_favicon_id: favicon.id,
          logo_svg: colorSvg,
          logo_svg_color: svgs.color,
          logo_svg_black: svgs.black,
          logo_svg_white: svgs.white,
          logo_svg_transparent: svgs.transparent,
          logo_svg_invert: svgs.invert,
          logo_mode: "color",
          paid: false,
          plan_type: null,
        };

        console.log("Supabase'e kaydediliyor...", insertData);

        const { data, error } = await supabase
          .from("logo_sessions")
          .insert(insertData)
          .select("id, paid, plan_type")
          .single();

        if (error) {
          console.error("Logo kaydetme hatası:", error);
          return null;
        }

        if (data) {
          sessionId.value = data.id;
          isPaid.value = data.paid || false;
          planType.value = data.plan_type || null;

          // Data hash'ine göre localStorage'a kaydet
          const dataHash = await getDataHash();
          localStorage.setItem(`logo_session_${dataHash}`, data.id);

          console.log("Yeni logo başarıyla kaydedildi, ID:", data.id);
          return data.id;
        }
      } catch (error) {
        console.error("Kaydetme sırasında hata:", error);
        return null;
      } finally {
        isSaving.value = false;
      }
    });

    // URL'den session ID'yi al (opsiyonel)

    // Session ID'den veritabanı bilgilerini getir
    const loadExistingSession = $(async (id: string) => {
      try {
        console.log("Mevcut session yükleniyor, ID:", id);

        const { data, error } = await supabase
          .from("logo_sessions")
          .select("paid, plan_type")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Session verisi getirme hatası:", error);
          return false;
        }

        if (data) {
          sessionId.value = id;
          isPaid.value = data.paid || false;
          planType.value = data.plan_type || null;
          return true;
        }

        return false;
      } catch (error) {
        console.error("Session verisi getirme hatası:", error);
        return false;
      }
    });

    // Satın alma başarılı olduğunda
    const handlePurchaseSuccess = $((purchasedPlanType: 'started' | 'business') => {
      console.log("Satın alma başarılı, plan:", purchasedPlanType);

      isPaid.value = true;
      planType.value = purchasedPlanType;
      showPricingModal.value = false;
      showModal.value = true;

      if (sessionId.value) {
        supabase
          .from("logo_sessions")
          .update({
            paid: true,
            plan_type: purchasedPlanType
          })
          .eq("id", sessionId.value)
          .then(({ error }) => {
            if (error) {
              console.error("Plan güncelleme hatası:", error);
            } else {
              console.log("Plan başarıyla güncellendi:", purchasedPlanType);
            }
          });
      }
    });


    const handleDownloadClick = $(async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session?.user) {
        showLoginModal.value = true;
        return;
      }
      showModal.value = true;
    });

    /* ======================
     USEVISIBLETASK
    ====================== */

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async () => {
      if (initializationDone.value) {
        return;
      }

      console.log("Step7Preview çalışıyor...");
      console.log("Props:", props);
      console.log("Favicon:", favicon);

      try {
        // Fontları yükle
        await preloadFont();

        // İlk SVG'yi göster
        const initialSvg = await generateSvg("color");
        if (svgContainer.value) {
          svgContainer.value.innerHTML = initialSvg;
        }

        // Data hash'ini oluştur
        const dataHash = await getDataHash();
        console.log("Data hash:", dataHash);

        // LocalStorage'dan kontrol et
        const storedSessionId = localStorage.getItem(`logo_session_${dataHash}`);

        if (storedSessionId) {
          console.log("LocalStorage'dan session bulundu:", storedSessionId);
          const loaded = await loadExistingSession(storedSessionId);
          if (loaded) {
            console.log("Session localStorage'dan yüklendi");
            initializationDone.value = true;
            return;
          } else {
            // localStorage'daki session geçersizse temizle
            localStorage.removeItem(`logo_session_${dataHash}`);
          }
        }

        // Zaten sessionId varsa
        if (sessionId.value) {
          console.log("Session ID zaten var:", sessionId.value);
          initializationDone.value = true;
          return;
        }

        // Kullanıcı giriş yapmış mı kontrol et
        const { data: sessionData } = await supabase.auth.getSession();
        const isAuthenticated = !!sessionData?.session?.user;

        if (isAuthenticated) {
          // Veritabanında aynı data ile kayıt ara ve yoksa oluştur
          console.log("Kullanıcı giriş yapmış, session kontrolü yapılıyor...");
          const newId = await saveToSupabase();
          if (newId) {
            console.log("Session ID kaydedildi:", newId);
          } else {
            console.log("Session oluşturulamadı veya bulunamadı");
          }
        } else {
          console.log("Kullanıcı giriş yapmamış, session oluşturulmadı");
        }

      } catch (error) {
        console.error("Initialization hatası:", error);
      } finally {
        initializationDone.value = true;
      }
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      const handleScroll = () => {
        isScrolled.value = window.scrollY > 0;
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    });

    // Mode değiştiğinde SVG'yi güncelle
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(() => logoMode.value);

      generateSvg()
        .then((svg) => {
          if (svgContainer.value) {
            svgContainer.value.innerHTML = svg;
          }
        })
        .catch((error) => {
          console.error("SVG güncelleme hatası:", error);
        });
    });

    /* ======================
     UI
    ====================== */

    const colors = getColorsByMode(logoMode.value, palette);

    return (
      <div class={["step7-container", isScrolled.value && "is-scrolled"]}>
        <AppHeader>
          <div q:slot="actions" class="step7-header-actions">
            {!isPaid.value && (
              <button class="upgrade-btn-blue" onClick$={() => (showPricingModal.value = true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a10 10 0 0 1 7.38 16.75" />
                  <path d="m16 12-4-4-4 4" />
                  <path d="M12 16V8" />
                  <path d="M2.5 8.875a10 10 0 0 0-.5 3" />
                  <path d="M2.83 16a10 10 0 0 0 2.43 3.4" />
                  <path d="M4.636 5.235a10 10 0 0 1 .891-.857" />
                  <path d="M8.644 21.42a10 10 0 0 0 7.631-.38" />
                </svg>
                Upgrade
              </button>
            )}
            <button
              ref={downloadBtnRef}
              class="step7-download-btn-header"
              onClick$={handleDownloadClick}
            >
              Download
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </AppHeader>

        <main class="step7-main">
          {/* LEFT PANEL */}
          <div class={["step7-left-panel", isMobileMenuOpen.value && "is-open"]}>
            <div class="mobile-accordion-header" onClick$={() => isMobileMenuOpen.value = !isMobileMenuOpen.value}>
              <span>Ready to Launch</span>
              <svg
                class={["chevron-icon", isMobileMenuOpen.value && "open"]}
                xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>

            <div class="left-panel-content">
              <h1 class="pp-title">YOUR BRAND LOGO IS READY TO LAUNCH</h1>
              <p class="pp-desc">
                Download your final logo package in multiple formats, ready for web, print, and all your brand needs.
              </p>

              <div class="owned-section">
                <h4>Download in your preferred format:</h4>
                <div class="format-tags">
                  {["PNG", "SVG", "JPG", "PDF", "ZIP"].map((format) => (
                    <div key={format} class="format-tagt">
                      {format}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - PREVIEW AREA */}
          <div class="step7-right-panel">
            <div class="preview-white-card">
              <div class="preview-internal-header">
                <div class="preview-brand-info">
                  <div class="preview-brand-icon">
                    <ImgStep7Docs />
                  </div>
                  <div class="preview-brand-text">
                    <strong>{props.brandName || "Kitlayer"}</strong>
                    <span>Created: 21.02.2026</span>
                  </div>
                </div>

                <div class="pp-styles-integrated">
                  {[
                    { id: "color", label: "Main Logo" },
                    { id: "invert", label: "Inverted Logo" },
                    { id: "black", label: "Black Logo" },
                    { id: "white", label: "White Logo" },
                    { id: "transparent", label: "Transparent" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      class={{ active: logoMode.value === item.id }}
                      onClick$={() => (logoMode.value = item.id as LogoMode)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div class="preview-card-outer-container">
                <div
                  class={[
                    "pp-card-integrated",
                    logoMode.value === "transparent" && "transparent-mode",
                    logoMode.value === "black" && "black-mode"
                  ]}
                  style={{
                    background:
                      colors.background === "transparent"
                        ? undefined
                        : colors.background,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
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
                    color: colors.text,
                    transform: 'rotate(-30deg)',
                    whiteSpace: 'nowrap',
                    userSelect: 'none',
                    zIndex: 10,
                    fontFamily: 'sans-serif'
                  }}>kitlayer</div>
                  <div ref={svgContainer} class="pp-logo-preview" />
                </div>
              </div>

              <div class="preview-pagination-dots">
                {modes.map((mode) => (
                  <span
                    key={mode}
                    class={["dot", logoMode.value === mode ? "active" : ""]}
                    onClick$={() => (logoMode.value = mode)}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </main>

        {showModal.value && (
          <DownloadModal
            brandName={props.brandName}
            generateSvg$={(mode: any) => generateSvg(mode || logoMode.value)}
            palette={colors}
            closeMethod$={() => (showModal.value = false)}
            triggerElement={downloadBtnRef.value as HTMLElement}
            isPaid={isPaid.value}
            planType={planType.value}
            onShowPricing$={() => {
              showModal.value = false;
              showPricingModal.value = true;
            }}
          />
        )}

        {showPricingModal.value && sessionId.value && (
          <PricingModal
            sessionId={sessionId.value}
            currentPlan={planType.value}
            onClose$={() => (showPricingModal.value = false)}
            onSuccess$={handlePurchaseSuccess}
          />
        )}

        {showLoginModal.value && (
          <LoginModal
            onClose$={() => (showLoginModal.value = false)}
            onSuccess$={$(() => {
              showLoginModal.value = false;
              showModal.value = true;
            })}
          />
        )}
      </div>
    );
  },
);




