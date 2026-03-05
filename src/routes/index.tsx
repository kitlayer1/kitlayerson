import { component$ } from "@builder.io/qwik";
import { CategoryBrandCard } from "~/components/home/card/brandCard";
import { HomeHero } from "~/components/home/hero/homeHero";
import { HomeSection } from "~/components/home/section/homeSection";
import { HomeBrandSlider } from "~/components/home/slider/homeBrandSlider";
import { HomeTestimonial } from "~/components/home/testimonial/testimonial";





export default component$(() => {
  return (
    <>
       <HomeHero
        title="Design a Professional Logo for Your Brand"
        description="Build a logo that makes your brand stand out. Fully customizable, high-quality, and ready for web, social media, and print."
        subText="No credit card required • No design experience needed"
        placeholder="Brand Name"
        buttonText="Generate"
        image="/images/home/hero/homeHero.svg" // kendi görselinin URL'si
        badgeText="Chosen by 40,000+ Growing Brands"
      />
       <CategoryBrandCard />

       <HomeSection />

        <HomeTestimonial />
       <HomeBrandSlider
  title="Professionally Crafted Logo Examples"
  brands={[
    { image: "/images/home/slider/brand/brandLogoGaming.svg" },
    { image: "/images/home/slider/brand/brandLogoEstate.svg" },
    { image: "/images/home/slider/brand/brandLogoFood.svg" },
    { image: "/images/home/slider/brand/brandLogoSports.svg" },
    { image: "/images/home/slider/brand/brandLogoRealEstate.svg" },
    { image: "/images/home/slider/brand/brandLogoTravel.svg" },
    { image: "/images/home/slider/brand/brandLogoBeauty.svg" }
  ]}
/>
    </>
  );
});
