import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import "./brandCard.css";

interface Category {
  id: number;
  title: string;
  image: string;
  href: string;
}

export const CategoryBrandCard = component$(() => {
  const categories: Category[] = [
    { id: 1, title: "Food", image: "/images/home/section/category/food.svg", href: "/create/food-logo-maker" },
    { id: 2, title: "Technology", image: "/images/home/section/category/technology.svg", href: "/create/technology-logo-maker" },
    { id: 3, title: "Travel", image: "/images/home/section/category/travel.svg", href: "/create/travel-logo-maker" },
    { id: 4, title: "Gaming", image: "/images/home/section/category/gaming.svg", href: "/create/gaming-logo-maker" },
    { id: 5, title: "Real Estate", image: "/images/home/section/category/real-estate.svg", href: "/create/real-estate-logo-maker" },
    { id: 6, title: "Beauty", image: "/images/home/section/category/beauty.svg", href: "/create/beauty-logo-maker" },
    { id: 7, title: "Fashion", image: "/images/home/section/category/fashion.svg", href: "/create/fashion-logo-maker" },
    { id: 8, title: "Sports", image: "/images/home/section/category/sports.svg", href: "/create/sports-logo-maker" },
    { id: 9, title: "Education", image: "/images/home/section/category/education.svg", href: "/create/education-logo-maker" },
    { id: 10, title: "Commerce", image: "/images/home/section/category/commerce.svg", href: "/create/commerce-logo-maker" },
  ];

  return (
    <section class="category-section">
      <div class="category-grid">
        {categories.map((item) => (
          <Link key={item.id} href={item.href} class="category-card">
            <span class="category-name">{item.title}</span>

            <div class="category-image">
              <img src={item.image} alt={item.title} width="160" height="160" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
});
