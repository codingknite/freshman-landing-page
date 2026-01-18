import React from 'react';
import { HeroHeader } from '@/components/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Freshman Privacy Policy',
  description:
    'Privacy Policy for Freshman, a study app by People Who Code LLC',
};

const PrivacyPolicy = () => {
  return (
    <>
      <HeroHeader />
      <div className='min-h-screen bg-background pt-24'>
        <div className='mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8'>
          <div className='prose prose-slate dark:prose-invert max-w-none'>
            <h1 className='mb-6 text-4xl font-bold text-foreground'>
              Privacy Policy
            </h1>
            <p className='mb-4 text-muted-foreground'>
              Effective as of: August 9, 2025
            </p>

            <p className='mb-6 text-foreground'>
              This Privacy Notice is designed to help you understand how People
              Who Code LLC d/b/a Freshman (&ldquo;Freshman&rdquo;, &ldquo;we&rdquo;, &ldquo;us,&rdquo; and &ldquo;our&rdquo;)
              collects, uses, and shares your personal information and to help
              you understand and exercise your privacy rights.
            </p>

            <p className='mb-6 text-foreground'>
              We are committed to protecting and respecting your privacy and
              will use your personal information in accordance with the General
              Data Protection Regulation (the &ldquo;GDPR&rdquo;), the California Consumer
              Privacy Act of 2018 (the &ldquo;CCPA&rdquo;), California Privacy Rights Act
              (the &ldquo;CPRA&rdquo;), and other applicable laws, regulations, and
              guidelines.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              1. Scope
            </h2>
            <p className='mb-6 text-foreground'>
              This Privacy Notice applies to personal information processed by
              us on the Freshman mobile app (&ldquo;App&rdquo;) and Freshman website
              (&ldquo;Site&rdquo;). To make this Privacy Notice easier to read, our mobile
              app and related offerings are collectively called &ldquo;Services.&rdquo;
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              2. Changes to our Privacy Notice
            </h2>
            <p className='mb-6 text-foreground'>
              We may revise this Privacy Notice from time to time in our sole
              discretion. If there are any material changes to this Privacy
              Notice, we will notify you as required by applicable law. You
              understand and agree that you will be deemed to have accepted the
              updated Privacy Notice if you continue to use our Services after
              the new Privacy Notice takes effect. We encourage you to regularly
              review this Privacy Notice to check for any changes.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              3. Personal Information We Collect
            </h2>
            <p className='mb-6 text-foreground'>
              The categories of personal information we collect depend on how
              you interact with us, our Services, and the requirements of
              applicable law. We collect information that you provide to us,
              information we obtain automatically when you use our Services, and
              information from other sources such as third-party services and
              organizations, as described below.
            </p>

            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              3.1 Information You Provide to Us Directly
            </h3>
            <p className='mb-6 text-foreground'>
              We may collect the following personal information that you provide
              to us:
            </p>
            <ul className='mb-6 list-disc pl-6 text-foreground'>
              <li>
                <strong>Account Creation:</strong> We may collect information
                when you create an account, such as your profile name, email
                address, and Google or Apple profile information.
              </li>
              <li>
                <strong>Messages and Media:</strong> We may collect messages
                (including voice notes), photos, and videos you share within
                chats or galleries.
              </li>

              <li>
                <strong>Interactive Features:</strong> We and others who use our
                Services may collect personal information that you submit or
                make available through our interactive features (e.g., messages
                or media you share in chats or galleries). Any information you
                provide on the public sections of these features will be
                considered &ldquo;public,&rdquo; unless otherwise required by applicable
                law, and is not subject to the privacy protections referenced
                herein.
              </li>
              <li>
                <strong>Purchases:</strong> We may collect personal information
                and details associated with your purchases, including payment
                information. Any payments made via our Services are processed by
                third-party payment processors. We do not directly collect or
                store any payment card information entered through our Services,
                but we may receive information associated with your payment card
                information (e.g., your billing details).
              </li>
              <li>
                <strong>Your Communications with Us:</strong> We may collect
                personal information, such as name, surname, email address, and
                other personal data you provide when you register on Freshman
                (including registration via Google OAuth), request information
                about our Services, subscribe to receive our newsletter or
                marketing, request customer or technical support, or otherwise
                communicate with us.
              </li>
              <li>
                <strong>Surveys:</strong> We may contact you to participate in
                surveys. If you decide to participate, you may be asked to
                provide certain information which may include personal
                information.
              </li>
            </ul>

            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              3.2 Information Collected Automatically
            </h3>
            <p className='mb-6 text-foreground'>
              We may collect personal information automatically when you use our
              Services:
            </p>
            <ul className='mb-6 list-disc pl-6 text-foreground'>
              <li>
                <strong>Automatic Data Collection:</strong> We may collect
                certain information automatically when you use our Services,
                such as your Internet protocol (IP) address, user settings,
                cookie identifiers, mobile carrier, mobile advertising and other
                unique identifiers, browser or device information, location
                information (including approximate location derived from IP
                address), and metadata about the content you provide (e.g.,
                location of where a photo or video was taken). We may also
                automatically collect information regarding your use of our
                Services, such as pages visited, links clicked, content
                interacted with, frequency and duration of activities, app usage
                history, and other information about how you use our Services.
              </li>
              <li>
                <strong>Analytics:</strong> We utilize third-party tools to
                analyze data that is automatically collected. Among our
                analytics partners is Amplitude. To gain a comprehensive
                understanding of how your data is managed, please refer to
                Amplitude&apos;s Privacy Notice. The analytics data we handle is
                general and anonymized, processed in a way that prevents any
                user from being re-identified.
              </li>
            </ul>

            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              3.3 Information Collected from Other Sources
            </h3>
            <p className='mb-6 text-foreground'>
              We may obtain information about you from other sources, including
              through third-party services and organizations. For example, if
              you access our Services through a third-party application, such as
              an app store, a third-party login service, or a social networking
              site, we may collect information about you from that third-party
              application that you have made available via your privacy
              settings.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              4. How We Use Your Information
            </h2>
            <p className='mb-6 text-foreground'>
              We use your information for a variety of business purposes,
              including to provide our Services, for administrative purposes,
              and to market our products and Services, as described below.
            </p>

            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              4.1 Provide Our Services
            </h3>
            <p className='mb-6 text-foreground'>
              We use your information to fulfill our contract with you and
              provide you with our Services, such as:
            </p>
            <ul className='mb-6 list-disc pl-6 text-foreground'>
              <li>
                Providing our study planning features, notes, tests, and
                personalized suggestions;
              </li>
              <li>Managing your information and account;</li>
              <li>
                Providing access to certain areas, functionalities, and features
                of our Services, such as study materials, notes, and tests;
              </li>
              <li>Answering requests for customer or technical support;</li>
              <li>
                Communicating with you about your account, activities on our
                Services, terms of use, privacy notice, and other policy
                changes;
              </li>
              <li>
                Processing your financial information and other payment methods
                for Services purchased.
              </li>
            </ul>

            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              4.2 Administrative Purposes
            </h3>
            <p className='mb-6 text-foreground'>
              We use your information for various administrative purposes, such
              as:
            </p>
            <ul className='mb-6 list-disc pl-6 text-foreground'>
              <li>
                Pursuing our legitimate interests such as direct marketing,
                research and development, network and information security, and
                fraud prevention;
              </li>
              <li>
                Detecting security incidents, data breaches, and leakages,
                protecting against malicious, deceptive, fraudulent, or illegal
                activity;
              </li>
              <li>Measuring interest and engagement in our Services;</li>
              <li>
                Improving, upgrading, or enhancing our Services (including
                safety checks and media optimization);
              </li>
              <li>Developing new products and Services;</li>
              <li>Ensuring internal quality control and safety;</li>
              <li>Authenticating and verifying individual identities;</li>
              <li>
                Debugging to identify and repair errors with our Services;
              </li>
              <li>
                Auditing relating to interactions, transactions, and other
                compliance activities;
              </li>
              <li>Enforcing our agreements and policies;</li>
              <li>Complying with our legal obligations.</li>
            </ul>

            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              4.3 Marketing and Advertising our Products and Services
            </h3>
            <p className='mb-6 text-foreground'>
              We may use personal information to tailor and provide you with
              content and advertisements. We may provide you with these
              materials as permitted by applicable law. Some of the ways we may
              market to you include email campaigns, custom audiences
              advertising, and &ldquo;interest-based&rdquo; or &ldquo;personalized advertising,&rdquo;
              including through cross-device tracking.
            </p>
            <p className='mb-6 text-foreground'>
              If you have any questions about our marketing practices or if you
              would like to opt out of the use of your personal information for
              marketing purposes, you may contact us at any time as set forth in
              Section 16 (&ldquo;Contact us&rdquo;) below with the subject line &ldquo;Do Not
              Share My Personal Information for Cross-Context Behavioral
              Advertising.&rdquo;
            </p>

            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              4.4 Other Purposes
            </h3>
            <p className='mb-6 text-foreground'>
              We also use your information for other purposes as requested by
              you or as permitted by applicable law:
            </p>
            <ul className='mb-6 list-disc pl-6 text-foreground'>
              <li>
                <strong>Consent:</strong> We may use personal information for
                other purposes that are clearly disclosed to you at the time you
                provide personal information or with your consent.
              </li>
              <li>
                <strong>De-identified and Aggregated Information:</strong> We
                may use personal information and other information about you to
                create de-identified and/or aggregated information, such as
                de-identified demographic information, de-identified location
                information, or other analyses we create.
              </li>
              <li>
                <strong>Share Content with Friends or Colleagues:</strong> Our
                Services may offer various tools and functionalities, such as
                sharing study materials or progress summaries with others.
              </li>
            </ul>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              5. How We Disclose Your Information
            </h2>
            <p className='mb-6 text-foreground'>
              We disclose your information to third parties for a variety of
              business and legal purposes, including to provide our Services, to
              protect us or others, or in the event of a major business
              transaction such as a merger, sale, or asset transfer, as
              described below.
            </p>

            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              5.1 Disclosures to Provide our Services
            </h3>
            <p className='mb-6 text-foreground'>
              The categories of third parties with whom we may share your
              information are described below:
            </p>
            <ul className='mb-6 list-disc pl-6 text-foreground'>
              <li>
                <strong>Other Third Parties:</strong> When you use the Services,
                you may choose to share personal information or content with
                other third parties via the functionalities of the App, such as
                study materials and notes.
              </li>
              <li>
                <strong>Service Providers:</strong> We may share your personal
                information with our third-party service providers who use that
                information to help us provide our Services, including IT
                support, hosting, payment processing, customer service, and
                related services.
              </li>
              <li>
                <strong>Database and Backend Services:</strong> We use Supabase
                for secure data storage, real-time synchronization, and backend
                services to power our study features, notes, and media features.
              </li>
              <li>
                <strong>Subscription Management:</strong> We use RevenueCat to
                manage in-app purchases, subscription billing, and payment
                processing across iOS and Android platforms.
              </li>
              <li>
                <strong>Authentication Services:</strong> We use Google OAuth
                and Apple Sign-In for secure account creation and
                authentication. Please review their respective privacy policies:{' '}
                <a
                  href='https://policies.google.com/privacy'
                  className='text-primary hover:underline'
                >
                  Google Privacy Policy
                </a>{' '}
                and{' '}
                <a
                  href='https://www.apple.com/privacy/'
                  className='text-primary hover:underline'
                >
                  Apple Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Business Partners:</strong> We may share your personal
                information with business partners to provide you with a product
                or service you have requested.
              </li>
              <li>
                <strong>Subsidiaries and Affiliates:</strong> We may share your
                personal information with members of our corporate family.
              </li>
              <li>
                <strong>Advertising Partners:</strong> We may share your
                personal information with third-party advertising partners for
                purposes of delivering personalized advertisements.
              </li>
              <li>
                <strong>APIs/SDKs:</strong> We may use third-party APIs and SDKs
                as part of the functionality of our Services.
              </li>
            </ul>

            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              5.2 Disclosures to Protect Us or Others
            </h3>
            <p className='mb-6 text-foreground'>
              We may access, preserve, and disclose any information we store
              associated with you to external parties if we, in good faith,
              believe doing so is required or appropriate to: comply with law
              enforcement or national security requests and legal process;
              protect your, our, or others&apos; rights, property, or safety; enforce
              our policies or contracts; collect amounts owed to us; or assist
              with an investigation or prosecution of suspected or actual
              illegal activity.
            </p>

            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              5.3 Disclosure in the Event of Merger, Sale, or Other Asset
              Transfers
            </h3>
            <p className='mb-6 text-foreground'>
              If we are involved in a merger, acquisition, financing due
              diligence, reorganization, bankruptcy, receivership, purchase or
              sale of assets, or transition of service to another provider, your
              information may be transferred as part of such a transaction, as
              permitted by law and/or contract.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              6. Your Privacy Choices and Rights
            </h2>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              6.1 Your Privacy Choices
            </h3>
            <p className='mb-6 text-foreground'>
              The privacy choices you may have about your personal information
              are determined by applicable law and are described below:
            </p>
            <ul className='mb-6 list-disc pl-6 text-foreground'>
              <li>
                <strong>Devices:</strong> We may send you push notifications
                through our App. You may opt out from receiving these push
                notifications by changing the settings on your mobile device.
                With your consent, we may also collect precise location-based
                information via our App. You may opt out of this collection by
                changing the settings on your mobile device.
              </li>
              <li>
                <strong>&ldquo;Do Not Track&rdquo;:</strong> We do not respond to or honor
                DNT signals or similar mechanisms transmitted by web browsers.
              </li>
              <li>
                <strong>Cookies and Interest-Based Advertising:</strong> You may
                stop or restrict the placement of tracking tools on your device
                or remove them by adjusting your preferences as your browser or
                device permits. Note that cookie-based opt-outs are not
                effective on mobile applications.
              </li>
            </ul>

            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              6.2 Your Privacy Rights
            </h3>
            <p className='mb-6 text-foreground'>
              In accordance with applicable law, you may have the right to:
            </p>
            <ul className='mb-6 list-disc pl-6 text-foreground'>
              <li>Access Personal Information about you;</li>
              <li>
                Request Correction of your personal information where it is
                inaccurate or incomplete;
              </li>
              <li>Request Deletion of your personal information;</li>
              <li>
                Request the Transfer of your personal data to you or to a third
                party;
              </li>
              <li>
                Request Restriction of or Object to our processing of your
                personal information;
              </li>
              <li>
                Withdraw Your Consent to our processing of your personal
                information.
              </li>
            </ul>
            <p className='mb-6 text-foreground'>
              If you would like to exercise any of these rights, please contact
              us as set forth in Section 16 (&ldquo;Contact us&rdquo;) below. We will
              process such requests in accordance with applicable laws.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              7. Security of Your Information
            </h2>
            <p className='mb-6 text-foreground'>
              We take steps to ensure that your information is treated securely
              and in accordance with this Privacy Notice. Unfortunately, no
              system is 100% secure, and we cannot ensure or warrant the
              security of any information you provide to us. To the fullest
              extent permitted by applicable law, we do not accept liability for
              unauthorized disclosure.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              8. International Data Transfers
            </h2>
            <p className='mb-6 text-foreground'>
              Your data may be transferred outside the European Economic Area
              (EEA) to our group companies or third-party service providers
              which Freshman engages in other regions (including without
              limitation the USA), which may have data protection laws that are
              different from the laws where you live. We ensure that your
              information is protected by using certified services, signing
              agreements on protection of personal data, and taking technical
              measures to secure data.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              9. Retention of Personal Information
            </h2>
            <p className='mb-6 text-foreground'>
              We may store the personal information we collect as described in
              this Privacy Notice for as long as you use our Services or as
              necessary to fulfill the purpose(s) for which it was collected.
              Personal information will be stored on secure servers during the
              period you have a valid and active account unless you delete such
              data manually using the App functionality or via a &ldquo;Remove my
              data&rdquo; button. You may also request us to delete your personal data
              by contacting us at team@joinfreshman.com.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              10. Supplemental Notice for California Residents
            </h2>
            <p className='mb-6 text-foreground'>
              This Supplemental Notice for California Residents applies to our
              processing of personal information subject to the CCPA and CPRA.
              California residents have the right to know what categories of
              personal information we have collected about them and whether such
              information was disclosed for a business purpose in the preceding
              twelve (12) months.
            </p>
            <div className='mb-6 overflow-x-auto'>
              <table className='w-full border border-border'>
                <thead>
                  <tr className='bg-muted'>
                    <th className='border border-border p-2 text-left'>
                      Category of Personal Information Collected by Freshman
                    </th>
                    <th className='border border-border p-2 text-left'>
                      Categories of Third Parties Personal Information is
                      Disclosed to for a Business Purpose
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border border-border p-2'>Identifiers</td>
                    <td className='border border-border p-2'>
                      Service providers, Other users or third parties you share
                      with, Advertising partners
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-border p-2'>
                      Personal information categories listed in Cal. Civ. Code §
                      1798.80(e)
                    </td>
                    <td className='border border-border p-2'>
                      Service providers, Other users or third parties you share
                      with
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-border p-2'>
                      Commercial information
                    </td>
                    <td className='border border-border p-2'>
                      Service providers, Other users or third parties you share
                      with
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-border p-2'>
                      Internet or other electronic network activity
                    </td>
                    <td className='border border-border p-2'>
                      Service providers, Other users or third parties you share
                      with, Advertising partners
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-border p-2'>
                      Geolocation data
                    </td>
                    <td className='border border-border p-2'>
                      Service providers, Other users or third parties you share
                      with, Advertising partners
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-border p-2'>
                      Inferences drawn from other personal information
                    </td>
                    <td className='border border-border p-2'>
                      Service providers, Other users or third parties you share
                      with, Advertising partners
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              11. Supplemental Notice for Nevada Residents
            </h2>
            <p className='mb-6 text-foreground'>
              If you are a resident of Nevada, you have the right to opt-out of
              the sale of certain personal information. You can exercise this
              right by contacting us at team@joinfreshman.com with the subject
              line &ldquo;Nevada Do Not Sell Request.&rdquo;
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              12. Supplemental Notice for Virginia Residents
            </h2>
            <p className='mb-6 text-foreground'>
              Under the Virginia Consumer Data Protection Act, you may request
              us to exercise your right to access, correct, or delete your
              personal data, or to opt out of the processing of personal data
              for targeted advertising or profiling.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              13. Children&apos;s Information
            </h2>
            <p className='mb-6 text-foreground'>
              The Services are not directed to children under 16, and we do not
              knowingly collect personal information from children. If you learn
              that your child has provided us with personal information without
              your consent, please contact us at team@joinfreshman.com.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              14. Third-Party Websites/Applications
            </h2>
            <p className='mb-6 text-foreground'>
              The Services may contain links to other websites/applications. We
              encourage our users to read the privacy policies of each website
              and application with which they interact.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              15. Supervisory Authority
            </h2>
            <p className='mb-6 text-foreground'>
              If you reside in the European Economic Area, Switzerland, or the
              United Kingdom, you have the right to lodge a complaint with a
              supervisory authority. The full list of authorities is available
              at:{' '}
              <a
                href='https://digital-strategy.ec.europa.eu/en/library/list-personal-data-protection-competent-authorities'
                className='text-primary hover:underline'
              >
                EU Data Protection Authorities
              </a>
              .
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              16. Contact Us
            </h2>
            <p className='mb-6 text-foreground'>
              People Who Code LLC is the controller of your personal
              information. If you have any questions about our privacy practices
              or this Privacy Notice, or to exercise your rights, please contact
              us at:
            </p>
            <p className='mb-6 text-foreground'>
              People Who Code LLC
              <br />
              447 Broadway, 10th Floor
              <br />
              New York, NY 10013, United States
              <br />
              Email:{' '}
              <a
                href='mailto:team@joinfreshman.com'
                className='text-primary hover:underline'
              >
                team@joinfreshman.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
