import { useStyles$ } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import { routeLoader$, Link, type DocumentHead } from '@builder.io/qwik-city';
import style0 from "./blogDetail.css?inline";
import { BlogDetailHero } from '~/components/blog/blogDetailHero/blogDetailHero';
import blogData from '../../../../public/data/blogDetail.json';
import { HomeHeader } from '~/components/global/header/homeHeader';
import { Footer } from '~/components/global/footer/footer';

/* ---------------- TYPES ---------------- */

interface BlogBlock {
  type: 'paragraph' | 'heading' | 'image';
  content?: string;
  src?: string;
  alt?: string;
  title?: string;
  description?: string;
  level?: number;
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
  const posts = blogData as BlogPost[];
  // Slug unique değilse ilkini al
  const post = posts.find((p) => p.slug === slug);
  return post ?? null;
});

export default component$(() => {
  useStyles$(style0);

  const post = useBlogPost();
  
  if (!post.value) {
    return (
      <div class="not-found-container">
        <div class="not-found">Blog post not found.</div>
        <Link href="/blog" class="back-link">Back to Blog</Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://kitlayer.com/blog/${post.value.slug}`
    },
    "headline": post.value.seoTitle || post.value.title,
    "description": post.value.seoDescription || post.value.excerpt,
    "image": `https://kitlayer.com${post.value.coverImage}`,
    "author": {
      "@type": "Organization",
      "name": "Kitlayer"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kitlayer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kitlayer.com/logo.png"
      }
    },
    "datePublished": post.value.date,
    "dateModified": post.value.date
  };

  return (
    <article class="blog-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={JSON.stringify(jsonLd)} />
      <HomeHeader variant="light" />
      {/* ================= HERO ================= */}
      <BlogDetailHero
        title={post.value.title}
        description={post.value.excerpt}
        category={post.value.category}
        date={post.value.displayDate}
        readingTime={post.value.readingTime}
        coverImage={post.value.coverImage}
      />

      {/* ================= CONTENT ================= */}
      <div class="blog-content-container">
        <aside class="blogs-sidebar">
          <div class="blogs-sidebar-header">
            <h2 class="blogs-sidebar-title">{post.value.title}</h2>
            <p class="blogs-sidebar-excerpt">{post.value.excerpt}</p>
          </div>

          <div class="blog-sidebar-meta-list">
            <div class="meta-row">
              <span class="meta-label">Date</span>
              <span class="meta-value">{post.value.displayDate}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Category</span>
              <span class="meta-value">{post.value.category}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Reading Time</span>
              <span class="meta-value">{post.value.readingTime}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Roles</span>
              <span class="meta-value">Admin</span>
            </div>
          </div>

          <div class="blogs-sidebar-social">
            <Link href="#" class="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </Link>
            <Link href="#" class="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </Link>
            <Link href="#" class="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </Link>
            <Link href="#" class="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 19c5 0 8-4 8-8V7a4 4 0 0 0-8 0v4c0 4 3 8 8 8z"></path><path d="M12 22s8-4 8-10V5"></path></svg>
            </Link>
          </div>
        </aside>

        <div class="blog-post-body">
          {post.value.blocks.map((block, index) => {
            switch (block.type) {
              case 'heading': {
                const Tag = `h${block.level || 2}` as any;
                return <Tag key={index}>{block.content}</Tag>;
              }
              
              case 'paragraph':
                return <p key={index}>{block.content}</p>;
              
              case 'image':
                return (
                  <figure key={index} class="blog-image-block">
                    <img src={block.src} alt={block.alt || block.title || 'Blog post image'} width={800} height={450} loading="lazy" />
                    {(block.title || block.description) && (
                      <figcaption class="blog-image-caption">
                        {block.title && <strong>{block.title} </strong>}
                        {block.description}
                      </figcaption>
                    )}
                  </figure>
                );
              
              default:
                return null;
            }
          })}
        </div>
      </div>
       <Footer />
    </article>
    
  );
});

export const head: DocumentHead = ({ resolveValue, url }) => {
  const post = resolveValue(useBlogPost);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Kitlayer',
      meta: [
        { name: 'description', content: 'The requested blog post could not be found.' }
      ]
    };
  }

  return {
    title: post.seoTitle ? `${post.seoTitle} | Kitlayer` : `${post.title} | Kitlayer`,
    meta: [
      { name: 'description', content: post.seoDescription || post.excerpt },
      { property: 'og:title', content: post.seoTitle || post.title },
      { property: 'og:description', content: post.seoDescription || post.excerpt },
      { property: 'og:image', content: `https://kitlayer.com${post.coverImage}` },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: url.href },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: post.seoTitle || post.title },
      { name: 'twitter:description', content: post.seoDescription || post.excerpt },
      { name: 'twitter:image', content: `https://kitlayer.com${post.coverImage}` },
      { name: 'article:published_time', content: post.date },
      { name: 'article:section', content: post.category },
    ],
    links: [
      { rel: 'canonical', href: url.href }
    ]
  };
};
