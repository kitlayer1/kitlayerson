import { component$, useStyles$ } from "@builder.io/qwik";
import { Footer } from "~/components/global/footer/footer";
import { HomeHeader } from "~/components/global/header/homeHeader";
import styles from "./index.css?inline";

export default component$(() => {
    useStyles$(styles);

    return (
        <>
            <HomeHeader />
            <div class="policy-container">
                <h1 class="policy-title">Privacy Policy</h1>

                <div class="policy-meta">
                    <span class="policy-meta-label">Last updated</span>
                    <span class="policy-meta-date">March 2026</span>
                </div>

                <div class="policy-content">
                    <h2 class="policy-section-title">1. Introduction</h2>
                    <p>
                        This Privacy Policy (“Policy”) governs how Kitlayer (“Platform”, “Site”, “we”) collects, processes, stores, and protects personal data and other information of users (“User”, “you”) who access and use our logo creation and digital design services.
                    </p>
                      <p>
                        By accessing the Platform, creating an account, or using any part of our services, you acknowledge that you have read, understood, and agreed to the terms outlined in this Policy. If you do not agree, you must discontinue use of the Site.
                    </p>

                    <h2 class="policy-section-title">2. Data We Collect</h2>
                    <p>
                        We may collect various types of data to provide and improve our services:
                    </p>
                    <ul class="policy-list">
                        <li>Name and surname (if provided)</li>
                        <li>Email address</li>
                        <li>Brand name, slogans, and descriptions</li>
                        <li>All inputs, preferences, and user-generated data during logo creation</li>
                         <li>IP address</li>
                        <li>Browser type and version</li>
                        <li>Device information (operating system, screen resolution, etc.)</li>
                        <li>Pages visited and navigation behavior</li>
                        <li>Session duration and user interaction data</li>
                        <li>Cookies (session cookies, analytics cookies, etc.)</li>
                        <li>Performance and usage data</li>
                    </ul>

                    <h2 class="policy-section-title">3. Purpose of Data Processing</h2>
                   <p>
                       Collected data is processed for the following purposes:
                    </p>
                    <ul class="policy-list">
                        <li>Providing logo generation services</li>
                        <li>Producing personalized outputs</li>
                        <li>Improving platform performance</li>
                        <li>Detecting and resolving technical issues</li>
                        <li>Enhancing user experience</li>
                        <li>Preventing fraud and misuse</li>
                        <li>Complying with legal obligations</li>
                    </ul>

                    <h2 class="policy-section-title">4. Data Storage and Protection</h2>
                    <p>
                   User data is stored only as long as necessary and in compliance with applicable laws. We implement appropriate technical and organizational measures to protect data from unauthorized access, loss, misuse, or disclosure.
                    </p>
                    <p>
                   However, no system can be guaranteed to be 100% secure due to the nature of internet transmissions.
                    </p>

                      <h2 class="policy-section-title">5. Third-Party Services</h2>
                      <p>
                      We may use third-party services for:
                    </p>
                    <ul class="policy-list">
                        <li>Analytics (traffic analysis)</li>
                        <li>Cloud storage</li>
                        <li>Payment processing</li>
                        <li>Performance monitoring</li>
                    </ul>
                     <p>
                      These providers operate under their own privacy policies, and we do not control their practices.
                    </p>

                      <h2 class="policy-section-title">6. User Rights</h2>
                      <p>
                      Users may have the following rights under applicable data protection laws:
                    </p>
                    <ul class="policy-list">
                        <li>Request access to their data</li>
                        <li>Request correction of inaccurate data</li>
                        <li>Request deletion of data</li>
                        <li>Object to data processing</li>
                    </ul>
                       <h2 class="policy-section-title">7. Disclaimer</h2>
                     <p>
                       All logos, designs, and content generated through the Platform are based entirely on:
                    </p>
                    <ul class="policy-list">
                        <li>User-provided inputs</li>
                        <li>Automated algorithms and AI systems</li>
                    </ul>

                      <p>
                       Accordingly, the Platform:
                    </p>
                    <ul class="policy-list">
                        <li>Does NOT guarantee that generated logos are unique or free from copyright or trademark infringement</li>
                        <li>Does NOT guarantee that generated content will not resemble existing designs or brands</li>
                        <li>Does NOT guarantee suitability for commercial use</li>
                        <li>Accepts NO LIABILITY for any intellectual property violations caused by user-generated content</li>
                    </ul>

                       <p>
                       Furthermore:
                    </p>
                    <ul class="policy-list">
                        <li>Users are solely responsible for conducting legal checks before using any generated logo</li>
                        <li>The Platform shall NOT be held liable for any direct, indirect, incidental, or consequential damages</li>
                        <li>This includes (but is not limited to): financial loss, brand damage, legal disputes, or reputational harm</li>
                    </ul>
                   

                     <h2 class="policy-section-title">8. “As-Is” Service Clause</h2>
                    <p>
                      All services are provided on an “as-is” and “as-available” basis. We do not guarantee that the service will be.
                    </p>
                      <ul class="policy-list">
                        <li>Uninterrupted</li>
                        <li>Error-free</li>
                        <li>Suitable for specific expectations</li>
                    </ul>
                     <h2 class="policy-section-title">9. Policy Updates</h2>
                    <p>
                     This Policy may be updated without prior notice. The updated version becomes effective as soon as it is published on the Site. Therefore, it is the user’s responsibility to review this Policy periodically for any changes.
                    </p>
                     <h2 class="policy-section-title">10. Contact</h2>
                    <p>
                     For any questions regarding this Policy, you may contact us via <a href="mailto:help@kitlayer.com">help@kitlayer.com</a>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
});
