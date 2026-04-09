import { component$ } from "@builder.io/qwik";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { HomeHero } from "~/components/home/hero/homeHero";
import { Footer } from "~/components/global/footer/footer";
import { HomeBanner } from "~/components/home/banner/homeBanner";
import Faq from "~/components/global/faq/faq";
import Comment from "~/components/global/comment/comment";
import { HomeSectionPanel } from "~/components/home/section/homeSectionPanel";
import { CategoryBrandCard } from "~/components/home/card/brandCard";
import { ProductCardSection } from "~/components/product/productCardSection/ProductCardSection";
import { Testimonial } from "~/components/home/testimonial/testimonial";


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
     <HomeHeader/>
      <HomeHero
        title="Create a Striking Logo for Your Brand"
        description="Create a Professional Logo for Your Brand and Get It for Free in Just a Few Clicks"
        subText="No credit card required • No design experience needed"
        placeholder="Brand Name"
        buttonText="Generate"
        badgeText="Trusted by 100,000+ Users"
      />
       <CategoryBrandCard/>
      <div class="homeSectionPanel-wrapper">
        <HomeSectionPanel
        title="Customize Your Logo Your Way"
        description="Fine-tune your logo with intuitive tools that let you change colors, typography, and layout in seconds. Every update is fast, smooth, and easy to apply."
        text="Whether you want small tweaks or a complete redesign, you have the freedom to shape your logo exactly how you imagine it."
        imageSrc="/images/home/resim1.svg"
        imageAlt="Restaurant management system dashboard preview"
      />

      <HomeSectionPanel
        reverse
        title="Download Your Logo in Any Format."
        description="Download your logo in multiple high-quality formats like SVG, PNG, and JPG, ready for both digital and print use. Every file is optimized to stay sharp, clear, and professional across all platforms."
        text="Enjoy full flexibility with scalable vectors, high resolution, and transparent backgrounds, giving you everything you need to use your logo anywhere without extra effort."
        imageSrc="/images/home/resim1.svg"
        imageAlt="Restaurant management system features preview"
      />
      </div>
        <ProductCardSection />

        <Testimonial />
        <Comment comments={comments} />
              <Faq />
               <HomeBanner />
      <Footer />
    </>
  );
});
