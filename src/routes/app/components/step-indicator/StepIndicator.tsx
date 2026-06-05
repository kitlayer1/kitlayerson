import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./StepIndicator.css?inline";

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator = component$<StepIndicatorProps>(({ currentStep }) => {
  useStylesScoped$(styles);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div class="step-indicator-container">
      <div class="step-indicator-track">
        <div
          class="step-indicator-progress"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
});
