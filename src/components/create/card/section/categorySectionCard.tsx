import { component$, useStyles$ } from '@builder.io/qwik';
import style0 from "./categorySectionCard.css?inline";

interface CardItem {
  badge: string;
  title: string;
  description: string;
}

interface Props {
  cards: CardItem[];
}

export const CategorySectionCard = component$<Props>(({ cards }) => {
  useStyles$(style0);

  return (
    <section class="categorySectionCard">
      <div class="categorySectionCard-container">
        {cards.map((card, index) => (
          <div key={index} class="categorySectionCard-item">

            <div class="categorySectionCard-badge">
              <span class="categorySectionCard-dot"></span>
              {card.badge}
            </div>

            <h3 class="categorySectionCard-title">
              {card.title}
            </h3>

            <p class="categorySectionCard-desc">
              {card.description}
            </p>

          </div>
        ))}
      </div>
    </section>
  );
});