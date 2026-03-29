import { component$ } from "@builder.io/qwik";
import "./blogDetailHero.css";

interface BlogDetailHeroProps {
  title: string;
  description: string;
  coverImage: string;
}

export const BlogDetailHero = component$<BlogDetailHeroProps>(
  ({ title, description, coverImage }) => {
    return (
      <section class="blog-detail-hero">
        <div class="blog-detail-hero-inner">
          <div class="blog-tag">
            <span class="dot"></span> Blog
          </div>

          <h1 class="blog-detail-hero-title">{title}</h1>

          <p class="blog-detail-hero-description">{description}</p>

          <div class="blog-detail-hero-image-wrapper">
            <img src={coverImage} alt={title} width="800" height="400" />
          </div>
        </div>
      </section>
    );
  },
);
