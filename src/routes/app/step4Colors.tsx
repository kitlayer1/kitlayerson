import { useStyles$ } from '@builder.io/qwik';
// src/components/Step4Colors.tsx
import { component$, useStore, $, QRL } from '@builder.io/qwik';
import { colorOptions } from "./colorOption";
import style0 from "./step4Colors.css?inline";

export const Step4Colors = component$((props: { 
  initialSelected?: number[];       // Parent'ten gelirse dolu gelsin
  onNext$: QRL<(selectedIds: number[]) => void>; 
  onBack$: QRL<() => void>;
}) => {
  useStyles$(style0);


  // 🚀 Local state artık props.initialSelected ile başlatılıyor
  const state = useStore({ selected: props.initialSelected || [] as number[] });

  const toggle = $((id: number) => {
    if (state.selected.includes(id)) {
      state.selected = state.selected.filter(x => x !== id);
    } else {
      state.selected = [...state.selected, id];
    }
  });

  return (
    <div class="step4">
      <div class="step4-content">
        <div class="step4-header">
          <div class="step4-text">
            <h2>Pick Colors That Represent Your Brand</h2>
            <p class="step4-description">
              Select colors that will define the visual identity of your logo and brand assets.
            </p>
          </div>

        
        </div>

        {/* COLOR OPTIONS */}
        <div class="step4-options">
  {colorOptions.map(option => (
    <button
      key={option.id}
      class={`step4-color ${state.selected.includes(option.id) ? 'selected' : ''}`}
      onClick$={() => toggle(option.id)}
      style={{
        backgroundImage: `url(${option.image})`,
      }}
    >
      <div class="color-overlay">
        <h3 class="color-title">{option.title}</h3>
        <p class="color-desc">{option.description}</p>
      </div>

      {state.selected.includes(option.id) && (
        <div class="check-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
    </button>
  ))}
</div>

  <div class="step4-continue-container">
             <button class="step4-back-button" onClick$={props.onBack$}>
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
            class="step4-continue-right"
            disabled={state.selected.length === 0}
               onClick$={() => props.onNext$(state.selected)}
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
});


   
