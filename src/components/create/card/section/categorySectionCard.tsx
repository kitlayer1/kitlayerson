import { component$ } from "@builder.io/qwik";
import "./categorySectionCard.css";

interface CardItem {
  badge: string;
  title: string;
  description: string;
}

interface Props {
  cards: CardItem[];
}

export const CategorySectionCard = component$<Props>(({ cards }) => {
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