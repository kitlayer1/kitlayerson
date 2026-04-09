import { component$ } from "@builder.io/qwik";
import { FaqHero } from "~/components/faq/faqHero/faqHero";
import { FaqList } from "~/components/faq/faqList/faqList";
import { Footer } from "~/components/global/footer/footer";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { HomeBanner } from "~/components/home/banner/homeBanner";

export default component$(() => {
  return (
    <>
      <HomeHeader />
      <FaqHero />
      <FaqList />
      <HomeBanner />
      <Footer />
    </>
  );
});
