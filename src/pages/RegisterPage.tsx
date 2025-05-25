import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { Mail, Lock, UserPlus, AlertCircle } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { register, isAuthenticated, error, clearError, isLoading } = useAuthStore();
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
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setFormError('Please fill in all fields');
      return;
    }
    
    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('Please enter a valid email address');
      return;
    }
    
    // Password length
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    
    // Password match
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    // Submit form
    await register(email, password);
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
          <UserPlus className="h-12 w-12 text-primary-300 mb-2" />
        </motion.div>
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <p className="text-gray-400 mt-2">
          Join VNL Scanner to start identifying security vulnerabilities
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
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock className="h-5 w-5" />
            </span>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <UserPlus className="h-5 w-5" />
              <span>Create Account</span>
            </>
          )}
        </button>
        
        <div className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-300 hover:text-primary-400 transition">
            Log in
          </Link>
        </div>
      </form>
      
      <div className="mt-8 pt-6 border-t border-gray-700 text-center">
        <p className="text-xs text-gray-500">
          By creating an account, you agree to our{' '}
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

export default RegisterPage;