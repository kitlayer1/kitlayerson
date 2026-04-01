import { component$ } from "@builder.io/qwik";
import "./abouthero.css";

export const AboutHero = component$(() => {
  return (
    <section class="about-hero">
      <div class="about-hero-container">
         <div class="about-badge">
          <span class="badge-dot"></span>
          About
        </div>
        <h1 class="about-hero-title">Building Brands, One Logo at a Time</h1>
        <p class="about-hero-subtitle">
We combine creativity, innovation, and simplicity to help brands like yours stand out. See how our journey fuels every logo we create</p>

        <div class="about-hero-cards">
          {/* Card 1 */}
          <div class="about-card">
            <div class="about-card-header">
              <span class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-Width="1.5"
                  stroke-Linecap="round"
                  stroke-Linejoin="round"
                >
                  <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                  <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                </svg>
              </span>
              <h3>FAQs</h3>
            </div>
            <p>
              Find clear answers to all your questions about Kitlayer. From logo creation and customization to download options, usage rights, and payments, our FAQ section guides you step by step.
            </p>
            <button
              class="about-btn"
              onClick$={() => (window.location.href = "/faqs")}
            >
              Faq's
            </button>
          </div>
          <div class="about-card">
            <div class="about-card-header">
              <span class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-Width="1.5"
                  stroke-Linecap="round"
                  stroke-Linejoin="round"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
              </span>
              <h3>Contact Us</h3>
            </div>
            <p>
            Get in touch with the Kitlayer team. Whether you have questions about logo creation, features, or your account, we’re here to help and provide fast, friendly support to assist your brand journey.
            </p>
            <button
              class="about-btn"
              onClick$={() => (window.location.href = "/contact")}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});
