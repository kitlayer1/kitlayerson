import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { BlogCard } from "~/components/blog/blogCard/blogCard";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { BlogHero } from "~/components/blog/blogHero/blogHero";
import blogData from "../../../public/data/blogDetail.json";
import { Footer } from "~/components/global/footer/footer";

export const useBlogData = routeLoader$(async () => {
  return blogData;
});

export default component$(() => {
  const blogData = useBlogData();
  const featuredPost = blogData.value?.[0];
  const remainingPosts = blogData.value?.slice(1);

  return (
    <>
      <HomeHeader />

      {featuredPost && (
        <BlogHero
          featuredPost={{
            slug: featuredPost.slug,
            title: featuredPost.title,
            description: featuredPost.excerpt,
            coverImage: featuredPost.coverImage,
          }}
        />
      )}

      <div class="blog-wrapper">
        <div class="blog-grid">
          {remainingPosts?.map((post: any) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.displayDate}
              category={post.category}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
});