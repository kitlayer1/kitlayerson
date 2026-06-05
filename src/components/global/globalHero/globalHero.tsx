import { component$ } from '@builder.io/qwik';
import './globalHero.css';

export interface GlobalHeroProps {
  badgeText?: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  bottomText?: string;
  avatars?: string[];
  image: string;
  imageAlt?: string;
}

export const GlobalHero = component$<GlobalHeroProps>(
  ({
    badgeText,
    title,
    description,
    buttonText = 'Get started',
    buttonLink = '/app',
    bottomText,
    avatars = [
      '/images/global/hero/user/globalHeroUser1.svg',
      '/images/global/hero/user/globalHeroUser2.svg',
      '/images/global/hero/user/globalHeroUser3.svg'
    ],
    image,
    imageAlt = 'Hero image',
  }) => {
    return (
      <section class="global-hero-section">
        <div class="gh-container">
          <div class="gh-content-left">
            {badgeText && (
              <div class="gh-badge">
                {badgeText}
              </div>
            )}
            <h1 class="gh-title">{title}</h1>
            <p class="gh-desc">{description}</p>
            <a href={buttonLink} class="gh-btn">
              <span class="gh-btn-text">{buttonText}</span>
              <span class="gh-btn-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </a>
            {bottomText && (
              <div class="gh-bottom-info">
                <div class="gh-avatars">
                  {avatars.map((avatar, index) => (
                    <img key={index} src={avatar} alt="Avatar" class="gh-avatar" width="30" height="30" />
                  ))}
                </div>
                <p class="gh-bottom-text">{bottomText}</p>
              </div>
            )}
          </div>
          <div class="gh-image-wrapper">
             <img src={image} alt={imageAlt} class="gh-image" width="900" height="400" />
          </div>
        </div>
      </section>
    );
  }
);
