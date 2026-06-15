import { component$, useStore, $, QRL } from "@builder.io/qwik";
import "./step3Favicons.css";

// ─────────────────────────────────────────────────────────────────────────────
// STYLE ICONS
// Step 3'te gösterilen sabit ikonlar — tüm kategorilerde aynıdır.
// Bunlar sadece "style seçimi" için görsel placeholder'dır.
// Gerçek favicon (category + styleId) allFavicons.ts'den getFavicon() ile alınır.
// ─────────────────────────────────────────────────────────────────────────────
const styleIcons: { styleId: number; iconPath: string; label: string }[] = [
  { styleId: 1, iconPath: '/images/app/styles/favicon-style-1.svg', label: 'Style 1' },
  { styleId: 2, iconPath: '/images/app/styles/favicon-style-2.svg', label: 'Style 2' },
  { styleId: 3, iconPath: '/images/app/styles/favicon-style-3.svg', label: 'Style 3' },
  { styleId: 4, iconPath: '/images/app/styles/favicon-style-4.svg', label: 'Style 4' },
  { styleId: 5, iconPath: '/images/app/styles/favicon-style-5.svg', label: 'Style 5' },
  { styleId: 6, iconPath: '/images/app/styles/favicon-style-6.svg', label: 'Style 6' },
  { styleId: 7, iconPath: '/images/app/styles/favicon-style-7.svg', label: 'Style 7' },
  { styleId: 8, iconPath: '/images/app/styles/favicon-style-8.svg', label: 'Style" 7' },
];

export const Step3Favicons = component$(
  (props: {
    category: string; // step 2'den gelen kategori (allFavicons lookup için)
    onNext$: QRL<(selectedStyleIds: number[]) => void>;
    onBack$: QRL<() => void>;
  }) => {
    const state = useStore({
      selectedStyleIds: [] as number[],
    });

    const toggleSelect = $((styleId: number) => {
      if (state.selectedStyleIds.includes(styleId)) {
        state.selectedStyleIds = state.selectedStyleIds.filter((id) => id !== styleId);
      } else {
        state.selectedStyleIds = [...state.selectedStyleIds, styleId];
      }
    });

    return (
      <div class="step3">

        {/* CONTENT */}
        <div class="step3-content">
          <div class="step3-header">
            <div class="step3-text">
              <h2>How Should Your Brand Icon Look?</h2>

              <p class="step3-description">
                Choose a visual style so we can generate consistent logo and favicon designs for your brand.
              </p>
            </div>
          </div>

          {/*
            Favicon grid — styleIcons her zaman sabittir.
            Kullanıcı hangi kategoriyi seçerse seçsin bu 7 ikon görünür.
            Seçim sonucunda allFavicons.ts'de:
              getFavicon(props.category, selectedStyleId)
            çağrısıyla o kategoriye özel gerçek favicon bulunur.
          */}
          <div class="step3-favicon-options">
            {styleIcons.map((icon) => (
              <div
                key={icon.styleId}
                class={`step3-favicon-item ${
                  state.selectedStyleIds.includes(icon.styleId) ? "selected" : ""
                }`}
                onClick$={() => toggleSelect(icon.styleId)}
              >
                <img
                  src={icon.iconPath}
                  alt={icon.label}
                  class="favicon-img"
                  width="100"
                  height="100"
                />
              </div>
            ))}
          </div>
        </div>

        <div class="step3-continue-container">
          <button class="step3-back-button" onClick$={props.onBack$}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </button>

          <button
            class="step3-continue-right"
            disabled={state.selectedStyleIds.length === 0}
            onClick$={() => props.onNext$(state.selectedStyleIds)}
          >
            Continue
            <span class="arrow-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
        
      </div>
    );
  },
);
