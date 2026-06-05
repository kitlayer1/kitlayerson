import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import "./blogDetailHero.css";

interface BlogDetailHeroProps {
  title: string;
  description: string;
  category?: string;
  date?: string;
  readingTime?: string;
  coverImage?: string;
}

export const BlogDetailHero = component$<BlogDetailHeroProps>(
  ({ title, description, category, date, readingTime, coverImage }) => {
    return (
      <section class="blog-detail-hero">
        <div class="blog-detail-hero-inner">
          <div class="blog-detail-hero-content">
            <Link href="/blog" class="blog-hero-back-btn">
              Back
            </Link>

            <h1 class="blog-detail-hero-title">{title}</h1>

            <p class="blog-detail-hero-description">{description}</p>
          </div>

          <div class="blog-detail-hero-image-container">
            {coverImage && (
              <img 
                src={coverImage} 
                alt={title} 
                class="blog-detail-hero-image"
              />
            )}
          </div>
        </div>
      </section>
    );
  },
);

