import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`fixed top-6 left-6 z-50 p-4 rounded-2xl flex items-center gap-2 font-medium
        ${theme === 'glassmorphism' 
          ? 'glass-card text-white hover:bg-white/20' 
          : 'neuro-card-dark text-white hover:shadow-neumorphic-light'
        } transition-all duration-300`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Palette size={20} />
      <span className="hidden sm:inline">
        {theme === 'glassmorphism' ? 'Glassmorphism' : 'Neumorphism'}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;