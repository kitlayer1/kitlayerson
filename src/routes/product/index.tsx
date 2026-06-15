import { component$ } from "@builder.io/qwik";
import Faq from "~/components/global/faq/faq";
import { Footer } from "~/components/global/footer/footer";
import { GlobalSelect } from "~/components/global/globalSelect/globalSelect";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { FeaturesCard } from "~/components/product/featuresCard/FeaturesCard";
import { GlobalFuture } from "~/components/global/globalFuture/globalFuture";
import { GlobalHero } from "~/components/global/globalHero/globalHero";
import { ProductSection } from "~/components/product/productSection/productSection";

export default component$(() => {
  return (
    <>
      <HomeHeader />
      <GlobalHero
        badgeText="Product"
        title="Create a Logo That Defines Your Brand"
        description="Discover logo styles tailored to your industry and create a unique identity for your brand with fully customizable designs that help you stand out instantly."
        buttonText="Get Started"
        bottomText="Trusted by thousands of users creating standout brand identities."
        image="/images/product/hero/productHero.svg"
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

      <GlobalFuture
        title="CREATE PROFESSIONAL LOGOS FOR EVERY INDUSTRY AND BUSINESS"
        description={[
          "Explore a wide range of categories and create a logo that matches your business. From modern and minimal to bold and creative styles, discover designs tailored to every industry and bring your vision to life easily.",
          "Whether you're starting a new brand or refreshing an existing one, you can design a unique and professional logo. Choose your category, customize the details, and build a strong visual identity that stands out."
        ]}
        image="/images/product/future/productFuture1.svg"
      />
      <GlobalFuture
        title="DOWNLOAD YOUR LOGO IN MULTIPLE HIGH-QUALITY FORMATS"
        description={[
          "Create your logo and instantly download it in PNG, JPG, SVG, PDF, ZIP, and transparent formats, giving you full flexibility to use your design across any platform or branding purpose.",
          "Whether for digital or print use, every file is optimized to keep your logo sharp, scalable, and professional. Use it on websites, social media, packaging, presentations, and brand materials without losing quality or consistency, and adapt it easily to any need."
        ]}
        image="/images/product/future/productFuture2.svg"
        reverse={true}
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
      <FeaturesCard />
      <ProductSection />
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