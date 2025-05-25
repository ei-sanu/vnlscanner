import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, ArrowRight, AlertTriangle, Search, Server, Database } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Discover website <span className="gradient-text">vulnerabilities</span> before attackers do
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              VNL Scanner helps you identify security issues in websites with our 
              advanced simulation technology. Protect your digital assets with 
              comprehensive security analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={isAuthenticated ? "/scanner" : "/login"} 
                className="btn-primary flex items-center justify-center gap-2 text-base py-3 px-6"
              >
                <Shield className="h-5 w-5" />
                Start Scanning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/about" 
                className="btn-secondary flex items-center justify-center gap-2 text-base py-3 px-6"
              >
                Learn More
              </Link>
            </div>
            <div className="mt-4 text-yellow-400 flex items-start gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>For educational purposes only. Never scan websites without permission.</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <div className="card overflow-hidden border-primary-800/40 p-1 bg-dark-200">
              <div className="bg-dark-100 rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-primary-300 font-semibold">Security Scan</div>
                  <div className="text-xs text-gray-400">Educational Demo</div>
                </div>
                <div className="h-64 relative">
                  <div className="absolute inset-0 terminal-text text-xs text-green-400 overflow-hidden">
                    <pre className="p-3">
                      {`> Initializing security scan module...
> Target: example.com
> Scanning for vulnerabilities...
> Checking for XSS vulnerabilities...
> Analyzing server configuration...
> Testing input validation...
> Checking for outdated components...
> Analyzing response headers...
> Testing authentication mechanisms...
> Scanning completed
> Vulnerabilities detected: 3 (1 high, 2 medium)
> Generating report...`}
                    </pre>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-transparent via-transparent to-dark-100"></div>
                </div>
              </div>
            </div>
            
            {/* Animated elements */}
            <motion.div
              className="absolute -top-4 -right-4 h-24 w-24 bg-primary-500/10 rounded-full blur-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 h-32 w-32 bg-accent-purple/10 rounded-full blur-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Advanced Security <span className="gradient-text">Features</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our educational platform provides comprehensive security analysis 
            to help you understand website vulnerabilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Search className="h-10 w-10 text-primary-300" />,
              title: "Vulnerability Scanner",
              description: "Scan websites for common security vulnerabilities like XSS, SQL injection, and misconfigured servers."
            },
            {
              icon: <Shield className="h-10 w-10 text-primary-300" />,
              title: "Risk Assessment",
              description: "Get a detailed security score and risk level assessment based on detected vulnerabilities."
            },
            {
              icon: <Server className="h-10 w-10 text-primary-300" />,
              title: "Technical Analysis",
              description: "Examine server configurations, headers, and technologies used by the target website."
            },
            {
              icon: <Lock className="h-10 w-10 text-primary-300" />,
              title: "Security Recommendations",
              description: "Receive actionable recommendations to address identified security issues."
            },
            {
              icon: <Database className="h-10 w-10 text-primary-300" />,
              title: "Scan History",
              description: "Keep track of your previous scans and monitor security improvements over time."
            },
            {
              icon: <AlertTriangle className="h-10 w-10 text-primary-300" />,
              title: "Educational Resources",
              description: "Access cybersecurity learning materials and best practices to improve your knowledge."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6 hover:translate-y-[-5px]"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12">
        <div className="animated-border rounded-lg overflow-hidden">
          <div className="bg-dark-200 p-8 md:p-12 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Ready to <span className="gradient-text">secure</span> your website?
                </h2>
                <p className="text-gray-300 mb-6">
                  Start scanning now to identify potential security vulnerabilities 
                  and protect your digital assets from cyber threats.
                </p>
                <Link 
                  to={isAuthenticated ? "/scanner" : "/register"} 
                  className="btn-primary flex items-center justify-center gap-2 text-base py-3 px-6 w-full md:w-auto"
                >
                  {isAuthenticated ? 'Launch Scanner' : 'Create Free Account'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              
              <div className="flex justify-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative"
                >
                  <Shield className="h-40 w-40 text-primary-800" />
                  <motion.div
                    className="absolute inset-0"
                    animate={{ 
                      boxShadow: ['0 0 0 rgba(56, 189, 248, 0)', '0 0 60px rgba(56, 189, 248, 0.3)', '0 0 0 rgba(56, 189, 248, 0)'] 
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Shield className="h-40 w-40 text-primary-300" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;