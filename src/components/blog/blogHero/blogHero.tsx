import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import "./blogHero.css";

interface Post {
  slug: string;
  title: string;
  coverImage: string;
  displayDate: string;
  readingTime?: string;
}

interface BlogHeroProps {
  posts: Post[];
}

export const BlogHero = component$<BlogHeroProps>(({ posts }) => {
  if (!posts || posts.length === 0) return null;

  const ClockIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="read-time-icon"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  return (
    <section class="blog-hero-section">
      <div class="blog-hero-header">
        <span class="blog-badge">Blog</span>
        <h1 class="blog-hero-title">INSIGHTS THAT HELP YOU<br />BUILD BETTER BRANDS</h1>
        <p class="blog-hero-subtitle">
          Explore expert tips, creative ideas, and practical guides to design impactful logos and build a strong brand identity. Stay inspired with content for creators and startups.
        </p>
      </div>
      <div class="blog-hero-container">
        <div class="blog-hero-grid">
          {posts.map((post, idx) => (
            <Link key={idx} href={`/blog/${post.slug}`} class="hero-grid-post">
              <div class="hero-image-wrapper">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  class="hero-image"
                  width="400"
                  height="250"
                />
              </div>
              <div class="hero-content">
                <h2 class="hero-post-title">{post.title}</h2>
                <div class="post-meta">
                  <span class="meta-dot"></span>
                  <span class="meta-date">{post.displayDate}</span>
                  <ClockIcon />
                  <span class="meta-read-time">{post.readingTime || "4 min read"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});
