import { component$ } from '@builder.io/qwik';
import './pricingSection.css';

export const PricingSection = component$(() => {
  return (
    <section class="pricing-section">
      <div class="pricing-container">
        <div class="pricing-header">
          <span class="pricing-badge">Pricing</span>
          <h2 class="pricing-title">Straightforward Pricing<br />Strong Results</h2>
          <p class="pricing-subtitle">
            Pick the plan that fits your brand perfectly. Get logo tools, premium features, and instant downloads to build your brand.
          </p>
        </div>

        <div class="pricing-cards">
          {/* Started Plan */}
          <div class="pricing-card">
            <h3 class="card-title">Started</h3>
            <div class="card-price">
              <span class="price-value">FREE</span>
            </div>
            <p class="card-description">
              Get started with basic logo creation tools and explore our platform at no cost to create your brand easily.
            </p>
            <a href="/app" class="card-button button-yellow">
              Started
            </a>
            <ul class="card-features">
              <li>
                <CheckIcon />
                <span>Download logo in JPG format</span>
              </li>
              <li>
                <CheckIcon />
                <span>Standard resolution export</span>
              </li>
              <li>
                <CheckIcon />
                <span>Basic customization</span>
              </li>
            </ul>
          </div>

          {/* Premium Plan */}
          <div class="pricing-card">
            <h3 class="card-title">Premium</h3>
            <div class="card-price">
              <span class="price-value">7.90 <span class="price-currency">$</span></span>
              <span class="price-period">/ One-time payment</span>
            </div>
            <p class="card-description">
              Unlock more customization options and download high-quality logos for your growing brand.
            </p>
            <a href="/app" class="card-button button-green">
              Started
            </a>
            <ul class="card-features">
              <li>
                <CheckIcon />
                <span>SVG, PNG & JPG exports</span>
              </li>
              <li>
                <CheckIcon />
                <span>Transparent background</span>
              </li>
              <li>
                <CheckIcon />
                <span>High-resolution files</span>
              </li>
              <li>
                <CheckIcon />
                <span>Full customization access</span>
              </li>
              <li>
                <CheckIcon />
                <span>Commercial use license</span>
              </li>
            </ul>
            <div class="card-footer">
              <p>Full commercial rights.<br />Exclusive ownership guaranteed.</p>
            </div>
          </div>

          {/* Pro Plan */}
          <div class="pricing-card">
            <h3 class="card-title">Pro</h3>
            <div class="card-price">
              <span class="price-value">10.90 <span class="price-currency">$</span></span>
              <span class="price-period">/ One-time payment</span>
            </div>
            <p class="card-description">
              Access all premium features, unlimited downloads, and advanced tools to scale your brand effortlessly.
            </p>
            <a href="/app" class="card-button button-green">
              Started
            </a>
            <ul class="card-features">
              <li>
                <CheckIcon />
                <span>Everything in Started</span>
              </li>
              <li>
                <CheckIcon />
                <span>Black & white logo version</span>
              </li>
              <li>
                <CheckIcon />
                <span>Inverted color version</span>
              </li>
              <li>
                <CheckIcon />
                <span>Favicon version</span>
              </li>
              <li>
                <CheckIcon />
                <span>Commercial use license</span>
              </li>
              <li>
                <CheckIcon />
                <span>Priority support</span>
              </li>
            </ul>
            <div class="card-footer">
              <p>Full commercial rights.<br />Exclusive ownership guaranteed.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-heading-dark-1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check">
    <circle cx="12" cy="12" r="10" fill="var(--color-primary-200)" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
