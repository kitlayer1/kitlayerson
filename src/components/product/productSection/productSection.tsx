import { component$ } from '@builder.io/qwik';
import './productSection.css';
import ImgProductsection from '~/media/images/product/section/productSection.svg';

export const ProductSection = component$(() => {
  const cardData = [
    {
      id: 1,
      title: "01",
      description: "Join thousands of designers who create stunning logos with our platform every day."
    },
    {
      id: 2,
      title: "02",
      description: "Easily customize colors, fonts, and layouts to match your unique brand identity."
    },
    {
      id: 3,
      title: "03",
      description: "Download high-resolution files instantly, ready for print and digital use."
    },
    {
      id: 4,
      title: "04",
      description: "Get started for free and only pay when you are completely satisfied with your design."
    }
  ];

  return (
    <section class="product-section">
      <div class="ps-container">
        {/* Top Banner part */}
        <div class="ps-banner">
          <div class="ps-banner-image-wrapper">
             <img src={ImgProductsection} class="ps-banner-image" alt="Product Section Logo Illustration" width="1200" height="800" />
          </div>
          <div class="ps-banner-content">
            <h2 class="ps-banner-title">CREATE YOUR<br/>LOGO FOR FREE</h2>
            <div class="ps-banner-right">
              <p class="ps-banner-desc">
                Browse categories and create the perfect logo for your brand with styles tailored to your industry, designed to help you stand out and build a strong visual identity.
              </p>
              <a href="/app" class="ps-btn">
                <span class="ps-btn-text">Get Started</span>
                <span class="ps-btn-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Cards part */}
        <div class="ps-cards">
          {cardData.map((card) => (
            <div class="ps-card" key={`ps-card-${card.id}`}>
              <h3 class="ps-card-title">{card.title}</h3>
              <p class="ps-card-desc">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
