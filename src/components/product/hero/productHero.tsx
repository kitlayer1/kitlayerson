import { component$ } from '@builder.io/qwik';
import './productHero.css';

interface ProductHeroProps {
  badgeText?: string;
  title: string;
  description: string;
  buttonText?: string;
}

export const ProductHero = component$<ProductHeroProps>(
  ({
    badgeText = 'Product',
    title,
    description,
    buttonText = 'Get Started',
  }) => {
    return (
      <section class="product-hero">
        <div class="product-hero__inner">
          <span class="product-hero__badge">
            <span class="badge-dot"></span>
            {badgeText}
          </span>

          <h1 class="product-hero__title">{title}</h1>

          <p class="product-hero__description">{description}</p>

          <a href="/app" class="product-hero__button">
  {buttonText}
</a>
        </div>

      </section>
    );
  }
);