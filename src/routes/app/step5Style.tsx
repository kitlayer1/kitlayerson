// src/components/Step5Style.tsx
import { component$, useStore, $, QRL } from "@builder.io/qwik";
import "./step5Style.css";
import { styleOptions } from "./styleOptions";

export const Step5Style = component$(
  (props: {
    initialStyleId?: number;
    onNext$: QRL<(styleId: number) => void>;
    onBack$: QRL<() => void>;
  }) => {
    const state = useStore({
      selectedStyleId: props.initialStyleId || 0,
      showPopup: false,
    });

    // 🚀 Continue → Direkt sonraki adıma geç
    const handleContinue = $(() => {
      if (state.selectedStyleId === 0) return;
      props.onNext$(state.selectedStyleId);
    });

    const styles = styleOptions;

    return (
      <div class="step5">
        <div class="step5-content">
          <div class="step5-header">
            <div class="step5-text">
              <h2>Choose Your Brand Style</h2>
              <p class="step5-description">
               Select the style that best represents your brand identity and logo direction.
              </p>
            </div>
          </div>

          {/* STYLE OPTIONS */}
          <div class="step5-options">
            {styles.map((s) => (
              <div
                key={s.id}
                class={`step5-style-item ${state.selectedStyleId === s.id ? "selected" : ""}`}
                onClick$={() => {
                  state.selectedStyleId =
                    state.selectedStyleId === s.id ? 0 : s.id;
                }}
              >
                <img src={s.image} alt={s.name} class="style-image-full" width="100" height="100" />
              </div>
            ))}
          </div>

          <div class="step5-continue-container">
            <button class="step5-back-button" onClick$={props.onBack$}>
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
              class="step5-continue-right"
              disabled={state.selectedStyleId === 0}
              onClick$={handleContinue}
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
      </div>
    );
  },
);
