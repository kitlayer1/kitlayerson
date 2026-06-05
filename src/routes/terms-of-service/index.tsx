import { component$, useStyles$ } from "@builder.io/qwik";
import { Footer } from "~/components/global/footer/footer";
import { HomeHeader } from "~/components/global/header/homeHeader";
import styles from "../policy.css?inline";
import "~/styles/tokens/spacing.css";
import "~/styles/tokens/colors.css";
import "~/styles/tokens/typography.css";
import "~/styles/tokens/radius.css"

export default component$(() => {
  useStyles$(styles);

  return (
    <>
      <HomeHeader variant="cream" />
      <div class="policy-container">
        <h1 class="policy-title">TERMS OF SERVICE</h1>

        <div class="policy-meta">
          <span class="policy-meta-label">Last updated</span>
          <span class="policy-meta-date">March 2026</span>
        </div>

        <div class="policy-content">
          <h2 class="policy-section-title">1. ACCEPTANCE OF TERMS</h2>
          <p>
            By accessing, browsing, or using this website, application, or any related services (collectively referred to as the “Service”), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service (“Terms”).
          </p>
          <p>
            If you do not agree to these Terms, you must immediately stop using the Service.
          </p>
          <p>
            We reserve the right to update or modify these Terms at any time without prior notice. Continued use of the Service after changes constitutes acceptance of the revised Terms.
          </p>

          <h2 class="policy-section-title">2. DESCRIPTION OF SERVICE</h2>
          <p> The Service provides users with an online platform for creating, editing, customizing, and downloading logo designs and related brand assets.</p>

          <p> Depending on availability and subscription level, the Service may include:</p>
          <ul class="policy-list">
            <li>AI-assisted logo generation</li>
            <li>Template-based logo customization</li>
            <li>Typography and icon editing tools</li>
            <li>Export in multiple file formats (PNG, SVG, PDF, etc.)</li>
            <li>Brand kit generation and preview tools</li>
          </ul>

          <p> We do not guarantee that any generated logo will be unique, trademark-safe, or legally available for registration. Users are responsible for conducting their own trademark and legal checks before commercial use.</p>

          <h2 class="policy-section-title">3. ELIGIBILITY AND ACCOUNT REGISTRATION</h2>
          <p> To use certain features of the Service, you may be required to create an account.</p>

          <p> By registering, you agree that:</p>
          <ul class="policy-list">
            <li>All information provided is accurate, complete, and up to date</li>
            <li>You are responsible for maintaining the confidentiality of your login credentials</li>
            <li>You are fully responsible for all activities that occur under your account</li>
          </ul>
          <p> We reserve the right to suspend or terminate accounts that provide false information or violate these Terms.</p>


          <h2 class="policy-section-title">4. LICENSE AND INTELLECTUAL PROPERTY RIGHTS </h2>
          <p>All content available through the Service, including but not limited to software, UI design, templates, icons, fonts, and system-generated assets, is owned by or licensed to us.</p>
          <p>Upon generating or purchasing a logo, you are granted a license based on your plan:</p>
          <p>FREE USERS</p>
          <ul class="policy-list">
            <li>Limited, non-exclusive, non-commercial usage rights</li>
            <li>Logos may include restrictions or watermarks (if applicable)</li>
          </ul>
          <p>PAID USERS</p>
          <ul class="policy-list">
            <li>Commercial usage rights for generated logo outputs</li>
            <li>Ability to use logos for branding, marketing, and business purposes</li>
          </ul>
          <p>However:</p>
          <ul class="policy-list">
            <li>You do not own the underlying templates, design system, or platform assets</li>
            <li>You may not resell, redistribute, or repackage our design system or templates</li>
            <li>Trademark registration responsibility belongs entirely to the user</li>
          </ul>

          <h2 class="policy-section-title">5. USER CONTENT</h2>
          <p>You may upload text, images, or other content (“User Content”) while using the Service.</p>
          <p>By uploading or generating content, you grant us a worldwide, non-exclusive, royalty-free license to use, process, store, and display such content solely for:</p>
          <ul class="policy-list">
            <li>Providing and improving the Service</li>
            <li>Generating design outputs</li>
            <li>Ensuring platform functionality</li>
          </ul>
          <p>You represent and warrant that:</p>
          <ul class="policy-list">
            <li>You own or have the necessary rights to your content</li>
            <li>Your content does not infringe any third-party rights</li>
            <li>Your content does not violate any applicable laws</li>
          </ul>


          <h2 class="policy-section-title">6. PROHIBITED ACTIVITIES</h2>
          <p>You agree not to use the Service for any of the following:</p>
          <ul class="policy-list">
            <li>Illegal or unauthorized purposes</li>
            <li>Attempting to copy, reverse engineer, or extract source code</li>
            <li>Selling or redistributing platform templates or system assets</li>
            <li>Uploading malicious code, viruses, or harmful data</li>
            <li>Abusing system resources or automated scraping</li>
            <li>Generating offensive, hateful, or unlawful content</li>
            <li>Attempting to bypass subscription or payment systems</li>
          </ul>

          <p>Violation of these rules may result in immediate suspension or permanent account termination.</p>

          <h2 class="policy-section-title">7. PAYMENTS, SUBSCRIPTIONS, AND BILLING</h2>
          <p>Certain features of the Service require payment.</p>
          <p>By subscribing, you agree that:</p>
          <ul class="policy-list">
            <li>Fees will be charged according to the selected plan</li>
            <li>Subscriptions may renew automatically unless canceled</li>
            <li>All payments are processed through third-party payment providers</li>
            <li>We are not responsible for payment processor errors or delays</li>
          </ul>
          <p>REFUNDS</p>
          <p>Unless required by law, all payments are non-refundable. Refund requests are evaluated on a case-by-case basis.</p>
          <p>We reserve the right to change pricing or subscription plans at any time.</p>

          <h2 class="policy-section-title">8. SERVICE AVAILABILITY</h2>
          <p>We strive to keep the Service available at all times, but we do not guarantee uninterrupted access.</p>
          <p>The Service may be temporarily unavailable due to:</p>
          <ul class="policy-list">
            <li>Maintenance or updates</li>
            <li>Technical issues</li>
            <li>Server downtime</li>
            <li>External service failures</li>
          </ul>

          <p>We are not liable for any loss or damage resulting from service interruptions.</p>

          <h2 class="policy-section-title">9. DISCLAIMER OF WARRANTIES</h2>
          <p>The Service is provided on an “AS IS” and “AS AVAILABLE” basis.</p>
          <p>We do not guarantee that:</p>
          <ul class="policy-list">
            <li>The Service will be error-free or uninterrupted</li>
            <li>Generated logos will be unique or legally protected</li>
            <li>The Service will meet your specific expectations</li>
          </ul>
          <p>You use the Service at your own risk.</p>

          <h2 class="policy-section-title">10. LIMITATION OF LIABILITY</h2>
          <p>To the maximum extent permitted by law, we are not liable for any:</p>
          <ul class="policy-list">
            <li>Indirect, incidental, or consequential damages</li>
            <li>Loss of profits, revenue, or business opportunities</li>
            <li>Data loss or corruption</li>
            <li>Legal disputes arising from logo usage</li>
          </ul>

          <p>Your sole remedy for dissatisfaction is to stop using the Service.</p>



          <h2 class="policy-section-title">11. TERMINATION</h2>
          <p>We reserve the right to suspend or terminate your access to the Service at any time, without notice, if:</p>
          <ul class="policy-list">
            <li>You violate these Terms</li>
            <li>You engage in fraudulent or abusive behavior</li>
            <li>Required by law or regulatory authority</li>
          </ul>
          <p>Upon termination, your right to use the Service will immediately cease.</p>


          <h2 class="policy-section-title">12. CHANGES TO TERMS</h2>
          <p>We may update these Terms at any time.</p>
          <p>When changes are made:</p>
          <ul class="policy-list">
            <li>The updated version will be posted on this page</li>
            <li>The “Last Updated” date will be revised</li>
          </ul>

          <p>Continued use of the Service after changes means you accept the updated Terms.</p>



          <h2 class="policy-section-title">13. THIRD-PARTY SERVICES</h2>

          <p>The Service may integrate third-party services such as:</p>
          <ul class="policy-list">
            <li>Payment processors</li>
            <li>Analytics tools</li>
            <li>Font or asset providers</li>
          </ul>
          <p>We are not responsible for the content, policies, or actions of third-party services.</p>


          <h2 class="policy-section-title">14. GOVERNING LAW</h2>
          <p>These Terms shall be governed and interpreted in accordance with applicable laws of your jurisdiction, unless otherwise required.</p>

          <h2 class="policy-section-title">15. CONTACT INFORMATION</h2>
          <p>
            If you have any questions about these Terms, you can contact us at <a href="mailto:help@kitlayer.com">help@kitlayer.com</a>
          </p>

        </div>
      </div>
      <Footer />
    </>
  );
});
