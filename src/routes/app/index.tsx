import { component$, useStore, $, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { LoadingOverlay } from "./components/loading/loadingOverlay";
import { Step7Loading } from "./components/loading/Step7Loading";
import { Step1BrandName } from "./step1BrandName";
import { Step2Category } from "./step2Category";
import { Step3Favicons } from "./step3Favicons";
import { Step4Colors } from "./step4Colors";
import { Step5Style } from "./step5Style";
import { Step6GeneratedLogos } from "./step6GeneratedLogos";
import { Step7Preview } from "./step7Preview";
import { AppHeader } from "./components/header/header";
import { SelectionSummary } from "./components/selection-summary/SelectionSummary";
import { colorOptions } from "./colorOption";
import { styleOptions } from "./styleOptions";

export default component$(() => {
  const loc = useLocation();

  const state = useStore({
    currentStep: 1,

    brandName: loc.url.searchParams.get("brandName") || "",
    category: "",

    selectedStyleIds: [] as number[],
    colors: [] as number[],

    selectedFontStyleId: 0,
    selectedLogoIndex: -1,

    saving: false,
    loading: false,
    isStep7Transition: false,
  });

  /* ------------------------------------------------ */
  /* ENCODE / DECODE */
  /* ------------------------------------------------ */

  const encodeData = $((obj: any): string => {
    try {
      return btoa(encodeURIComponent(JSON.stringify(obj)));
    } catch {
      return "";
    }
  });

  const decodeData = $((str: string): any => {
    try {
      return JSON.parse(decodeURIComponent(atob(str)));
    } catch {
      return null;
    }
  });

  /* ------------------------------------------------ */
  /* STEP ACCESS CONTROL */
  /* ------------------------------------------------ */

  const isStepAccessible = $((targetStep: number): boolean => {
    if (targetStep === 1) return true;
    if (targetStep === 2) return state.brandName.trim().length > 0;
    if (targetStep === 3) return state.category.trim().length > 0;
    if (targetStep === 4) return state.selectedStyleIds.length > 0;
    if (targetStep === 5) return state.colors.length > 0;
    if (targetStep === 6) return state.selectedFontStyleId > 0;
    if (targetStep === 7) return state.selectedLogoIndex >= 0;

    return false;
  });

  const getMaxAccessibleStep = $((): number => {
    if (!state.brandName.trim()) return 1;
    if (!state.category.trim()) return 2;
    if (state.selectedStyleIds.length === 0) return 3;
    if (state.colors.length === 0) return 4;
    if (state.selectedFontStyleId === 0) return 5;
    if (state.selectedLogoIndex < 0) return 6;

    return 7;
  });

  /* ------------------------------------------------ */
  /* QUERY UPDATE */
  /* ------------------------------------------------ */

  const updateQueryString = $(async (step: number, data: any) => {
    const encoded = await encodeData(data);

    const params = new URLSearchParams(window.location.search);

    params.set("step", String(step));
    params.set("data", encoded);

    // Persist to localStorage as well
    localStorage.setItem("logo_creator_state", JSON.stringify({ step, data }));

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  });

  /* ------------------------------------------------ */
  /* INITIAL LOAD */
  /* ------------------------------------------------ */

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    state.loading = true;

    const params = new URLSearchParams(window.location.search);
    const stepParam = params.get("step");
    const dataParam = params.get("data");
    const resumeParam = params.get("resume");
    const brandNameParam = params.get("brandName");

    // Auth hash kontrolü (OAuth dönüşü için)
    const hasAuthHash = window.location.hash.includes("access_token") || 
                       window.location.hash.includes("id_token") ||
                       window.location.hash.includes("error=");

    if (stepParam && dataParam) {
      const decoded = await decodeData(dataParam);
// ...

      if (decoded) {
        state.brandName = decoded.brandName || "";
        state.category = decoded.category || "";
        state.selectedStyleIds = decoded.selectedStyleIds || [];
        state.colors = decoded.colors || [];
        state.selectedFontStyleId = decoded.selectedFontStyleId || 0;
        state.selectedLogoIndex = decoded.selectedLogoIndex ?? -1;

        const stepNumber = Number(stepParam);
        const maxStep = await getMaxAccessibleStep();

        state.currentStep = Math.min(stepNumber, maxStep);
      }
    } else if (hasAuthHash || resumeParam === "true") {
      // Sadece auth dönüşünde veya açıkça resume istendiğinde localStorage'dan yükle
      const savedState = localStorage.getItem("logo_creator_state");
      if (savedState) {
        try {
          const { step, data } = JSON.parse(savedState);
          if (data) {
            state.brandName = data.brandName || "";
            state.category = data.category || "";
            state.selectedStyleIds = data.selectedStyleIds || [];
            state.colors = data.colors || [];
            state.selectedFontStyleId = data.selectedFontStyleId || 0;
            state.selectedLogoIndex = data.selectedLogoIndex ?? -1;

            const maxStep = await getMaxAccessibleStep();
            state.currentStep = Math.min(step, maxStep);
            
            // Yükledikten sonra URL'i güncelle
            await updateQueryString(state.currentStep, data);
          }
        } catch (e) {
          console.error("Failed to parse saved state", e);
        }
      }
    } else {
      // Yeni başlangıç: her şeyi temizle
      localStorage.removeItem("logo_creator_state");
      state.brandName = brandNameParam || "";
      state.category = "";
      state.selectedStyleIds = [];
      state.colors = [];
      state.selectedFontStyleId = 0;
      state.selectedLogoIndex = -1;
      state.currentStep = 1;
      
      if (brandNameParam) {
        // Remove the parameter from URL to clean it up, but keep state.
        window.history.replaceState({}, "", window.location.pathname);
      }
    }

    state.loading = false;
  });

  /* ------------------------------------------------ */
  /* STEP CHANGE */
  /* ------------------------------------------------ */

  const goToStep = $(async (step: number, showLoading: boolean = true) => {
    if (showLoading) {
      if (step === 7) {
        state.isStep7Transition = true;
        await new Promise((resolve) => setTimeout(resolve, 6000));
        state.isStep7Transition = false;
      } else {
        state.loading = true;
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }


    /* ------------------------------------------------ */
    /* STEP 1 RESET */
    /* ------------------------------------------------ */

    if (step === 1) {
      state.brandName = "";
      state.category = "";
      state.selectedStyleIds = [];
      state.colors = [];
      state.selectedFontStyleId = 0;
      state.selectedLogoIndex = -1;

      state.currentStep = 1;

      // query temizle
      window.history.replaceState({}, "", window.location.pathname);

      state.loading = false;
      return;
    }

    const accessible = await isStepAccessible(step);

    if (!accessible) {
      const maxStep = await getMaxAccessibleStep();
      state.currentStep = maxStep;
      state.loading = false;
      return;
    }

    state.currentStep = step;

    const payload = {
      brandName: state.brandName,
      category: state.category,
      selectedStyleIds: state.selectedStyleIds,
      colors: state.colors,
      selectedFontStyleId: state.selectedFontStyleId,
      selectedLogoIndex: state.selectedLogoIndex,
    };

    await updateQueryString(step, payload);

    state.loading = false;
  });

  /* ------------------------------------------------ */
  /* STEP HANDLERS */
  /* ------------------------------------------------ */

  const nextBrand = $((name: string) => {
    state.brandName = name;
    goToStep(2, true);
  });

  const nextCategory = $((cat: string) => {
    state.category = cat;
    goToStep(3, true);
  });

  const nextFavicons = $((ids: number[]) => {
    state.selectedStyleIds = ids;
    goToStep(4, true);
  });

  const nextColors = $((ids: number[]) => {
    state.colors = ids;
    goToStep(5, true);
  });

  const nextStyle = $((id: number) => {
    state.selectedFontStyleId = id;
    goToStep(6, true);
  });

  const selectLogo = $(async (index: number) => {
    state.selectedLogoIndex = index;
    await goToStep(7, true);
  });

  /* ------------------------------------------------ */
  /* RENDER */
  /* ------------------------------------------------ */

  return (
    <div class="app">
      {state.loading && <LoadingOverlay />}
      {state.isStep7Transition && <Step7Loading />}

      {state.currentStep !== 7 && (
        <AppHeader />
      )}

      {state.currentStep === 6 && (
        <SelectionSummary
          brandName={state.brandName}
          category={state.category}
          colors={colorOptions
            .filter((c) => state.colors.includes(c.id))
            .map((c) => c.title)
            .join(" - ")}
          style={
            styleOptions.find((s) => s.id === state.selectedFontStyleId)?.name ||
            ""
          }
        />
      )}

      <div class="page-transition" key={state.currentStep}>
        {state.currentStep === 1 && (
          <Step1BrandName
            initialBrandName={state.brandName}
            onNext$={nextBrand}
          />
        )}

        {state.currentStep === 2 && (
          <Step2Category
            initialCategory={state.category}
            onNext$={nextCategory}
            onBack$={() => goToStep(1, false)}
          />
        )}

        {state.currentStep === 3 && (
          <Step3Favicons
            category={state.category}
            onNext$={nextFavicons}
            onBack$={() => goToStep(2, false)}
          />
        )}

        {state.currentStep === 4 && (
          <Step4Colors
            initialSelected={state.colors}
            onNext$={nextColors}
            onBack$={() => goToStep(3, false)}
          />
        )}

        {state.currentStep === 5 && (
          <Step5Style
            initialStyleId={state.selectedFontStyleId}
            onNext$={nextStyle}
            onBack$={() => goToStep(4, false)}
          />
        )}

        {state.currentStep === 6 && (
          <Step6GeneratedLogos
            brandName={state.brandName}
            selectedCategory={state.category}
            selectedStyleIds={state.selectedStyleIds}
            colors={state.colors}
            selectedFontStyleId={state.selectedFontStyleId}
            onSelect$={selectLogo}
          />
        )}

        {state.currentStep === 7 && (
          <Step7Preview
            brandName={state.brandName}
            selectedCategory={state.category}
            selectedStyleIds={state.selectedStyleIds}
            colors={state.colors}
            selectedFontStyleId={state.selectedFontStyleId}
            selectedLogoIndex={state.selectedLogoIndex}
          />
        )}
      </div>
    </div>
  );
});