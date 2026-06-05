import { component$ } from "@builder.io/qwik";
import { AboutSection } from "~/components/about/aboutSection/aboutSection";
import { ContactForm } from "~/components/contact/contactForm";
import { Footer } from "~/components/global/footer/footer";
import { GlobalSelect } from "~/components/global/globalSelect/globalSelect";
import { HomeHeader } from "~/components/global/header/homeHeader";


export default component$(() => {
    return (
        <>
            <HomeHeader variant="light" />
            <ContactForm />
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
            <AboutSection 
                cards={[
                    {
                        title: "FAQ'S",
                        description: "Find answers to common questions and learn how to get the most out of our logo design platform. Learn how to create and customize your logo and build a strong brand identity.",
                        buttonText: "Faq's",
                        link: "/faq"
                    },
                    {
                        title: "ABOUT",
                        description: "Learn more about our platform, our mission, and how we help you create unique and meaningful logos that define and strengthen your brand identity and help you stand out.",
                        buttonText: "About",
                        link: "/about"
                    },
                    {
                        title: "BLOG",
                        description: "Explore expert tips, creative ideas, and practical insights about logo design, branding, and visual identity to help you build a strong and memorable brand that stands out.",
                        buttonText: "Blog",
                        link: "/blog"
                    }
                ]}
            />
            <Footer />
        </>
    );
});