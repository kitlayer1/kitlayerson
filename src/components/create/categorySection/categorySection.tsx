import { component$, useStyles$ } from '@builder.io/qwik';
import style0 from "./categorySection.css?inline";

interface CardItem {
  badge?: string;
  title: string;
  description: string;
  img?: string;
}

interface Props {
  cards: CardItem[];
}

export const CategorySection = component$<Props>(({ cards }) => {
  useStyles$(style0);

  return (
    <section class="category-sections">
      <div class="category-sections-container">
        {cards.map((card, index) => (
          <div key={index} class={`category-sections-row ${index % 2 !== 0 ? "reverse" : ""}`}>
            <div class="category-sections-content">
              <h2 class="category-sections-title">{card.title}</h2>
              <div class="category-sections-desc">
                <p>{card.description}</p>
                <p>{card.description}</p>
              </div>
            </div>
            <div class="category-sections-image">
              <img src={card.img || "/images/about/hero/aboutHero.jpg"} alt={card.title} width="600" height="600" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});
