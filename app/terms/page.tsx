import React from 'react';
import { HeroHeader } from '@/components/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Freshman Terms of Use',
  description:
    'Terms of Use for Freshman, a study app by People Who Code LLC',
};

const TermsOfUse = () => {
  return (
    <>
      <HeroHeader />
      <div className='min-h-screen bg-background pt-24'>
        <div className='mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8'>
          <div className='prose prose-slate dark:prose-invert max-w-none'>
            <h1 className='mb-6 text-4xl font-bold text-foreground'>
              Terms of Use
            </h1>
            <p className='mb-4 text-muted-foreground'>
              Effective as of: December 9, 2025
            </p>

            <p className='mb-6 text-foreground'>Welcome to Freshman!</p>
            <p className='mb-6 text-foreground'>
              Please read these Terms of Use (&ldquo;Terms&rdquo;) and our Privacy Notice (
              <a
                href='/privacy'
                className='text-primary hover:underline'
              >
                /privacy
              </a>
              ) (the &ldquo;Privacy Notice&rdquo;) carefully before using the services
              offered by People Who Code LLC, a legal entity incorporated under
              the laws of the United States (&ldquo;Freshman&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). These
              Terms constitute a legally binding agreement between Freshman and
              you (also &ldquo;you&rdquo;, &ldquo;your&rdquo;), which regulates your use of the services
              accessible via the Freshman mobile application (the &ldquo;App&rdquo;) and
              Freshman website (&ldquo;Site&rdquo;). To make these Terms easier to read, our
              services and App are collectively called the &ldquo;Services.&rdquo;
            </p>
            <p className='mb-6 text-foreground'>
              By using our Services, you agree to be bound by these Terms and
              Privacy Notice. If you do not agree to these Terms, do not use
              our Services.
            </p>
            <p className='mb-6 text-foreground'>
              Please note that we will use commercially reasonable efforts to
              ensure that the Services are free from defects, viruses, and other
              malicious content. We do not promise that the Services are
              compatible with any third-party software or equipment.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Description of Services
            </h2>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              General
            </h3>
            <p className='mb-6 text-foreground'>
              The Freshman Services comprise a study platform designed to help
              you convert your notes into Active Recall tests, improve memory
              retention, and enhance your learning experience with AI-powered
              suggestions. Some of the Services might not be available at all
              times, and we reserve the right to change, update, or discontinue
              them on our App at any time in our sole discretion.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Account
            </h3>
            <p className='mb-6 text-foreground'>
              To use the Services, you must create a personal account with us by
              using your email or via Apple, Google, or another authorization
              option available from time to time (&ldquo;Account&rdquo;). We will use your
              email address to create the Account and send you emails to, among
              others, confirm Account details. Your Account will enable access to
              the Services. Freshman reserves the right to change the
              functionality of the Services and introduce prices and fees
              applicable to the Services at any time for any reason in its sole
              discretion and without prior notice. It&apos;s important that you
              provide us with accurate, complete, and current Account
              information and keep this information up to date. If you don't, we
              might have to suspend or terminate your Account. To protect your
              Account, keep the Account details and password confidential, and
              notify us right away of any unauthorized use. You're solely
              responsible for all activities that occur under your Account.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Security Passcode
            </h3>
            <p className='mb-6 text-foreground'>
              For security reasons, you may add an additional passcode to protect
              sensitive areas of the app from unauthorized access by third
              parties. Keep your passcode confidential and immediately notify us
              of any unauthorized access or use. You&apos;re solely responsible for
              keeping your passcode secret and safe. However, we will assist you
              via email at{' '}
              <a
                href='mailto:team@joinfreshman.com'
                className='text-primary hover:underline'
              >
                team@joinfreshman.com
              </a>{' '}
              if you have any trouble accessing your account.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Your Profile
            </h3>
            <p className='mb-6 text-foreground'>
              The features available on the App&apos;s profile page depend on your
              subscription plan. These may include a comprehensive dashboard
              with real-time insights into your study progress, notes, and tests,
              along with personalized suggestions related to your learning
              activity.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Profile Levels
            </h3>
            <p className='mb-6 text-foreground'>
              Your profile may reflect your activity, such as study sessions and
              test completions, to encourage consistent engagement. Progression
              may require more frequent interaction with the Services.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Scope of the Services
            </h3>
            <p className='mb-6 text-foreground'>
              Freshman reserves the right to change the functionality of the
              Services and introduce prices and fees applicable to the Services
              at any time for any reason in its sole discretion and without prior
              notice.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Service Availability and Maintenance
            </h3>
            <p className='mb-6 text-foreground'>
              We strive to provide reliable service availability, but we do not
              guarantee uninterrupted access to the Services. The Services may be
              temporarily unavailable due to maintenance, updates, technical
              issues, or other factors beyond our control. We will make
              reasonable efforts to provide advance notice of planned
              maintenance through in-app notifications or email when possible.
            </p>
            <p className='mb-6 text-foreground'>
              You may export your personal data at any time through the
              App&apos;s export functionality. We recommend regularly backing up
              your important data. While we maintain robust data protection
              measures, we cannot guarantee complete data preservation in all
              circumstances.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Who Can Use the Services
            </h2>
            <p className='mb-6 text-foreground'>
              You must be at least 16 years of age (or such other minimum age,
              either lower or higher, at which you can provide consent to data
              processing under the laws of your domicile), and not otherwise
              barred from using the Services under applicable law to access or
              use our Services.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Freshman Content
            </h2>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Freshman Intellectual Property
            </h3>
            <p className='mb-6 text-foreground'>
              Our Services and Freshman&apos;s proprietary text, graphics, images,
              illustrations, trademarks, trade names, page headers, button icons,
              scripts, and other content contained therein (&ldquo;Freshman Content&rdquo;)
              are owned by Freshman or its subsidiaries or affiliated companies
              and are protected by copyright, patent, trade secret, and other
              intellectual property laws. Except as explicitly stated in these
              Terms, Freshman reserves all rights in and to our Services.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              License
            </h3>
            <p className='mb-6 text-foreground'>
              If you comply with these Terms, Freshman hereby grants you a
              limited, worldwide, royalty-free, non-exclusive, non-transferable,
              non-sublicensable, revocable license to access and use the Services
              solely for your own personal non-commercial purposes.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Use Restrictions
            </h3>
            <p className='mb-6 text-foreground'>
              Except as expressly permitted in these Terms, you may not: (a)
              sell or commercially use any part of our Services; (b) copy,
              reproduce, distribute, publicly perform, or publicly display any
              part of our Services; (c) modify or create derivative works based
              on our Services; (d) reverse engineer, decompile, disass, or
              attempt to extract the source code of the Services; (e) distribute,
              transfer, sublicense, lease, lend, or rent the Services to any
              third party; or (f) use our Services other than as expressly
              provided in these Terms.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Other
            </h3>
            <p className='mb-6 text-foreground'>
              The licenses granted to you by Freshman do not cover any third-party
              content available on the Services. Any use of our Services other
              than as specifically authorized herein, without our prior written
              permission, is strictly prohibited and will terminate the license
              granted to you under these Terms.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              User Content
            </h2>
            <p className='mb-6 text-foreground'>
              Our Services may allow you to store notes, study materials, tests,
              and other media. Any content that you post or otherwise make
              available through the Services is referred to as &ldquo;User Content.&rdquo;
              Freshman does not claim ownership rights in any User Content, and
              nothing in these Terms will be deemed to restrict any rights that
              you may have to your User Content.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              User Content as Training Data
            </h3>
            <p className='mb-6 text-foreground'>
              We reserve the right to use your User Content for training purposes
              to improve and enhance our artificial intelligence models. User
              Content will be used securely and anonymously, not linked to any
              particular user, and processed automatically via machine learning
              algorithms.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Your Representations and Warranties
            </h3>
            <p className='mb-6 text-foreground'>
              You represent and warrant that neither your User Content, nor your
              use and provision of your User Content to be made available through
              the Services, nor any use of your User Content by Freshman will
              infringe, misappropriate, or violate a third party&apos;s intellectual
              property rights, or rights of publicity or privacy, or result in
              the violation of any applicable law or regulation.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Your Responsibility for User Content
            </h3>
            <p className='mb-6 text-foreground'>
              You are solely responsible for your User Content. The information
              and materials in the User Content have not been verified or
              approved by us. The views expressed by other users on the Services
              do not represent our views or values. We accept no liability in
              respect of any content submitted by users.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Removal of User Content
            </h3>
            <p className='mb-6 text-foreground'>
              You can remove your User Content by specifically deleting it. To
              the maximum extent permitted by law, we are not responsible or
              liable for the removal or deletion of (or the failure to remove or
              delete) any of your User Content.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Prohibited Conduct and Content
            </h2>
            <p className='mb-6 text-foreground'>
              Freshman is a study platform for notes, tests, and learning
              materials. Our goal is to outline what is allowed and what is not
              permitted. Freshman reserves the right, at its sole discretion, to
              determine which content violates these guidelines and will not be
              permitted with subsequent removal.
            </p>
            <p className='mb-6 text-foreground'>
              Bullying or harassment of any kind is not allowed. We encourage
              uplifting and respectful interactions. Please refrain from any
              negative or disrespectful attitude towards others and do not judge
              anyone by their race, gender, religion, physical constitution,
              health, or other personal attributes.
            </p>
            <p className='mb-6 text-foreground'>
              Upload allowable data only. Our App is designed for study and
              learning. Thus, we ask you to upload only legally permitted data
              and explicitly refrain from uploading any illegal content or
              content that contains violence, nudity, NSFW, or other adult
              content.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Reporting and Enforcement
            </h3>
            <p className='mb-6 text-foreground'>
              Violations of our Terms may result in warnings, sanctions, or
              actions against your content and/or Account, including temporary or
              permanent Account suspensions. If you notice any violation,
              please contact us at{' '}
              <a
                href='mailto:team@joinfreshman.com'
                className='text-primary hover:underline'
              >
                team@joinfreshman.com
              </a>{' '}
              or use the in-app feedback form.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Monitoring of Content
            </h2>
            <p className='mb-6 text-foreground'>
              Freshman is not obligated to monitor access to or use of the
              Services or to review or edit any content. However, we have the
              right to do so to operate the Services, ensure compliance with
              these Terms, and comply with applicable law. Freshman may remove
              any material that we find to be in violation of these Terms or
              otherwise objectionable. We may also consult and cooperate with
              law enforcement authorities to prosecute users who violate the law.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Feedback
            </h2>
            <p className='mb-6 text-foreground'>
              We appreciate feedback, comments, ideas, proposals, and suggestions
              for improvements to the Services (&ldquo;Feedback&rdquo;). If you choose to
              submit Feedback, you acknowledge that we may use, modify, adapt,
              reproduce, distribute, display, perform, or otherwise exploit the
              Feedback without any obligation to compensate you or obtain your
              consent. We have no obligation to treat Feedback as confidential or
              to implement it.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Fees and Payments
            </h2>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              General
            </h3>
            <p className='mb-6 text-foreground'>
              Freshman requires payment of a fee for the use of certain features
              or functions of the Services (&ldquo;PRO Features&rdquo;). You must purchase a
              subscription (&ldquo;Subscription&rdquo;) to use the PRO Features. When you
              purchase a Subscription (&ldquo;Transaction&rdquo;), you authorize us (or our
              third-party payment processor) to charge you the respective
              Subscription fee. You represent and warrant that you have the legal
              right to use all payment methods.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Subscription Plans and Pricing
            </h3>
            <p className='mb-6 text-foreground'>
              Freshman offers both free and premium subscription tiers:
            </p>
            <ul className='mb-6 list-disc pl-6 text-foreground'>
              <li>
                <strong>Free Plan:</strong> Includes basic study features,
                limited AI suggestions, and essential note and test capabilities.
              </li>
              <li>
                <strong>PRO Plan:</strong> Includes advanced features such as
                expanded note limits, enhanced test generation tools, priority
                support, AI-powered study suggestions, and premium customer
                support.
              </li>
            </ul>
            <p className='mb-6 text-foreground'>
              Subscription pricing is available in monthly and yearly billing
              cycles. Current pricing is displayed in the App at the time of
              purchase and may vary by region and platform. All prices are
              subject to change with notice as outlined in these Terms.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Subscriptions
            </h3>
            <p className='mb-6 text-foreground'>
              By purchasing a Subscription, you authorize Freshman to initiate
              recurring, non-refundable payments. We (or our third-party payment
              processor) will automatically charge you the Subscription fee at the
              beginning of your Subscription and at the frequency indicated until
              you cancel. Your Subscription continues until cancelled by you or
              we terminate your access to the Services.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Cancelling Your Subscription and Claiming Refund
            </h3>
            <p className='mb-6 text-foreground'>
              If you are dissatisfied with the PRO Features, you may cancel a
              Subscription for a full refund within two (2) calendar days of your
              initial purchase. After this period, purchases are final, and you
              will not be able to cancel or receive a refund. Cancellation will
              be effective at the end of the then-current Subscription period. If
              you cancel, your right to use the Services will continue until the
              end of the then-current Subscription period.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Cancelation Instructions
            </h3>
            <p className='mb-6 text-foreground'>
              To cancel your subscription, please follow one of these
              instructions:
            </p>
            <ul className='mb-6 list-disc pl-6 text-foreground'>
              <li>
                <strong>For iOS (App Store):</strong>
                <ul className='list-circle pl-6'>
                  <li>Open the Settings app on your iPhone or iPad.</li>
                  <li>Tap on your name at the top, then select Subscriptions.</li>
                  <li>
                    Locate the subscription you want to cancel from the list.
                  </li>
                  <li>
                    Tap the subscription and select Cancel Subscription.
                  </li>
                  <li>Confirm your cancellation.</li>
                </ul>
              </li>
              <li>
                <strong>For Android (Google Play Store):</strong>
                <ul className='list-circle pl-6'>
                  <li>
                    Open the Google Play Store app on your device.
                  </li>
                  <li>
                    Tap on your profile icon in the top-right corner.
                  </li>
                  <li>
                    Select Payments & Subscriptions, then tap Subscriptions.
                  </li>
                  <li>
                    Find the subscription you want to cancel and select it.
                  </li>
                  <li>
                    Tap Cancel Subscription and follow the prompts to confirm.
                  </li>
                </ul>
              </li>
            </ul>
            <p className='mb-6 text-foreground'>
              PLEASE NOTE THAT DELETING THE APP FROM YOUR DEVICE DOES NOT
              AUTOMATICALLY CANCEL YOUR SUBSCRIPTION.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Refund Instructions
            </h3>
            <p className='mb-6 text-foreground'>
              To claim a refund for your subscription, please choose an
              appropriate instruction:
            </p>
            <ul className='mb-6 list-disc pl-6 text-foreground'>
              <li>
                Android:{' '}
                <a
                  href='https://support.google.com/googleplay?p=refundAWF'
                  className='text-primary hover:underline'
                >
                  https://support.google.com/googleplay?p=refundAWF
                </a>
              </li>
              <li>
                iOS:{' '}
                <a
                  href='https://support.apple.com/en-us/118223'
                  className='text-primary hover:underline'
                >
                  https://support.apple.com/en-us/118223
                </a>
              </li>
            </ul>
            <p className='mb-6 text-foreground'>
              We do not have control over refunds on the iOS platform. You should
              use Apple functionality to receive a refund. However, we may assist
              with refunds on Android. If you have issues, please email us at{' '}
              <a
                href='mailto:team@joinfreshman.com'
                className='text-primary hover:underline'
              >
                team@joinfreshman.com
              </a>
              .
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Copyright Policy
            </h2>
            <p className='mb-6 text-foreground'>
              Freshman respects copyright law and expects its users to do the
              same. It is Freshman&apos;s policy to terminate Account holders who
              repeatedly infringe or are believed to be repeatedly infringing
              the rights of copyright holders.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Indemnification
            </h2>
            <p className='mb-6 text-foreground'>
              You agree to indemnify and hold Freshman, its officers, directors,
              employees, and agents harmless from any claims, disputes, costs,
              losses, liabilities, damages, expenses, and judgments arising out of
              or in connection with (a) your access to or use of the Services,
              (b) your User Content, or (c) your violation of these Terms.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Privacy
            </h2>
            <p className='mb-6 text-foreground'>
              Freshman respects your privacy and has established policies and
              procedures relating to the collection and use of your personal
              information. Please check our Privacy Notice at{' '}
              <a href='/privacy' className='text-primary hover:underline'>
                /privacy
              </a>{' '}
              to understand how we collect, use, and share your personal
              information.
            </p>
            <p className='mb-6 text-foreground'>
              You may delete your personal data using in-app functionality or by
              contacting us at{' '}
              <a
                href='mailto:team@joinfreshman.com'
                className='text-primary hover:underline'
              >
                team@joinfreshman.com
              </a>
              .
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Disclaimer of Warranties
            </h2>
            <p className='mb-6 text-foreground'>
              THE SERVICES ARE PROVIDED &ldquo;AS IS,&rdquo; WITHOUT WARRANTY OF ANY KIND.
              WE EXPLICITLY DISCLAIM ANY IMPLIED WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT, AND
              NON-INFRINGEMENT. We make no warranty that the Services will meet
              your requirements or be available on an uninterrupted, secure, or
              error-free basis.
            </p>
            <p className='mb-6 text-foreground'>
              YOUR USE OF THE SERVICES IS AT YOUR OWN RISK. YOU SHOULD NOT USE
              THE INFORMATION CONTAINED IN OR PROVIDED BY THE APP TO DIAGNOSE A
              HEALTH PROBLEM OR DISEASE. YOU SHOULD CONSULT WITH YOUR DOCTOR,
              PHARMACIST, OR OTHER HEALTHCARE PROFESSIONAL IF YOU HAVE ANY MEDICAL
              QUESTIONS. OUR APP DOES NOT INTEND TO REPLACE YOUR CURRENT
              MEDICATION (IF ANY).
            </p>
            <p className='mb-6 text-foreground'>
              OUR APP, INCLUDING BUT NOT LIMITED TO TEXT TRANSCRIPTIONS,
              SUMMARIES, INSIGHTS, AND OTHER MATERIAL, IS FOR INFORMATIONAL AND
              EDUCATIONAL PURPOSES ONLY AND IS NOT A SUBSTITUTE FOR PROFESSIONAL
              MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT. YOUR HEALTH AND WELL-BEING
              ARE YOUR PRIMARY RESPONSIBILITY. NO PHYSICIAN-PATIENT RELATIONSHIP
              IS CREATED BY THIS APP OR ITS USE.
            </p>
            <p className='mb-6 text-foreground'>
              Generative AI is an evolving technology that may produce
              unpredictable results. Text transcriptions, summaries, insights, and
              other information within the App may not be entirely accurate or
              complete. If you encounter any content that you believe to be
              inaccurate or violating our Terms, please report it via the in-app
              report or reach out to us at{' '}
              <a
                href='mailto:team@joinfreshman.com'
                className='text-primary hover:underline'
              >
                team@joinfreshman.com
              </a>
              .
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Your Representations and Warranties
            </h2>
            <ul className='mb-6 list-disc pl-6 text-foreground'>
              <li>
                <strong>Eligibility:</strong> You are at least 16 years old or
                another age of majority in your jurisdiction and have the legal
                capacity to enter into and be bound by these Terms.
              </li>
              <li>
                <strong>Compliance with Laws:</strong> Your use of our Services
                complies with all applicable laws, regulations, and ordinances.
              </li>
              <li>
                <strong>No Infringement:</strong> Your User Content and its use
                will not infringe, misappropriate, or violate a third party&apos;s
                intellectual property rights, or rights of publicity or privacy.
              </li>
              <li>
                <strong>No Harmful Content:</strong> You will not use the Services
                to upload, share, or generate any content that is harmful,
                harassing, defamatory, offensive, obscene, or otherwise
                objectionable.
              </li>
              <li>
                <strong>Accurate Information:</strong> All information you
                provide to us is true, accurate, complete, and up-to-date.
              </li>
              <li>
                <strong>No Misuse of the Services:</strong> You will not use the
                Services in any manner that could damage, disable, overburden, or
                impair the Services.
              </li>
            </ul>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Limitation of Liability
            </h2>
            <p className='mb-6 text-foreground'>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER FRESHMAN NOR ITS
              SERVICE PROVIDERS WILL BE LIABLE FOR ANY INCIDENTAL, SPECIAL,
              EXEMPLARY, OR CONSEQUENTIAL DAMAGES, OR DAMAGES FOR LOST PROFITS,
              LOST REVENUES, LOST SAVINGS, LOST BUSINESS OPPORTUNITY, LOSS OF
              DATA OR GOODWILL, SERVICE INTERRUPTION, COMPUTER DAMAGE, OR SYSTEM
              FAILURE ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE USE
              OF OR INABILITY TO USE THE SERVICES.
            </p>
            <p className='mb-6 text-foreground'>
              WE ARE NOT LIABLE FOR ANY PERSONAL INJURY, HEALTH PROBLEMS, OR
              OTHER DAMAGES RESULTING FROM THE USE OR MISUSE OF THIS APP OR THE
              INFORMATION IT PROVIDES.
            </p>
            <p className='mb-6 text-foreground'>
              IN NO EVENT WILL FRESHMAN&apos;S TOTAL LIABILITY EXCEED THE
              AMOUNTS YOU HAVE PAID OR ARE PAYABLE BY YOU TO FRESHMAN FOR USE OF
              THE SERVICES OR ONE HUNDRED DOLLARS ($100), IF YOU HAVE NOT HAD ANY
              PAYMENT OBLIGATIONS TO FRESHMAN.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Links to Third Party Websites
            </h2>
            <p className='mb-6 text-foreground'>
              The Services may contain links to third-party websites, services,
              and other resources. Freshman does not guarantee their safety or
              conformity with your expectations and assumes no liability for any
              damage or loss resulting from their use.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Governing Law and Dispute Resolution
            </h2>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Governing Law and Forum Choice
            </h3>
            <p className='mb-6 text-foreground'>
              These Terms will be governed by the Federal Arbitration Act,
              federal arbitration law, and the laws of the State of Wyoming,
              without regard to its conflict of laws provisions. The exclusive
              jurisdiction for all Disputes not required to arbitrate will be
              the state and federal courts located in Cheyenne, Wyoming.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Mandatory Arbitration of Disputes
            </h3>
            <p className='mb-6 text-foreground'>
              Any dispute, claim, or controversy arising out of or relating to
              these Terms or the use of the Services (&ldquo;Disputes&rdquo;) will be
              resolved solely by binding, individual arbitration. You and
              Freshman waive the right to a trial by jury or to participate in a
              class action.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Exceptions
            </h3>
            <p className='mb-6 text-foreground'>
              You and Freshman may seek to resolve a Dispute in small claims
              court if it qualifies, or seek injunctive or other equitable relief
              to prevent the infringement or misappropriation of intellectual
              property rights.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Conducting Arbitration and Arbitration Rules
            </h3>
            <p className='mb-6 text-foreground'>
              The arbitration will be conducted by the American Arbitration
              Association (&ldquo;AAA&rdquo;) under its Consumer Arbitration Rules. Any
              arbitration hearings will take place in the county where you live,
              unless we both agree to a different location.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Arbitration Costs
            </h3>
            <p className='mb-6 text-foreground'>
              Payment of all filing, administration, and arbitrator fees will be
              governed by the AAA Rules. If you prevail in arbitration, you will
              be entitled to an award of attorneys&apos; fees and expenses to the
              extent provided under applicable law.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Class Action Waiver
            </h3>
            <p className='mb-6 text-foreground'>
              You and Freshman agree that each may bring claims against the other
              only in an individual capacity, and not as a plaintiff or class
              member in any class or representative proceeding.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Changes to our Terms
            </h2>
            <p className='mb-6 text-foreground'>
              We may update and change these Terms from time to time. The new
              version comes into force from the moment of its placement in the
              App. We will notify you of changes by posting a notice in the App
              or via in-App notification at least fifteen (15) calendar days
              prior to such changes. By continuing to use the Services, you
              accept these Terms.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Termination
            </h2>
            <p className='mb-6 text-foreground'>
              We may suspend or terminate your access to the Services at our sole
              discretion, at any time and without notice. If you have any
              questions, please email us at{' '}
              <a
                href='mailto:team@joinfreshman.com'
                className='text-primary hover:underline'
              >
                team@joinfreshman.com
              </a>
              .
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Severability
            </h2>
            <p className='mb-6 text-foreground'>
              If any part of these Terms is invalid or unenforceable, the other
              parts will still apply.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Rights and Terms for Apps
            </h2>
            <p className='mb-6 text-foreground'>
              This Section applies to any App acquired from the Apple App Store
              or used on an iOS device. Apple is not responsible for any
              maintenance, support, or warranty obligations with respect to the
              App. You must comply with any applicable third-party terms of
              service when using the App.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              General Terms
            </h2>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Entire Agreement
            </h3>
            <p className='mb-6 text-foreground'>
              These Terms constitute the entire and exclusive understanding and
              agreement between Freshman and you regarding the Services.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Notices
            </h3>
            <p className='mb-6 text-foreground'>
              Any notices will be given via email or by posting to the Services.
              For notices made by email, the date of receipt will be deemed the
              date on which such notice is transmitted.
            </p>
            <h3 className='mt-6 mb-3 text-xl font-medium text-foreground'>
              Waiver of Rights
            </h3>
            <p className='mb-6 text-foreground'>
              Freshman&apos;s failure to enforce any right or provision of these Terms
              will not be considered a waiver of such right or provision.
            </p>

            <h2 className='mt-8 mb-4 text-2xl font-semibold text-foreground'>
              Contacts
            </h2>
            <p className='mb-6 text-foreground'>
              If you have any questions regarding the use of Services or these
              Terms, please contact us at:
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

export default TermsOfUse;
