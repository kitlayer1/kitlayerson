import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { BlogCard } from "~/components/blog/blogCard/blogCard";
import { HomeHeader } from "~/components/global/header/homeHeader";

export const useBlogData = routeLoader$(async () => {
  const res = await fetch(`${process.env.BASE_URL || ''}/data/blogDetail.json`);
  if (!res.ok) throw new Error('JSON yüklenemedi');
  return await res.json();
});

export default component$(() => {
  const blogData = useBlogData();

  return (
    <>
      <HomeHeader />

      <div class="blog-wrapper">
        <div class="blog-grid">
          {blogData.value?.map((post: any) => (
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
    </>
  );
});