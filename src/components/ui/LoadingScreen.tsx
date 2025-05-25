import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Loader } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-dark-300 flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-4">
            <Shield className="h-16 w-16 text-primary-300" />
            <motion.div 
              className="absolute inset-0"
              animate={{ 
                boxShadow: ['0 0 0 rgba(56, 189, 248, 0)', '0 0 20px rgba(56, 189, 248, 0.5)', '0 0 0 rgba(56, 189, 248, 0)'] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight gradient-text mb-2">
            VNL<span className="text-white font-light">Scanner</span>
          </h1>
          
          <div className="flex items-center gap-2 text-gray-400">
            <Loader className="animate-spin h-4 w-4" />
            <span>Initializing secure environment...</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;