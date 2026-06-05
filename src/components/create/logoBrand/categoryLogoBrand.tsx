import { component$ } from "@builder.io/qwik";
import "./categoryLogoBrand.css";

interface BrandLogo {
  img: string;
  bg?: string;
}

interface CategoryLogoBrandProps {
  logos: BrandLogo[];
}

export const CategoryLogoBrand = component$<CategoryLogoBrandProps>(({ logos }) => {
  return (
    <section class="category-logo-brand">
      <div class="clb-header">
        <h2 class="clb-title">
          EXPLORE REAL LOGO EXAMPLES DESIGNED FOR MODERN BRANDS
        </h2>
        <p class="clb-subtitle">
          Browse a collection of professionally designed logo examples showcasing a variety of styles to inspire your brand
        </p>
      </div>

      <div class="clb-grid">
        {logos.map((logo, index) => (
          <div 
            key={index} 
            class="clb-card"
            style={logo.bg ? { backgroundColor: logo.bg } : undefined}
          >
            <img 
              src={logo.img} 
              alt={`Brand logo ${index + 1}`} 
              class="clb-img"
              width="300"
              height="350"
            />
          </div>
        ))}
      </div>
    </section>
  );
});
