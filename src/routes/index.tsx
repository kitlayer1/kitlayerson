import { component$ } from "@builder.io/qwik";
import Comment from "~/components/global/comment/comment";
import Faq from "~/components/global/faq/faq";
import { Footer } from "~/components/global/footer/footer";
import GlobalSection from "~/components/global/globalSection/globalSection";
import { GlobalSelect } from "~/components/global/globalSelect/globalSelect";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { CategoryBrandCard } from "~/components/home/card/brandCard";
import { HomeHero } from "~/components/home/hero/homeHero";
import { HomeCardSection } from "~/components/home/homeCardSection/homeCardSection";
import { HomeLogoTypeCard } from "~/components/home/homeLogoTypeCard/homeLogoTypeCard";
import { HomeLogoBrand } from "~/components/home/logoBrand/homeLogoBrand";
import { HomeSection } from "~/components/home/section/homeSection";


const comments = [
  {
    text: `I don’t have any design background, but I was able to create a clean and professional-looking logo by following the steps. Everything felt clear and easy to use.`,
    name: "Elissa Piraver",
    title: "Small Business Owner",
    image: "/images/global/comment/user/woman1.svg",
    color: "var(--color-heading-1)",
  },
  {
    text: `"Seeing my logo update in real time while adjusting colors and typography made the whole process much more intuitive than I expected."`,
    name: "Cristian Makalulu",
    title: "Content Creator",
    image: "/images/global/comment/user/man1.svg",
    color: "var(--color-heading-1)",
  },
  {
    text: `I explored several styles and variations before choosing the final one, which really helped me understand what works best for my brand."`,
    name: "Albert Mitrovic",
    title: "Startup Founder",
    image: "/images/global/comment/user/man2.svg",
    color: "var(--color-heading-1)",
  },
  {
    text: `"As someone who just wanted a solid logo without learning complex design tools, this platform was exactly what I needed."`,
    name: "Guillermo Rauch",
    title: "Freelance Consultant",
    image: "/images/global/comment/user/man3.svg",
    color: "var(--color-heading-1)",
  },
  {
    text: `"The step-by-step flow made it easy to experiment, make changes, and improve the design without feeling overwhelmed."`,
    name: "Peter Rashford",
    title: "E-commerce Store Owner",
    image: "/images/global/comment/user/man4.svg",
    color: "var(--color-heading-1)",
  },
  {
    text: `"I created a logo in a short time, and it looks good enough to use across my website and social media."`,
    name: "Sabriana Convelti",
    title: "Marketing Specialist",
    image: "/images/global/comment/user/woman2.svg",
    color: "var(--color-heading-1)",
  },
];



export default component$(() => {
  return (
    <>
     <HomeHeader />
     <HomeHero
        title="YOUR BRAND DESERVES A LOGO AS UNIQUE AS YOUR STORY"
        description="Give your brand a voice. Create the logo that tells your story to the world starting today."
        subText="No credit card required • No design experience needed"
        placeholder="Brand Name"
        buttonText="Generate"
        badgeText="Trusted by 100,000+ Users"
      />

      <GlobalSelect
        features={[
          "NO DESIGN SKILLS NEEDED",
          "READY IN 60 SECONDS",
          "PROFESSIONAL QUALITY",
          "DOWNLOAD & USE ANYWHERE",
          "NO CREDIT CARD REQUIRED",
          "FULLY CUSTOMIZABLE",
          "FULLY CUSTOMIZABLE",
        ]}
        backgroundColor="var(--color-secondary-200)"
        textColor="var(--color-primary-900)"
      />
      <HomeSection />

       <CategoryBrandCard />
       <HomeLogoBrand />
       <GlobalSection
        title="TURN YOUR VISION INTO A BRAND WORTH REMEMBERING"
        description={[
          "Transform your brand into a professional and memorable identity that stands out in every market. Build a strong presence that captures attention, creates trust, and leaves a lasting impression.",
          "Strengthen your brand with a clear and consistent identity that people instantly recognize. By combining visual impact with a strong message, you can connect with your audience, stand out from competitors, and grow with confidence over time."
        ]}
        buttonText="Get Started"
        buttonLink="/app"
        image="/images/home/homeContainer/homeContainer.svg"
      />
       <GlobalSelect 
        features={[
          "100K+ BUSINESSES TRUST",
          "80K+ STARTUPS LAUNCHED",
          "500K+ LOGOS CREATED",
          "198+ COUNTRIES REACHED",
          "24/7 SUPPORT AVAILABLE",
          "200+ LOGO CATEGORIES",
          "ZERO DESIGN EXPERIENCE NEEDED",
        ]}
        backgroundColor="var(--color-green-BG)"
        textColor="var(--color-secondary-200)"
      />
       <GlobalSelect 
        features={[
          "100% FREE TO START",
          "FULLY CUSTOMIZABLE",
          "NO DESIGN SKILLS NEEDED",
          "10+ LOGO FORMATS",
          "8+ UNIQUE STYLES",
          "INSTANT DOWNLOAD",
          "HIGH-RES FILES INCLUDED",
          "UNLIMITED REVISIONSD",
        ]}
        backgroundColor="var(--color-secondary-200)"
        textColor="var(--color-primary-900)"
      />
      <HomeCardSection />
      <HomeLogoTypeCard />
       <Comment
        comments={comments} 
        description="Read real feedback from users who created and customized their logos with ease, speed, and full creative control using our platform."
       />
       <Faq />
        <GlobalSelect 
        features={[
          "100% FREE TO START",
          "FULLY CUSTOMIZABLE",
          "NO DESIGN SKILLS NEEDED",
          "10+ LOGO FORMATS",
          "8+ UNIQUE STYLES",
          "INSTANT DOWNLOAD",
          "HIGH-RES FILES INCLUDED",
          "UNLIMITED REVISIONSD",
        ]}
        backgroundColor="var(--color-secondary-200)"
        textColor="var(--color-primary-900)"
      />

      <Footer />
    </>
  );
});
