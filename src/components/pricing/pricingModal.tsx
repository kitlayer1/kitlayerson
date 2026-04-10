// src/components/pricing/pricingModal.tsx
import { component$, $, QRL, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { supabase } from "~/lib/supabaseClient";
import "./pricingModal.css";

export const PricingModal = component$(
  (props: {
    sessionId: string;
    currentPlan?: 'started' | 'business' | null;
    onClose$: QRL<() => void>;
    onSuccess$: QRL<(planType: 'started' | 'business') => void>;
  }) => {
    const selectedPlan = useSignal<'started' | 'business'>('started');

    const handlePurchase = $(async (planType: 'started' | 'business') => {
      const { error } = await supabase
        .from("logo_sessions")
        .update({
          paid: true,
          plan_type: planType
        })
        .eq("id", props.sessionId);

      if (!error) {
        props.onSuccess$(planType);
      }
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      const handleMessage = async (e: MessageEvent) => {
        if (typeof e.data === 'string') {
          try {
            const data = JSON.parse(e.data);
            if (data.event === 'LemonSqueezy.Order.Success') {
              console.log("Lemon Squeezy Success Event:", data);
              const planType = data.custom?.plan_type || 'started';
              await handlePurchase(planType);
            }
          } catch {
            // Ignore non-JSON messages
          }
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    });

    const checkoutLinks = {
      started: "https://kitlayer.lemonsqueezy.com/checkout/buy/2a12b7dc-0b31-482d-ab8b-daf4987d8ceb?embed=1&media=0&logo=0&desc=0",
      business: "https://kitlayer.lemonsqueezy.com/checkout/buy/5df2ca15-91ef-46a3-a96b-69930e811cdc?embed=1&media=0&logo=0&desc=0",
      upgrade: "https://kitlayer.lemonsqueezy.com/checkout/buy/cb16d9af-ce14-4bbc-9ba4-530b9f0e9bdf?embed=1&media=0&logo=0&desc=0"
    };

    const isUpgrading = props.currentPlan === 'started';

    const getCheckoutUrl = (plan: 'started' | 'business') => {
      let baseUrl = checkoutLinks[plan];
      if (plan === 'business' && isUpgrading) {
        baseUrl = checkoutLinks.upgrade;
      }
      const connector = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${connector}checkout[custom][session_id]=${props.sessionId}&checkout[custom][plan_type]=${plan}`;
    };

    return (
      <div class="pricing-overlay">
        <div class="pricing-backdrop" onClick$={props.onClose$} />
        <div class="pricing-modal">
          <div class="pricing-header">
            <button class="close-btn" onClick$={props.onClose$}>✕</button>
          </div>

          <div class="pricing-content">
            <h2 class="pricing-title">
              <span class="gradient-text">Kitlayer</span> planını ücretsiz deneyin
            </h2>

            <div class="plans-selection">
              <div 
                class={`plan-option ${selectedPlan.value === 'started' ? 'active' : ''}`}
                onClick$={() => selectedPlan.value = 'started'}
              >
                <div class="plan-left">
                  <div class="radio-circle">
                    {selectedPlan.value === 'started' && <div class="radio-dot" />}
                  </div>
                  <div class="plan-info">
                    <div class="plan-name">Started</div>
                    <div class="plan-desc">one-time payment</div>
                  </div>
                </div>
                <div class="plan-right">
                  <div class="plan-price">7,90$</div>
                </div>
              </div>

              <div 
                class={`plan-option ${selectedPlan.value === 'business' ? 'active' : ''}`}
                onClick$={() => selectedPlan.value = 'business'}
              >
                <div class="plan-left">
                  <div class="radio-circle">
                    {selectedPlan.value === 'business' && <div class="radio-dot" />}
                  </div>
                  <div class="plan-info">
                    <div class="plan-name">Business</div>
                    <div class="plan-desc">one-time payment</div>
                  </div>
                </div>
                <div class="plan-right">
                  <div class="plan-price">10,90$</div>
                </div>
              </div>
            </div>

            <div class="features-section">
              <p class="features-intro">
                All Features and Advantages Included in This Plan:
              </p>
              
              <ul class="features-list-new">
                {selectedPlan.value === 'started' ? (
                  <>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>JPG, PNG, PDF, SVG & ZIP exports</span>
                    </li>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>Transparent Background Option</span>
                    </li>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>High-resolution files</span>
                    </li>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>Full customization access</span>
                    </li>
                     <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>Commercial use license</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span><strong>All Started features included</strong></span>
                    </li>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>Inverted color version</span>
                    </li>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>Black & white logo version</span>
                    </li>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>Favicon version</span>
                    </li>
                      <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>Commercial use license</span>
                    </li>
                     <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>Priority support</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div class="pricing-footer">
              <a 
                href={getCheckoutUrl(selectedPlan.value)}
                class="select-btn-large"
              >
                {isUpgrading && selectedPlan.value === 'business' ? "Upgrade Now" : "Select"}
              </a>
              <p class="footer-note">
               When you purchase a logo package, you gain full usage rights <br /> and the logo is permanently removed from our library.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);