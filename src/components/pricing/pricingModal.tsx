// src/components/pricing/pricingModal.tsx
import { component$, $, QRL, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { supabase } from "~/lib/supabaseClient";
import "./pricingModal.css";

const getIcon = (name: string) => {
  switch (name) {
    case 'refresh': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon-v3"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;
    case 'sparkles': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon-v3"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
    case 'search': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon-v3"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>; // simplified doc icon
    case 'window': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon-v3"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>;
    case 'cup': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon-v3"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>;
    case 'target': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon-v3"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
    case 'flask': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon-v3"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><circle cx="12" cy="16" r="3"/></svg>;
    case 'sliders': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon-v3"><line x1="4" x2="20" y1="21" y2="21"/><line x1="4" x2="20" y1="14" y2="14"/><line x1="4" x2="20" y1="7" y2="7"/></svg>;
    case 'calendar': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon-v3"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
    case 'monitor': return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-icon-v3"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>;
    default: return null;
  }
};

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
      <div class="pricing-overlay-v3">
        <div class="pricing-backdrop-v3" onClick$={props.onClose$} />
        <div class="pricing-modal-v3">
          <button class="close-btn-v3" onClick$={props.onClose$}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <h2 class="pricing-title-main-v3">Upgrade your logo with Kitlayer.</h2>

          <div class="pricing-cards-v3">
            {/* Free Plan */}
            <div class="pricing-card-v3">
              <div class="card-header-v3">
                <span class="package-name-v3">Started</span>
                <h3>Free</h3>
                <p>Get started with basic logo creation tools and explore our platform at no cost</p>
              </div>
              <button class="card-btn-v3 available-btn" disabled>Available</button>
              <ul class="card-features-v3">
                <li>{getIcon('refresh')}<span>Download logo in JPG format</span></li>
                <li>{getIcon('sparkles')}<span>Standard resolution export</span></li>
                <li>{getIcon('search')}<span>Basic customization</span></li>
                <li>{getIcon('window')}<span>Standard logo usage</span></li>
              </ul>
            </div>

            {/* Started Plan */}
            <div class="pricing-card-v3">
              <div class="card-header-v3">
                <span class="package-name-v3">Pro</span>
                <h3>$7.90 <span>/ One-time payment</span></h3>
                <p>Unlock more customization options and download high-quality logos for your brand</p>
              </div>
              {props.currentPlan === 'started' || props.currentPlan === 'business' ? (
                <button class="card-btn-v3 available-btn" disabled>Available</button>
              ) : (
                <a href={getCheckoutUrl('started')} class="card-btn-v3">Upgrade</a>
              )}
              <ul class="card-features-v3">
                <li>{getIcon('refresh')}<span>SVG, PNG & JPG exports</span></li>
                <li>{getIcon('sparkles')}<span>Transparent background</span></li>
                <li>{getIcon('search')}<span>High-resolution files</span></li>
                <li>{getIcon('cup')}<span>Full customization access</span></li>
                <li>{getIcon('target')}<span>Commercial use license</span></li>
              </ul>
            </div>

            {/* Business Plan */}
            <div class="pricing-card-v3">
              <div class="card-header-v3">
                <span class="package-name-v3">Premium</span>
                <h3>${props.currentPlan === 'started' ? '3.00' : '10.90'} <span>/ One-time payment</span></h3>
                <p>Get premium features, unlimited downloads, and tools to grow your brand</p>
              </div>
              {props.currentPlan === 'business' ? (
                <button class="card-btn-v3 available-btn" disabled>Available</button>
              ) : (
                <a href={getCheckoutUrl('business')} class="card-btn-v3">Upgrade</a>
              )}
              <ul class="card-features-v3">
                <li class="blue-text">{getIcon('monitor')}<span>Everything in Started</span></li>
                <li>{getIcon('refresh')}<span>Black & white logo version</span></li>
                <li>{getIcon('sparkles')}<span>Inverted color version</span></li>
                <li>{getIcon('search')}<span>Favicon version</span></li>
                <li>{getIcon('window')}<span>Commercial use license</span></li>
                <li>{getIcon('cup')}<span>Priority support</span></li>
                <li>{getIcon('target')}<span>Exclusive ownership guaranteed</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
);