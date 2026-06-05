import { component$, useStylesScoped$, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import styles from "./aboutSection.css?inline";

export interface AboutCardProps {
  title: string;
  description: string;
  buttonText: string;
  link?: string;
}

export interface AboutSectionProps {
  cards: AboutCardProps[];
}

export const AboutSection = component$<AboutSectionProps>(({ cards }) => {
  useStylesScoped$(styles);
  const nav = useNavigate();

  return (
    <section class="about-section">
      <div class="about-container">
        {cards.map((card, index) => (
          <div key={index} class="about-card">
            
            <div class="about-content">
              <h3 class="about-title">{card.title}</h3>
              <p class="about-description">{card.description}</p>
            </div>

            <button
              class="about-button"
              onClick$={() => {
                if (card.link) nav(card.link);
              }}
            >
              <span class="about-button-text">
                {card.buttonText}
              </span>

              <div class="about-button-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

            </button>

          </div>
        ))}
      </div>
    </section>
  );
});