import { component$ } from '@builder.io/qwik';
import './homeSection.css';
import ImgHomesection from '~/media/images/home/section/homeSection.png';

export const HomeSection = component$(() => {
  return (
    <section class="home-section">
      <div class="hs-container">
        <div class="hs-banner">
          <div class="hs-banner-image-wrapper">
            <img src={ImgHomesection} alt="Home Section Banner Showcase" class="hs-banner-image" width="1200" height="800" />
          </div>

          <div class="hs-banner-content">
            <h2 class="hs-banner-title">
              CREATE YOUR  <br /> LOGO FOR FREE
            </h2>

            <div class="hs-banner-right">
              <p class="hs-banner-desc">
                Browse categories and create the perfect logo for your brand with styles tailored to your industry, designed to help you stand out and build a strong visual identity.
              </p>

              <a href="/app" class="hs-btn">
                <span class="hs-btn-text">Get Started</span>
                <span class="hs-btn-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});