import { component$, useStyles$ } from '@builder.io/qwik';
import style0 from "./loading.css?inline";

export const LoadingOverlay = component$(() => {
  useStyles$(style0);

  return (
    <div class="loading-overlay">
      <div class="spinner"></div>
    </div>
  );
});
