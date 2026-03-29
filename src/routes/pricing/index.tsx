import { component$ } from "@builder.io/qwik";
import { FAQ } from "~/components/global/faq/faq";
import { Footer } from "~/components/global/footer/footer";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { Pricing } from "~/components/pricing/cardModal/pricing";




export default component$(() => {

  const faqs = [
  {
    question: "Do I need design experience to create a logo?",
    answer:
      "No. The logo maker is designed for beginners and guides you through each step, so you can create a professional logo without any design experience.",
  },
  {
    question: "How long does it take to create a logo?",
    answer:
      "Most users can create a logo in just a few minutes. You can take more time to explore different styles and make adjustments if needed.",
  },
  {
    question: "Can I use my logo for commercial purposes?",
    answer:
      "Yes. Logos created with the platform can be used for commercial purposes, including branding, marketing, and promotional materials. Once downloaded, all rights to the logo belong to you, and your design is removed from our system.",
  },
  {
    question: "What file formats will my logo be provided in?",
    answer:
      "Your logo will be delivered in PNG, SVG, and JPG formats, packaged in a ZIP file. Each download includes five different logo variations, making it easy to use your logo across different platforms and use cases.",
  },
  {
    question: "Can I edit my logo after creating it?",
    answer:
      "Yes. You can go back and update colors, typography, and layout at any time before downloading your final logo.",
  },
  {
    question:
      "Is this logo maker suitable for small businesses and personal projects?",
    answer:
      "Yes. The platform is designed for individuals, creators, and small businesses who want a simple and reliable way to create a professional logo.",
  },
];

  return (
    <>
      <HomeHeader />
      <Pricing />
      <FAQ faqs={faqs} />
      <Footer />
    </>
  );
});
