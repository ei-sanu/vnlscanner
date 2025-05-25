import { motion } from 'framer-motion';
import { Clock, FileText, Home, Info, Lock, LogIn, LogOut, Menu, Shield, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Scanner', path: '/scanner', icon: <Shield size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Terms', path: '/terms', icon: <FileText size={18} /> },
  ];

  return (
    <header className="bg-dark-200 border-b border-primary-900/50 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="text-primary-300"
            >
              <Shield className="h-8 w-8" />
            </motion.div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight gradient-text">
                VNL<span className="text-white font-light">Scanner</span>
              </h1>
              <div className="text-xs text-gray-400 -mt-1">
                by <a
                  href="https://www.somesh.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://www.somesh.social', '_blank');
                  }}
                  className="hover:text-primary-300 transition-colors cursor-pointer"
                >
                  somesh.social
                </a>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 transition-all px-2 py-1 rounded-md text-sm font-medium
                  ${location.pathname === link.path
                    ? 'text-primary-300 bg-primary-900/20'
                    : 'text-gray-300 hover:text-primary-300 hover:bg-primary-900/10'
                  }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth and Time */}
          <div className="hidden md:flex items-center gap-6">
            {/* Time Display */}
            <div className="text-xs text-gray-400 flex flex-col items-end">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span className="font-mono">{formatTime(currentTime)}</span>
              </div>
              <div>{formatDate(currentTime)}</div>
            </div>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="btn-secondary text-sm py-1.5 flex items-center gap-1.5"
                >
                  <User size={16} />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm py-1.5 flex items-center gap-1.5"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="btn-secondary text-sm py-1.5 flex items-center gap-1.5"
                >
                  <LogIn size={16} />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm py-1.5 flex items-center gap-1.5"
                >
                  <Lock size={16} />
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white rounded-md hover:bg-primary-900/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden absolute top-full left-0 right-0 bg-dark-200 border-b border-primary-900/50 backdrop-blur-lg bg-opacity-95 z-50 ${isOpen ? 'block' : 'hidden'}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 p-3 rounded-md
                ${location.pathname === link.path
                  ? 'text-primary-300 bg-primary-900/20'
                  : 'text-gray-300 hover:text-primary-300 hover:bg-primary-900/10'
                }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          {/* Auth Links */}
          <div className="border-t border-primary-900/30 pt-2 mt-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 p-3 text-gray-300 hover:text-primary-300 hover:bg-primary-900/10 rounded-md"
                >
                  <User size={18} />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 p-3 text-gray-300 hover:text-primary-300 hover:bg-primary-900/10 rounded-md w-full text-left"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 p-3 text-gray-300 hover:text-primary-300 hover:bg-primary-900/10 rounded-md"
                >
                  <LogIn size={18} />
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 p-3 text-gray-300 hover:text-primary-300 hover:bg-primary-900/10 rounded-md"
                >
                  <Lock size={18} />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Time Display */}
          <div className="p-3 text-xs text-gray-400 border-t border-primary-900/30 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>Current Time:</span>
            </div>
            <div className="font-mono">{formatTime(currentTime)}</div>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
