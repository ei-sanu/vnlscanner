import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, isAuthenticated, error, clearError, isLoading } = useAuthStore();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/scanner');
    }
  }, [isAuthenticated, navigate]);
  
  // Handle store errors
  useEffect(() => {
    if (error) {
      setFormError(error);
    }
    
    return () => {
      clearError();
    };
  }, [error, clearError]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    // Basic validation
    if (!email.trim() || !password.trim()) {
      setFormError('Please fill in all fields');
      return;
    }
    
    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('Please enter a valid email address');
      return;
    }
    
    // Submit form
    await login(email, password);
  };
  
  return (
    <div className="max-w-md mx-auto my-8 p-8 card">
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          <LogIn className="h-12 w-12 text-primary-300 mb-2" />
        </motion.div>
        <h1 className="text-2xl font-bold">Log In to VNL Scanner</h1>
        <p className="text-gray-400 mt-2">
          Access your account to start scanning websites
        </p>
      </div>
      
      {formError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-error/20 border border-error/30 text-white p-3 rounded-md mb-4 flex items-center gap-2"
        >
          <AlertCircle className="h-5 w-5 text-error" />
          <span>{formError}</span>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Mail className="h-5 w-5" />
            </span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field pl-10"
              placeholder="your@email.com"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock className="h-5 w-5" />
            </span>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pl-10"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full py-3 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <LogIn className="h-5 w-5" />
              <span>Log In</span>
            </>
          )}
        </button>
        
        <div className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-300 hover:text-primary-400 transition">
            Create one now
          </Link>
        </div>
      </form>
      
      <div className="mt-8 pt-6 border-t border-gray-700 text-center">
        <p className="text-xs text-gray-500">
          By logging in, you agree to our{' '}
          <Link to="/terms" className="text-primary-300 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/terms" className="text-primary-300 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;