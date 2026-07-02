import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation, Link } from "@builder.io/qwik-city";
import { BlogCard } from "~/components/blog/blogCard/blogCard";
import { BlogHero } from "~/components/blog/blogHero/blogHero";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { Footer } from "~/components/global/footer/footer";
import blogData from "../../../src/data/blogDetail.json";

export const useBlogData = routeLoader$(async () => {
  return blogData;
});

export default component$(() => {
  const loc = useLocation();
  const blogData = useBlogData();
  
  // Sort posts by id descending
  const allData = [...(blogData.value || [])].sort((a: any, b: any) => (b.id || 0) - (a.id || 0));
  const heroPosts = allData.slice(0, 2);
  const remainingPosts = allData.slice(2);

  // Pagination logic for the rest of the posts
  const itemsPerPage = 12;
  const currentPage = Number(loc.url.searchParams.get("page") || "1");
  
  const totalItems = remainingPosts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const gridPosts = remainingPosts.slice(startIndex, endIndex);

  return (
    <>
      <HomeHeader variant="light" />
      {heroPosts && heroPosts.length > 0 && (
        <BlogHero posts={heroPosts} />
      )}
      
      <div class={["blog-wrapper", "has-hero"]}>
        <div class="blog-container">
          <h2 class="blog-section-title">ARTICLES</h2>
          <div class="blog-grid">

          {gridPosts?.map((post: any, index: number) => (
            <BlogCard
              key={`${post.slug}-${index}`}
              slug={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.displayDate}
              category={post.category}
            />
          ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div class="blog-pagination-container">
            <div class="blog-pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={`/blog?page=${page}`}
                  class={["pagination-item", currentPage === page ? "active" : ""]}
                >
                  {page}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
});