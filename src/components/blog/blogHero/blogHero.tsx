import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import "./blogHero.css";

interface BlogHeroProps {
  featuredPost: {
    slug: string;
    title: string;
    description: string;
    coverImage: string;
  };
}

export const BlogHero = component$<BlogHeroProps>(({ featuredPost }) => {
  return (
    <section class="blog-hero">
      <div class="container">
        <div class="blog-hero-header">
          <div class="blog-badge">
            <span class="badge-dot"></span>
            Blog
          </div>
          <h1 class="hero-title">Insights, Tips, and Inspiration for Your Brand</h1>
          <p class="hero-subtitle">
           Explore our blog for expert advice, creative ideas, and practical tips to help your brand grow, stand out, and succeed. Stay updated with the latest trends, design inspiration, and valuable resources tailored for you.
          </p>
        </div>

        <div class="featured-card">
          <div class="featured-content">
            <h2 class="featured-title">{featuredPost.title}</h2>
            <p class="featured-description">{featuredPost.description}</p>
            <Link href={`/blog/${featuredPost.slug}`} class="detail-button">
              Detail
            </Link>
          </div>
          <div class="featured-image-wrapper">
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              class="featured-image"
              width="800"
              height="450"
            />
          </div>
        </div>
      </div>
    </section>
  );
});
