import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./StepIndicator.css?inline";

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator = component$<StepIndicatorProps>(({ currentStep }) => {
  useStylesScoped$(styles);

  return (
    <div class="step-indicator-container">
      {[1, 2, 3, 4, 5].map((step) => (
        <div
          key={step}
          class={["step-dot", step === currentStep ? "active" : ""]}
        />
      ))}
    </div>
  );
});
