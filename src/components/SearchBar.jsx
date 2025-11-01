import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SearchBar = ({ onSearch, onGetLocation, isLoading }) => {
  const [city, setCity] = useState('');
  const { theme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  const cardClass = theme === 'glassmorphism' 
    ? 'glass-card' 
    : 'neuro-card-dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className={`flex-1 ${cardClass} rounded-2xl p-2 flex items-center transition-all duration-300`}>
          <Search className="text-gray-400 mx-3" size={20} />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for location..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-2 py-2"
            disabled={isLoading}
          />
        </div>
        
        <motion.button
          type="submit"
          disabled={isLoading || !city.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300
            ${theme === 'glassmorphism'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
              : 'bg-blue-500 hover:bg-blue-600'
            } text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Search
        </motion.button>

        <motion.button
          type="button"
          onClick={onGetLocation}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${cardClass} px-6 py-3 rounded-2xl flex items-center gap-2 text-white 
            hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <MapPin size={20} />
          <span className="hidden sm:inline">My Location</span>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SearchBar;