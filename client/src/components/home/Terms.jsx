import React , {useEffect} from 'react';

export default function TermsAndConditions() {
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl text-center font-bold mb-6">Terms & Conditions</h1>

        <p className="text-gray-400 mb-6">
          Last updated: July 23, 2025
        </p>

        <section className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <p>
            By accessing or using our application ("Service"), you agree to be bound by these Terms and Conditions. 
            If you do not agree with any part of the terms, you may not access the service.
          </p>

          <h2 className="text-white font-semibold text-lg mt-8">1. Use of the Service</h2>
          <p>
            You agree to use the Service only for lawful purposes and in accordance with these Terms.
            You are responsible for maintaining the confidentiality of your account and password.
          </p>

          <h2 className="text-white font-semibold text-lg mt-8">2. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property 
            of [Your Company Name] and its licensors. Unauthorized use of any materials may violate copyright, trademark, and other laws.
          </p>

          <h2 className="text-white font-semibold text-lg mt-8">3. User Content</h2>
          <p>
            You retain ownership of any data or content you upload but grant us a license to use, display, and store it 
            for the purpose of operating and improving the Service.
          </p>

          <h2 className="text-white font-semibold text-lg mt-8">4. Termination</h2>
          <p>
            We may suspend or terminate your access to the Service at any time, without prior notice or liability, 
            if you breach any of the Terms.
          </p>

          <h2 className="text-white font-semibold text-lg mt-8">5. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. Any changes will be effective 
            immediately upon posting on this page. Continued use after changes constitutes acceptance.
          </p>

          <h2 className="text-white font-semibold text-lg mt-8">6. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
            <br />
            <a href="mailto:support@yourdomain.com" className="text-blue-400 underline">
              support@clariso.co.in
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};