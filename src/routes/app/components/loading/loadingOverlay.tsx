import { component$ } from "@builder.io/qwik";
import "./loading.css";

export const LoadingOverlay = component$(() => {
  return (
    <div class="loading-overlay">
      <div class="spinner"></div>
    </div>
  );
});
