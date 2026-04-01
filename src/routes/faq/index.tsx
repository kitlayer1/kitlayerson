import { component$ } from "@builder.io/qwik";
import { FaqHero } from "../../components/faq/faqHero/faqHero";
import { FaqList } from "../../components/faq/faqList/faqList";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { Footer } from "~/components/global/footer/footer";

export default component$(() => {
  return (
    <>
      <HomeHeader />
      <FaqHero />
      <FaqList />
      <Footer />
    </>
  );
});
