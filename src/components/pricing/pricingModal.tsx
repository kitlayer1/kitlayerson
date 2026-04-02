// src/components/pricing/pricingModal.tsx
import { component$, $, QRL, useVisibleTask$ } from "@builder.io/qwik";
import { supabase } from "~/lib/supabaseClient";
import "./pricingModal.css";

export const PricingModal = component$(
  (props: {
    sessionId: string;
    currentPlan?: 'started' | 'business' | null;
    onClose$: QRL<() => void>;
    onSuccess$: QRL<(planType: 'started' | 'business') => void>;
  }) => {
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
              // Extract plan type from custom data if available, otherwise default
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
      return `${baseUrl}${connector}checkout[custom][session_id]=${props.sessionId}&checkout[custom][plan_type]=business`;
    };

    return (
      <div class="pricing-overlay">
        <div class="pricing-backdrop" onClick$={props.onClose$} />
        <div class="pricing-modal">
          <div class="pricing-header">
            <h3>Choose Your Plan</h3>
            <button class="close-btn" onClick$={props.onClose$}>✕</button>
          </div>

          <div class="pricing-intro">
            <h2>Simple Pricing Maximum Value</h2>
            <p>
              Pick the plan that fits your brand perfectly. Get full access to our logo creation tools, 
              premium features, and hassle-free downloads to bring your brand to life quickly and effortlessly.
            </p>
          </div>

          <div class="pricing-body">
            {/* Started Package */}
            <div class="plan">
              <div class="plan-badge">
                <span class="dot"></span> Started
              </div>
              
              <div class="price-container">
                <span class="price">7.90 $</span>
              </div>

              <p class="plan-desc">
                Unlock more customization options and download high-quality logos for your growing brand.
              </p>

              <a 
                href={getCheckoutUrl('started')} 
                class="select-btn lemonsqueezy-button"
              >
                Select
              </a>

              <ul class="features-list">
                <li>SVG, PNG & JPG exports</li>
                <li>Transparent background</li>
                <li>High-resolution files</li>
                <li>Full customization access</li>
              </ul>
            </div>

            {/* Premium Package (Business Tier) */}
            <div class="plan">
              <div class="plan-badge">
                <span class="dot"></span> Premium
              </div>
              
              <div class="price-container">
                <span class="price">{isUpgrading ? "3.00 $" : "10.90 $"}</span>
              </div>

              <p class="plan-desc">
                Unlock more customization options and download high-quality logos for your growing brand.
              </p>

              <a 
                href={getCheckoutUrl('business')} 
                class="select-btn lemonsqueezy-button"
              >
                {isUpgrading ? "Upgrade Now" : "Select"}
              </a>

              <ul class="features-list">
                <li>SVG, PNG & JPG exports</li>
                <li>Transparent background</li>
                <li>High-resolution files</li>
                <li>Full customization access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
);