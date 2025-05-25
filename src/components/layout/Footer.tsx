import { Github, Linkedin, Mail, MapPin, Phone, Shield, Twitter } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-200 border-t border-primary-900/50 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary-300" />
              <h2 className="text-lg font-bold gradient-text">
                VNL<span className="text-white font-light">Scanner</span>
              </h2>
            </div>
            <p className="text-sm text-gray-400">
              An educational tool for identifying website vulnerabilities and improving
              cybersecurity awareness.
            </p>
            <div className="flex items-center space-x-3">
              <a href="#" className="text-gray-400 hover:text-primary-300 transition">
                <Github size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-300 transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-300 transition">
                <Linkedin size={18} />
              </a>
              <a href="mailto:contact@example.com" className="text-gray-400 hover:text-primary-300 transition">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Quick Links
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-300 transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/scanner" className="text-gray-400 hover:text-primary-300 transition text-sm">
                  Scanner
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-300 transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-primary-300 transition text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Details */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Developer Details
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-primary-300 transition text-sm flex items-center gap-2"
                >
                  <Mail size={16} />
                  Contact Us
                </Link>
              </li>
              <li className="text-gray-400 text-sm flex items-center gap-2">
                <Phone size={16} />
                +917008450074
              </li>
              <li>
                <a href="mailto:someshranjanbiswal13678@gmail.com" className="text-gray-400 hover:text-primary-300 transition text-sm flex items-center gap-2">
                  <Mail size={16} />
                  Dev Email
                </a>
              </li>
              <li className="text-gray-400 text-sm flex items-center gap-2">
                <MapPin size={16} />
                Lovely Professional University BH - 4
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Disclaimer
            </h3>
            <p className="text-sm text-gray-400">
              VNL Scanner is intended for educational purposes only. All scanning
              features are simulated. Never use security testing tools against websites
              without explicit permission.
            </p>
          </div>
        </div>

        <div className="border-t border-primary-900/30 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} VNL Scanner. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link to="/terms" className="text-xs text-gray-500 hover:text-primary-300 transition">
              Terms of Service
            </Link>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-primary-300 transition">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
