import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import './blogDetail.css';
import { HomeHeader } from '~/components/global/header/homeHeader';


/* ---------------- TYPES ---------------- */

interface BlogBlock {
  type: 'paragraph' | 'heading' | 'image';
  content?: string;
  src?: string;
  alt?: string;
  title?: string;
  description?: string;
}

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  date: string;
  displayDate: string;
  coverImage: string;
  category: string;
  readingTime: string;
  blocks: BlogBlock[];
}

/* ---------------- LOADER ---------------- */

// Vercel Edge uyumlu loader
export const useBlogPost = routeLoader$<BlogPost | null>(async (event) => {
  const { slug } = event.params;

  // public/data/blogDetail.json'den fetch
  const res = await fetch('/data/blogDetail.json');
  const posts: BlogPost[] = await res.json();

  const post = posts.find((p) => p.slug === slug);

  return post ?? null;
});

/* ---------------- COMPONENT ---------------- */

export default component$(() => {
  const post = useBlogPost();

  if (!post.value) {
    return (
      <>
        <HomeHeader />
        <div class="not-found">Blog yazısı bulunamadı.</div>
      </>
    );
  }

  return (
    <>
      <HomeHeader />

      {/* ================= HERO ================= */}
      <section class="blog-hero">
        <div class="blog-hero-left">
          <div class="blog-breadcrumb">
            Blog <span>›</span> {post.value.title}
          </div>

          <h1 class="blog-hero-title">{post.value.title}</h1>

          <div class="blog-hero-date">{post.value.displayDate}</div>
        </div>

        <div class="blog-hero-right">
          <div class="blog-hero-image-card">
            <img src={post.value.coverImage} alt={post.value.title} />
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section class="blog-detail-container">
        <div class="blog-detail-body">
          {post.value.blocks.map((block, index) => {
            if (block.type === 'paragraph') {
              return <p key={index}>{block.content}</p>;
            }

            if (block.type === 'heading') {
              return <h2 key={index}>{block.content}</h2>;
            }

            if (block.type === 'image') {
              return (
                <figure key={index} class="blog-detail-image-block">
                  <img
                    src={block.src ?? ''}
                    alt={block.alt ?? ''}
                    title={block.title ?? ''}
                    loading="lazy"
                  />
                  {block.description && <figcaption>{block.description}</figcaption>}
                </figure>
              );
            }

            return null;
          })}
        </div>
      </section>
    </>
  );
});