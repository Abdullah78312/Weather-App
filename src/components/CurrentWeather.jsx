import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { getWeatherIcon } from '../utils/weatherIcons';
import { Calendar, Clock } from 'lucide-react';

const CurrentWeather = ({ weather }) => {
  const { theme } = useTheme();

  const cardClass = theme === 'glassmorphism' 
    ? 'glass-card' 
    : 'neuro-card-dark';

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const isNight = () => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`${cardClass} rounded-3xl p-8 transition-all duration-300`}
    >
      {/* Location & Date */}
      <div className="mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          {weather.name}, {weather.sys.country}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{formatDate(weather.dt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>{formatTime(weather.dt)}</span>
          </div>
        </div>
      </div>

      {/* Main Weather Display */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Temperature & Icon */}
        <div className="flex items-center gap-6">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            {getWeatherIcon(weather.weather[0].main, isNight(), 120)}
          </motion.div>
          
          <div>
            <motion.div 
              className="text-7xl md:text-8xl font-bold text-white"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              {Math.round(weather.main.temp)}°C
            </motion.div>
            <div className="text-2xl text-gray-300 capitalize mt-2">
              {weather.weather[0].description}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;