import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { getWeatherIcon } from '../utils/weatherIcons';

const WeeklyForecast = ({ forecast }) => {
  const { theme } = useTheme();

  const cardClass = theme === 'glassmorphism' 
    ? 'glass-card' 
    : 'neuro-card-dark';

  // Process forecast to get daily data
  const getDailyForecast = () => {
    const dailyData = {};
    
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();
      
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: dateKey,
          temps: [],
          weather: item.weather[0],
          dt: item.dt
        };
      }
      
      dailyData[dateKey].temps.push(item.main.temp);
    });

    return Object.values(dailyData).slice(0, 7).map(day => ({
      ...day,
      minTemp: Math.round(Math.min(...day.temps)),
      maxTemp: Math.round(Math.max(...day.temps)),
      avgTemp: Math.round(day.temps.reduce((a, b) => a + b) / day.temps.length)
    }));
  };

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const dailyForecasts = getDailyForecast();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={`${cardClass} rounded-3xl p-6 transition-all duration-300`}
    >
      <h2 className="text-2xl font-bold text-white mb-6">7-Day Forecast</h2>
      
      <div className="space-y-3">
        {dailyForecasts.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 10 }}
            className={`${cardClass} rounded-2xl p-4 flex items-center justify-between 
              hover:shadow-glow transition-all duration-300`}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="text-white font-medium w-32">
                {formatDay(day.date)}
              </div>
              
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {getWeatherIcon(day.weather.main, false, 40)}
              </motion.div>
              
              <div className="text-gray-300 capitalize hidden md:block flex-1">
                {day.weather.description}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {day.maxTemp}°
                </div>
                <div className="text-sm text-gray-400">
                  {day.minTemp}°
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeeklyForecast;