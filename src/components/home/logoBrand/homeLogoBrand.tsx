import { component$ } from "@builder.io/qwik";
import "./homeLogoBrand.css";

interface BrandCard {
  id: number;
  name: string;
  image: string;
  hoverImage: string;
  logoUrl?: string;
}

export const HomeLogoBrand = component$(() => {
  const brands: BrandCard[] = [
    {
      id: 1,
      name: "Agrovia",
      image: "/images/home/brandLogo/agrovia-logo-2.svg",
      hoverImage: "/images/home/brandLogo/agrovia-logo-1.svg",
    },
    {
      id: 2,
      name: "Skyroute",
      image: "/images/home/brandLogo/skyroute-logo-2.svg",
      hoverImage: "/images/home/brandLogo/skyroute-logo-1.svg",
    },
    {
      id: 3,
      name: "Noire",
      image: "/images/home/brandLogo/noire-logo-2.svg",
      hoverImage: "/images/home/brandLogo/noire-logo-1.svg",
    },
    {
      id: 4,
      name: "Greefly",
      image: "/images/home/brandLogo/greefly-logo-2.svg",
      hoverImage: "/images/home/brandLogo/greefly-logo-1.svg",
    },
    {
      id: 5,
      name: "Learnix",
      image: "/images/home/brandLogo/noise-logo-2.svg",
      hoverImage: "/images/home/brandLogo/noise-logo-1.svg",
    },
  ];

  return (
    <section class="home-logo-brand">
      <div class="brand-header">
        <h1 class="brand-title">
          EXPLORE REAL LOGO EXAMPLES DESIGNED FOR MODERN BRANDS
        </h1>
        <p class="brand-subtitle">
         Browse a collection of professionally designed logo examples, showcasing a variety of styles to inspire your brand
        </p>
      </div>

      <div class="brand-grid">
        {brands.map((brand) => (
          <div key={brand.id} class="brand-card">
            <img 
              src={brand.image} 
              alt={`${brand.name} background`} 
              class="brand-bg brand-bg-default"
              width="300"
              height="350"
            />
            <img 
              src={brand.hoverImage} 
              alt={`${brand.name} hover background`} 
              class="brand-bg brand-bg-hover"
              width="300"
              height="350"
            />
          </div>
        ))}
      </div>
    </section>
  );
});
