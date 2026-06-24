import { useStyles$ } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import style0 from "./homeSection.css?inline";
import ImgHomesection1200 from '~/media/images/home/section/homeSection-1200w.webp';
import ImgHomesection768 from '~/media/images/home/section/homeSection-768w.webp';
import ImgHomesection480 from '~/media/images/home/section/homeSection-480w.webp';

export const HomeSection = component$(() => {
  useStyles$(style0);

  return (
    <section class="home-section">
      <div class="hs-container">
        <div class="hs-banner">
          <div class="hs-banner-image-wrapper">
            <picture>
              <source
                media="(max-width: 480px)"
                srcset={ImgHomesection480}
                type="image/webp"
              />
              <source
                media="(max-width: 768px)"
                srcset={ImgHomesection768}
                type="image/webp"
              />
              <source
                media="(min-width: 769px)"
                srcset={ImgHomesection1200}
                type="image/webp"
              />
              <img
                src={ImgHomesection1200}
                alt="Home Section Banner Showcase"
                class="hs-banner-image"
                width="1200"
                height="658"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
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