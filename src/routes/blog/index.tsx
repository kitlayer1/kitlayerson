import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { BlogCard } from "~/components/blog/blogCard/blogCard";
import { HomeHeader } from "~/components/global/header/homeHeader";

export const useBlogData = routeLoader$(async (event) => {
  const res = await fetch(new URL("/data/blogDetail.json", event.url));
  const data = await res.json();
  return data;
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