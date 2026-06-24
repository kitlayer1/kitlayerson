import { component$, useStyles$ } from '@builder.io/qwik';
import style0 from "./homeLogoTypeCard.css?inline";

interface CardItem {
  label: string;
  icon: string;
}

export const HomeLogoTypeCard = component$(() => {
  useStyles$(style0);

  const items: CardItem[] = [
    { label: "PNG", icon: "/images/home/logoType/png.png" },
    { label: "SVG", icon: "/images/home/logoType/svg.png" },
    { label: "JPG", icon: "/images/home/logoType/jpg.png" },
    { label: "PDF", icon: "/images/home/logoType/pdf.png" },
    { label: "ZIP", icon: "/images/home/logoType/zip.png" },
    { label: "Main Logo", icon: "/images/home/logoType/color.png" },
    { label: "Inverset Logo", icon: "/images/home/logoType/color.png" },
    { label: "Black Logo", icon: "/images/home/logoType/color.png" },
    { label: "White Logo", icon: "/images/home/logoType/color.png" },
    { label: "Transparent", icon: "/images/home/logoType/color.png" },
  ];

  return (
    <section class="home-logo-type-section">
      <div class="logo-type-container">
        <p class="logo-type-description">
      Download Your Logo in Multiple File Formats and Sizes, optimized for web, print, and all digital platforms you may need.
        </p>

        <div class="logo-type-grid">
          {items.map((item, index) => (
            <div key={index} class="logo-type-card">
              <img 
                src={item.icon} 
                alt={item.label} 
                class="logo-type-icon" 
                width={34} 
                height={34} 
              />
              <span class="logo-type-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
