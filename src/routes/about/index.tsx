import { component$ } from "@builder.io/qwik";
import { AboutHero } from "~/components/about/hero/aboutHero";
import { FAQ } from "~/components/global/faq/faq";
import { Footer } from "~/components/global/footer/footer";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { ProductSection } from "~/components/product/section/productSection";

export default component$(() => {

    const faqs = [
    {
      question: 'Do I need design experience to create a logo?',
      answer: 'No. The logo maker is designed for beginners and guides you through each step, so you can create a professional logo without any design experience.',
    },
    {
      question: 'How long does it take to create a logo?',
      answer: 'Most users can create a logo in just a few minutes. You can take more time to explore different styles and make adjustments if needed.',
    },
    {
      question: 'Can I use my logo for commercial purposes?',
      answer: 'Yes. Logos created with the platform can be used for commercial purposes, including branding, marketing, and promotional materials. Once downloaded, all rights to the logo belong to you, and your design is removed from our system.',
    },
    {
      question: 'What file formats will my logo be provided in?',
      answer: 'Your logo will be delivered in PNG, SVG, and JPG formats, packaged in a ZIP file. Each download includes five different logo variations, making it easy to use your logo across different platforms and use cases.',
    },
    {
      question: 'Can I edit my logo after creating it?',
      answer: 'Yes. You can go back and update colors, typography, and layout at any time before downloading your final logo.',
    },
    {
      question: 'Is this logo maker suitable for small businesses and personal projects?',
      answer: 'Yes. The platform is designed for individuals, creators, and small businesses who want a simple and reliable way to create a professional logo.',
    }
  ];

  return (
    <>
      <HomeHeader />
      <AboutHero
      />
<ProductSection
        title="Our Journey: From a Simple Idea to a Global Brand Impact"
        description="What started as a simple idea has grown into a mission to help thousands of brands around the world create logos that truly stand out. Every challenge we faced and every milestone we reached has shaped the way we approach design, innovation, and user success."
        text="Through creativity, dedication, and a passion for excellence, we continue to evolve and expand our vision, ensuring that every brand we work with can express itself fully and memorably."
        imageSrc="/images/about/section/about-our-journey.jpg"
        imageAlt="Our Journey"
      />

      <ProductSection
        reverse
        title="Meet the Team: Passionate Creators Behind Every Logo"
        description="Our team is made up of passionate designers, developers, and creative thinkers who bring their expertise, care, and innovation to every logo we create. Each member plays a vital role in transforming ideas into visually stunning and impactful designs."
        text="Together, we cultivate a culture of collaboration, creativity, and excellence, ensuring that every brand we touch can shine and leave a lasting impression on the world."
        imageSrc="/images/about/section/about-our-team.jpg"
        imageAlt="Our Team"
      />
     <FAQ
           faqs={faqs}
         />

          <Footer />
    </>
  );
});
