import { component$ } from "@builder.io/qwik";
import "./homeBrandSection.css";

interface BrandItem {
  id: number;
  image?: string;
  alt?: string;
}

const brands: BrandItem[] = [
  { id: 1, image: "/images/home/slider/brand/1.svg", alt: "Brand 1" },
  { id: 2, image: "/images/home/slider/brand/2.svg", alt: "Brand 2" },
  { id: 3, image: "/images/home/slider/brand/3.svg", alt: "Brand 3" },
  { id: 4, image: "/images/home/slider/brand/4.svg", alt: "Brand 4" },
  { id: 5, image: "/images/home/slider/brand/5.svg", alt: "Brand 5" },
  { id: 6, image: "/images/home/slider/brand/2.svg", alt: "Brand 6" },
  { id: 7, image: "/images/home/slider/brand/1.svg", alt: "Brand 7" },
  { id: 8, image: "/images/home/slider/brand/4.svg", alt: "Brand 8" },
];

export const HomeBrandSection = component$(() => {
  return (
    <section class="brand-section">
      <h2 class="brand-title">
       Inspiring Logo Examples
        <br />
         for Your Brand
      </h2>

      <p class="brand-description">
       Discover a carefully curated collection of logo designs to spark creativity, inspire new ideas, and see everything that’s possible for your brand.
      </p>

      <div class="brand-button-wrapper">

       <a href="/app" class="brand-button">Try it for free now</a>
      </div>

      <div class="brand-grid">
        {brands.map((brand) => (
          <div key={brand.id} class="brand-card">
            {brand.image ? (
              <img
                src={brand.image}
                alt={brand.alt}
                class="brand-image"
                width={320}
                height={240}
              />
            ) : (
              <div class="brand-placeholder" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
});