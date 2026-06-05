import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import "./loading.css";

export const Step7Loading = component$(() => {
  const phase = useSignal(1);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const timer = setTimeout(() => {
      phase.value = 2;
    }, 2000);
    return () => clearTimeout(timer);
  });

  return (
    <div class="step7-loading-overlay">
      <div class="step7-loading-content">
        <img src="/images/app/loader/loaderLogo.svg" alt="Loading Logo" class="step7-loader-logo" />
        
        <div class="step7-text-container" key={phase.value}>
          {phase.value === 1 ? (
            <>
              <h2>YOUR LOGO IS BEING GENERATED...</h2>
              <p>We're creating unique logo concepts based on your brand name,<br/>style, and preferences.</p>
            </>
          ) : (
            <>
              <h2>YOUR LOGO IS BEING PACKAGED....</h2>
              <p>Preparing your final logo files and brand assets for download.</p>
            </>
          )}
        </div>
        
        <div class="step7-spinner">
           <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader">
             <line x1="12" x2="12" y1="2" y2="6"/>
             <line x1="12" x2="12" y1="18" y2="22"/>
             <line x1="4.93" x2="7.76" y1="4.93" y2="7.76"/>
             <line x1="16.24" x2="19.07" y1="16.24" y2="19.07"/>
             <line x1="2" x2="6" y1="12" y2="12"/>
             <line x1="18" x2="22" y1="12" y2="12"/>
             <line x1="4.93" x2="7.76" y1="19.07" y2="16.24"/>
             <line x1="16.24" x2="19.07" y1="7.76" y2="4.93"/>
           </svg>
        </div>
      </div>
    </div>
  );
});
