import { component$, useStore, useVisibleTask$, QRL } from "@builder.io/qwik";
import "./step1BrandName.css";

export const Step1BrandName = component$(
  (props: {
    initialBrandName?: string;
    onNext$: QRL<(name: string) => void>;
    onBack$?: QRL<() => void>;
  }) => {
    const state = useStore({
      brandName: "",
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      document.body.style.overflow = "hidden";
      state.brandName = "";

      return () => {
        document.body.style.overflow = "auto";
      };
    });

    return (
      <div class="step1">
        <div class="step1-content">
          <div class="step1-header">
            <div class="step1-text">
              <h2>Let’s Start by Entering Your Brand Name</h2>
              <p class="step1-description">
                Enter your brand name to generate logo ideas tailored to your identity and style
              </p>
            </div>
          </div>

          <div class="step1-input-container">
            <div class="inputs-wrapper">
              <input
                type="text"
                value={state.brandName}
                placeholder="Brand Name"
                onInput$={(e: any) => {
                  state.brandName = e.target.value;
                }}
              />

              {state.brandName && (
                <button
                  class="clear-input"
                  onClick$={() => {
                    state.brandName = "";
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div class="step1-continue-container">
            <div class="step1-dots">
              <span class="dot active"></span>
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
            <button
              class="step1-continue-right"
              disabled={!state.brandName}
              onClick$={() => props.onNext$(state.brandName)}
            >
              Continue
              <span class="arrow-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
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
  }
);