import { useStyles$ } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import style0 from "./globalSection.css?inline";

export interface GlobalSectionProps {
  title?: string;
  description?: string | string[];
  buttonText?: string;
  buttonLink?: string;
  image?: string;
}

export default component$<GlobalSectionProps>(
  ({
    title,
    description,
    buttonText,
    buttonLink,
    image,
  }) => {
  useStyles$(style0);

    return (
      <section class="global-section">
        <div class="global-container">
          <div class="global-left">
            <h2 class="global-title">{title}</h2>
            {Array.isArray(description) ? (
              description.map((paragraph, index) => (
                <p key={index} class="global-description">{paragraph}</p>
              ))
            ) : (
              <p class="global-description">{description}</p>
            )}
            <a href={buttonLink} class="global-button">
              <span class="global-button-text">{buttonText}</span>
              <span class="global-button-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </a>
          </div>
          <div class="global-right">
            <div class="global-image-wrapper">
              <img src={image} alt={title} class="global-image" width="550" height="450" />
            </div>
          </div>
        </div>
      </section>
    );
  }
);
