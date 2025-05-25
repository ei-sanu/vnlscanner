import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation: React.FC = () => {
  // Create an array of particles with random positions
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 30 + 10,
    delay: Math.random() * 5,
  }));
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden cyberpunk-grid">
      {/* Grid lines are handled by CSS in the cyberpunk-grid class */}
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-300 via-dark-200 to-dark-300"></div>
      
      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary-500/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            x: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            y: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-primary-500/5 blur-3xl"></div>
      <div className="absolute top-3/4 -right-20 w-60 h-60 rounded-full bg-accent-purple/5 blur-3xl"></div>
      <div className="absolute top-2/3 left-1/4 w-60 h-60 rounded-full bg-accent-cyan/5 blur-3xl"></div>
    </div>
  );
};

export default BackgroundAnimation;