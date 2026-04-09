import { component$ } from "@builder.io/qwik";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { ProductHero } from "~/components/product/hero/productHero";
import { Footer } from "~/components/global/footer/footer";
import { FeaturesCard } from "~/components/product/featuresCard/FeaturesCard";
import { ProductCardSection } from "~/components/product/productCardSection/ProductCardSection";
import { ProductHeroCard } from "~/components/product/productHeroCard/ProductHeroCard";
import { ProductTestimonial } from "~/components/product/productTestimonial/ProductTestimonial";
import { ProductBrandPreview } from "~/components/product/productBrandPreview/ProductBrandPreview";
import Comment from "~/components/global/comment/comment";
import FAQ from "~/components/global/faq/faq";
import { HomeBanner } from "~/components/home/banner/homeBanner";


const comments = [
  {
    text: `I don’t have any design background, but I was able to create a clean and professional-looking logo by following the steps. Everything felt clear and easy to use.`,
    name: "Elissa Piraver",
    title: "Small Business Owner",
    image: "/images/global/comment/user/woman1.svg",
    bg: "#F4EFD3",
    color: "#020618",
  },
  {
    text: `"Seeing my logo update in real time while adjusting colors and typography made the whole process much more intuitive than I expected."`,
    name: "Cristian Makalulu",
    title: "Content Creator",
    image: "/images/global/comment/user/man1.svg",
    bg: "#F4EFD3",
    color: "#020618",
  },
  {
    text: `I explored several styles and variations before choosing the final one, which really helped me understand what works best for my brand."`,
    name: "Albert Mitrovic",
    title: "Startup Founder",
    image: "/images/global/comment/user/man2.svg",
    bg: "#F4EFD3",
    color: "#020618",
  },
  {
    text: `"As someone who just wanted a solid logo without learning complex design tools, this platform was exactly what I needed."`,
    name: "Guillermo Rauch",
    title: "Freelance Consultant",
    image: "/images/global/comment/user/man3.svg",
    bg: "#F4EFD3",
    color: "#020618",
  },
  {
    text: `"The step-by-step flow made it easy to experiment, make changes, and improve the design without feeling overwhelmed."`,
    name: "Peter Rashford",
    title: "E-commerce Store Owner",
    image: "/images/global/comment/user/man4.svg",
    bg: "#F4EFD3",
    color: "#020618",
  },
  {
    text: `"I created a logo in a short time, and it looks good enough to use across my website and social media."`,
    name: "Sabriana Convelti",
    title: "Marketing Specialist",
    image: "/images/global/comment/user/woman2.svg",
    bg: "#F4EFD3",
    color: "#020618",
  },
];



export default component$(() => {
  return (
    <>
      <HomeHeader />
      <ProductHero
        title="Create Your Perfect Logo Instantly"
        description="Explore unique logo designs, customize every detail, and see how it fits your brand. Real-time previews, easy editing, and ready-to-use files make creating your logo effortless"
      />
      <ProductHeroCard />
      <ProductTestimonial />
      <ProductCardSection />
      <FeaturesCard />
      <ProductBrandPreview />
      <Comment comments={comments} />
      <FAQ />
       <HomeBanner />
      <Footer />
    </>
  );
});
