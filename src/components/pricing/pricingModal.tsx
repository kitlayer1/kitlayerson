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
                <div class="radio-circle">
                  {selectedPlan.value === 'started' && <div class="radio-dot" />}
                </div>
                <div class="plan-info">
                  <div class="plan-name">Started</div>
                  <div class="plan-price-desc">7.90 $ / One-time payment</div>
                </div>
              </div>

              <div 
                class={`plan-option ${selectedPlan.value === 'business' ? 'active' : ''}`}
                onClick$={() => selectedPlan.value = 'business'}
              >
                <div class="radio-circle">
                  {selectedPlan.value === 'business' && <div class="radio-dot" />}
                </div>
                <div class="plan-info">
                  <div class="plan-name">Business</div>
                  <div class="plan-price-desc">10.90 $ / One-time payment</div>
                </div>
              </div>
            </div>

            <div class="features-section">
              <p class="features-intro">
                Daha hızlı, daha akıllı tasarım yapmak için ihtiyacınız olan her şey:
              </p>
              
              <ul class="features-list-new">
                {selectedPlan.value === 'started' ? (
                  <>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>SVG, PNG ve JPG formatlarında dışa aktarma</span>
                    </li>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>Şeffaf arka plan seçeneği</span>
                    </li>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>Yüksek çözünürlüklü tasarım dosyaları</span>
                    </li>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>Tüm temel düzenleme araçlarına erişim</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span><strong>Tüm Started özellikleri dahil</strong></span>
                    </li>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>140 milyon+ premium fotoğraf ve video bileşeni</span>
                    </li>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>3.000+ premium yazı tipi ve 2 milyon+ şablon</span>
                    </li>
                    <li>
                      <span class="check-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span>Yüksek yapay zeka kullanım limitleri</span>
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
                Deneme süresi sona ermeden önce size hatırlatmada bulunacağız. <br />
                Dilediğiniz zaman kolayca iptal edebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);