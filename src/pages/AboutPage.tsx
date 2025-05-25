import { motion } from 'framer-motion';
import { AlertTriangle, Book, Link as LinkIcon, Shield, Users } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyL4Gt01t4ZhjCW27vdq1pQdN9HNl97NIH3PPWyxU61UrC3Qf3GiOjABzKbK5GIjVhh/exec', {
        method: 'POST',
        body: new URLSearchParams({ email: email }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        const text = await response.text();
        if (text === 'Success') {
          setSubscribeStatus('Successfully subscribed!');
          setEmail('');
          // Play success sound
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            await audioRef.current.play();
          }
        } else {
          setSubscribeStatus('Subscription failed. Please try again.');
        }
      } else {
        setSubscribeStatus('Subscription failed. Please try again.');
      }
    } catch (error) {
      setSubscribeStatus('Error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Shield className="h-16 w-16 text-primary-300 mx-auto mb-4" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          About <span className="gradient-text">VNL Scanner</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-300 text-lg"
        >
          Our mission, values, and commitment to cybersecurity education
        </motion.p>
      </div>

      <div className="space-y-16">
        {/* Mission Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card p-8"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 flex justify-center">
                <div className="p-6 rounded-full bg-primary-900/20 text-primary-300 flex items-center justify-center">
                  <Shield className="h-40 w-40" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-300 mb-4">
                  VNL Scanner's mission is to provide accessible cybersecurity education and
                  raise awareness about web vulnerabilities. We believe that understanding
                  security threats is the first step in building a safer digital ecosystem.
                </p>
                <p className="text-gray-300">
                  Our platform is designed to help users learn about common web vulnerabilities,
                  understand how they work, and learn best practices for securing websites against
                  potential threats.
                </p>

                <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white mb-1">Educational Purpose Disclaimer</h3>
                      <p className="text-gray-300 text-sm">
                        VNL Scanner is strictly for <strong>educational purposes only</strong>. All scanning features are
                        simulated to demonstrate security concepts. Never use security testing tools against
                        websites without explicit permission from the website owner.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Values & Goals */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">Our Values & Goals</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Book className="h-10 w-10 text-primary-300" />,
                title: "Education First",
                description: "We believe in making cybersecurity knowledge accessible to everyone, from beginners to professionals."
              },
              {
                icon: <Shield className="h-10 w-10 text-primary-300" />,
                title: "Promoting Security",
                description: "Our goal is to help secure the web by raising awareness about common vulnerabilities and their remediation."
              },
              {
                icon: <Users className="h-10 w-10 text-primary-300" />,
                title: "Ethical Practice",
                description: "We advocate for responsible security testing and ethical hacking practices that respect privacy and legal boundaries."
              },
              {
                icon: <LinkIcon className="h-10 w-10 text-primary-300" />,
                title: "Community Support",
                description: "We aim to build a community of security-conscious developers and website owners who value proactive protection."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Milestone Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Our Milestone</h2>
            <div className="bg-dark-200 p-6 rounded-lg border border-primary-900/30">
              <p className="text-gray-300">
                VNL Scanner's primary milestone is to help secure every website, large or small, from
                potential cyber attacks. We aim to empower website owners and developers with the knowledge
                and tools they need to identify security vulnerabilities before malicious actors can exploit them.
              </p>
              <p className="text-gray-300 mt-4">
                By providing accessible security education, we hope to contribute to a safer internet
                where security best practices are widely understood and implemented.
              </p>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-12">
          <div className="animated-border rounded-lg overflow-hidden">
            <div className="bg-dark-200 p-8 md:p-12 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    Join our security <span className="gradient-text">community</span>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Start learning about web security today. Create an account to access
                    our educational scanner and begin your cybersecurity journey.
                  </p>
                  <Link
                    to="/register"
                    className="btn-primary flex items-center justify-center gap-2 text-base py-3 px-6 w-full md:w-auto"
                  >
                    <Shield className="h-5 w-5" />
                    Get Started
                  </Link>
                </div>

                <div className="flex justify-center">
                  <div className="p-6 bg-dark-300 rounded-lg border border-primary-900/20">
                    <h3 className="text-lg font-medium mb-4">Subscribe to our newsletter</h3>
                    <ul className="space-y-">
                      <li>
                        <a
                          href="https://owasp.org/www-project-top-ten/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary-300 hover:text-primary-400 transition"
                        >
                          {/* <LinkIcon className="h-4 w-4" /> */}
                          {/* OWASP Top 10 Web App Vulnerabilities */}
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://portswigger.net/web-security"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary-300 hover:text-primary-400 transition"
                        >
                          {/* <LinkIcon className="h-4 w-4" />
                          PortSwigger Web Security Academy */}
                        </a>
                      </li>
                      <li className="pt-4 border-t border-primary-900/20">
                        {/* <h4 className="text-md font-medium mb-3">Subscribe to our newsletter</h4> */}
                        <p className="text-sm text-gray-400 mb-3">
                          Get updates on cybersecurity and fullstack related web apps
                        </p>
                        <form onSubmit={handleSubscribe} className="space-y-2">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 bg-dark-400 border border-primary-900/20 rounded-md
                                     focus:outline-none focus:ring-2 focus:ring-primary-500
                                     text-black placeholder-gray-500"
                            required
                          />
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-4 py-2 bg-primary-500 text-white rounded-md
                                     hover:bg-primary-600 transition duration-200 disabled:opacity-50
                                     disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            {isLoading ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Subscribing...
                              </>
                            ) : (
                              'Subscribe'
                            )}
                          </button>
                          {subscribeStatus && (
                            <p className={`text-sm ${subscribeStatus.includes('Success') ? 'text-green-400' : 'text-red-400'}`}>
                              {subscribeStatus}
                            </p>
                          )}
                        </form>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
