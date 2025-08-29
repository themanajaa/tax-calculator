import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function DarkModeToggle() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Force dark mode on component mount
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const handleClick = () => {
    // Show funny message when user tries to switch to light mode
    setShowMessage(true);
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        className="relative p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Try to switch to light mode (spoiler: it won't work!)"
      >
        <motion.div
          whileHover={{ rotate: 180 }}
          whileTap={{ rotate: 360 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Sun className="w-5 h-5 text-yellow-500" />
        </motion.div>
      </motion.button>

      {/* Funny message popup */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute top-12 right-0 w-64 p-3 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50"
          >
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5">
                <Moon className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-200 font-medium mb-1">
                  Light mode? Haha, your eyes refuse! 
                </p>
                <p className="text-xs text-gray-400">
                  Stay in the dark, it's better for your soul 🌙
                </p>
              </div>
            </div>
            
            {/* Arrow pointing up */}
            <div className="absolute -top-2 right-4 w-4 h-4 bg-gray-800 border-l border-t border-gray-600 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
