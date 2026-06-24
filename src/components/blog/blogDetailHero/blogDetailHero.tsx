import { component$, useStyles$ } from '@builder.io/qwik';
import { Link } from "@builder.io/qwik-city";
import style0 from "./blogDetailHero.css?inline";

interface BlogDetailHeroProps {
  title: string;
  description: string;
  category?: string;
  date?: string;
  readingTime?: string;
  coverImage?: string;
}

export const BlogDetailHero = component$<BlogDetailHeroProps>(
  ({ title, description, coverImage }) => {
  useStyles$(style0);

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
                width={520}
                height={500}
                loading="eager"
                fetchPriority="high"
              />
            )}
          </div>
        </div>
      </section>
    );
  },
);

