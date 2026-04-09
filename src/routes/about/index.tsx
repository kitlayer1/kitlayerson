import { component$ } from "@builder.io/qwik";
import { AboutHero } from "~/components/about/hero/aboutHero";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { Footer } from "~/components/global/footer/footer"
import { HomeBanner } from "~/components/home/banner/homeBanner";
import { AboutTestimonial } from "~/components/about/aboutTestimonial/aboutTestimonial";

export default component$(() => {
  return (
    <>
     <HomeHeader/>
     <AboutHero/>
     <AboutTestimonial />
     <HomeBanner />
     <Footer />
    </>
  );
});
