import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { getWeatherIcon } from '../utils/weatherIcons';

const TodayForecast = ({ forecast }) => {
  const { theme } = useTheme();

  const cardClass = theme === 'glassmorphism' 
    ? 'glass-card' 
    : 'neuro-card-dark';

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const isNight = (timestamp) => {
    const hour = new Date(timestamp * 1000).getHours();
    return hour >= 18 || hour < 6;
  };

  // Get next 8 forecasts (24 hours, every 3 hours)
  const todayForecasts = forecast.list.slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`${cardClass} rounded-3xl p-6 transition-all duration-300`}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Today's Forecast</h2>
      
      <div className="overflow-x-auto scrollbar-thin">
        <div className="flex gap-4 pb-2">
          {todayForecasts.map((item, index) => (
            <motion.div
              key={item.dt}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`${cardClass} rounded-2xl p-4 min-w-[140px] flex flex-col items-center 
                gap-3 hover:shadow-glow transition-all duration-300`}
            >
              <div className="text-white font-medium">
                {formatTime(item.dt)}
              </div>
              
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                {getWeatherIcon(item.weather[0].main, isNight(item.dt), 48)}
              </motion.div>
              
              <div className="text-2xl font-bold text-white">
                {Math.round(item.main.temp)}°C
              </div>
              
              <div className="text-sm text-gray-300 capitalize text-center">
                {item.weather[0].description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TodayForecast;