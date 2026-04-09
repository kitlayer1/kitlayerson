import { component$, Slot } from "@builder.io/qwik";
import "./homeSectionPanel.css";

interface ProductSectionProps {
  title: string;
  description: string;
  text: string;
  reverse?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

export const HomeSectionPanel = component$<ProductSectionProps>(
  ({ title, description, text, reverse, imageSrc, imageAlt }) => {
    return (
      <section class={`homeSectionPanel ${reverse ? "reverse" : ""}`}>
        <div class="homeSectionPanel-container">

          <div class="homeSectionPanel-text">
            <h2>{title}</h2>
            <p class="homeSectionPanel-desc">{description}</p>
            <p>{text}</p>
          </div>

          <div class="homeSectionPanel-image">
            {imageSrc ? (
              <img src={imageSrc} alt={imageAlt || title} width="400" height="300" />
            ) : (
              <Slot />
            )}
          </div>

        </div>
      </section>
    );
  }
);