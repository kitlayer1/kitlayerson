import { component$, Slot } from "@builder.io/qwik";
import "./productSection.css";

interface ProductSectionProps {
  title: string;
  description: string;
  text: string;
  reverse?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

export const ProductSection = component$<ProductSectionProps>(
  ({ title, description, text, reverse, imageSrc, imageAlt }) => {
    return (
      <section class={`product-section ${reverse ? "reverse" : ""}`}>
        <div class="product-container">

          <div class="product-text">
            <h2>{title}</h2>
            <p class="desc">{description}</p>
            <p>{text}</p>
          </div>

          <div class="product-image">
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