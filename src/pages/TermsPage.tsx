import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FileText className="h-16 w-16 text-primary-300 mx-auto mb-4" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Terms & <span className="gradient-text">Conditions</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-300 text-lg"
        >
          Please read these terms carefully before using VNL Scanner
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-8"
      >
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary-300">1.</span> Introduction
            </h2>
            <p className="text-gray-300 mb-4">
              Welcome to VNL Scanner. These Terms of Service govern your use of our website
              located at [website address] and all related services provided by VNL Scanner.
            </p>
            <p className="text-gray-300">
              By accessing or using VNL Scanner, you agree to be bound by these Terms. If you
              disagree with any part of the terms, you may not access our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary-300">2.</span> Educational Purpose
            </h2>
            <div className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300">
                    <strong>VNL Scanner is strictly for educational purposes only.</strong> Our platform
                    is designed to provide information about website vulnerabilities and cybersecurity
                    concepts for educational and awareness purposes.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-300">
              The scanning features provided by VNL Scanner are simulated and do not perform actual
              security testing against the websites you enter. All results are generated for educational
              demonstration only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary-300">3.</span> Prohibited Uses
            </h2>
            <p className="text-gray-300 mb-4">
              You may not use VNL Scanner or any knowledge gained from our platform to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
              <li>Conduct actual security testing against websites without explicit permission from the website owner</li>
              <li>Engage in any illegal activities or cyberattacks</li>
              <li>Attempt to gain unauthorized access to systems or networks</li>
              <li>Collect sensitive information about websites or their users</li>
              <li>Distribute malware or other harmful software</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary-300">4.</span> User Accounts
            </h2>
            <p className="text-gray-300 mb-4">
              When you create an account with us, you must provide accurate and complete information.
              You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>
            <p className="text-gray-300">
              We reserve the right to disable any user account if we believe you have violated any of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary-300">5.</span> Privacy Policy
            </h2>
            <p className="text-gray-300">
              Our Privacy Policy describes how we handle the information you provide to us when you use our
              services. By using VNL Scanner, you agree to our collection and use of information in accordance
              with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary-300">6.</span> Intellectual Property
            </h2>
            <p className="text-gray-300">
              The service and its original content, features, and functionality are and will remain the
              exclusive property of VNL Scanner. Our service is protected by copyright, trademark, and
              other laws. Our trademarks and trade dress may not be used in connection with any product
              or service without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary-300">7.</span> Limitation of Liability
            </h2>
            <p className="text-gray-300">
              In no event shall VNL Scanner, nor its directors, employees, partners, agents, suppliers,
              or affiliates, be liable for any indirect, incidental, special, consequential or punitive
              damages, including without limitation, loss of profits, data, use, goodwill, or other
              intangible losses, resulting from your access to or use of or inability to access or use
              the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary-300">8.</span> Changes to Terms
            </h2>
            <p className="text-gray-300">
              We reserve the right to modify or replace these Terms at any time. If a revision is material,
              we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes
              a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary-300">9.</span> Contact Us
            </h2>
            <p className="text-gray-300">
              If you have any questions about these Terms, please contact us at <a href='https://www.somesh.social/'>somesh.social</a>
            </p>
          </section>
        </div>
      </motion.div>

      <div className="mt-12 text-center">
        <div className="inline-block p-6 bg-dark-200 rounded-lg border border-primary-900/20">
          <div className="flex items-center gap-4">
            <Shield className="h-10 w-10 text-primary-300" />
            <div className="text-left">
              <h3 className="text-lg font-medium mb-1">Security Milestone</h3>
              <p className="text-gray-400 text-sm">
                Our mission is to secure every large and small website from cyber attacks
                through education and awareness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
