import { component$ } from '@builder.io/qwik';
import './globalFuture.css';

export interface GlobalFutureProps {
  title: string;
  description: string | string[];
  image: string;
  reverse?: boolean;
}

export const GlobalFuture = component$<GlobalFutureProps>(({ title, description, image, reverse = false }) => {
  return (
    <section class="global-future-section">
      <div class={['global-future-container', reverse ? 'reverse' : '']}>
        <div class="global-future-content">
          <h2 class="global-future-title">{title}</h2>
          {Array.isArray(description) ? (
            description.map((paragraph, index) => (
              <p key={index} class="global-future-description">{paragraph}</p>
            ))
          ) : (
            <p class="global-future-description">{description}</p>
          )}
        </div>
        <div class="global-future-image-wrapper">
          <img src={image} alt={title} class="global-future-image" width="500" height="450" />
        </div>
      </div>
    </section>
  );
});
