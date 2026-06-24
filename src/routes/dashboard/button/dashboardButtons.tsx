import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import style0 from "./dashboardButtons.css?inline";

export const DashboardButton = component$(() => {
  useStyles$(style0);

  const activeTab = useSignal<"all" | "drafts" | "downloads" | "premium">("all");

  return (
    <div class="dashboard-toolbar">
      <div class="tabs-container">
        <button
          class={{ "toolbar-btn": true, tab: true, active: activeTab.value === "all" }}
          onClick$={() => (activeTab.value = "all")}
        >
          My projects
        </button>

        <button
          class={{ "toolbar-btn": true, tab: true, active: activeTab.value === "drafts" }}
          onClick$={() => (activeTab.value = "drafts")}
        >
          Draft
        </button>

        <button
          class={{ "toolbar-btn": true, tab: true, active: activeTab.value === "downloads" }}
          onClick$={() => (activeTab.value = "downloads")}
        >
          Download
        </button>

        <button
          class={{ "toolbar-btn": true, tab: true, active: activeTab.value === "premium" }}
          onClick$={() => (activeTab.value = "premium")}
        >
          Premium
        </button>
      </div>

      <a href="/app?reset=true" class="toolbar-btn primary">
        New Logo
      </a>
    </div>
  );
});