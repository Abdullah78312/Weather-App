import { motion } from 'framer-motion';
import { getWeatherIcon } from '../utils/weatherIcons';

const TodayForecast = ({ forecast }) => {
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

  const todayForecasts = forecast.list.slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6 lg:p-8 shadow-2xl"
    >
      <h2 className="text-3xl font-bold text-white mb-6">Today's Forecast</h2>
      
      <div className="overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex gap-4 min-w-max">
          {todayForecasts.map((item, index) => (
            <motion.div
              key={item.dt}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              // whileHover={{ scale: 1.08, y: -10 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[160px] flex flex-col items-center gap-4 hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg"
            >
              <div className="text-white font-semibold text-lg">
                {formatTime(item.dt)}
              </div>
              
              <motion.div
                whileHover={{ 
                  rotate: [0, -10, 10, 0],
                  scale: 1.2
                }}
                transition={{ duration: 0.5 }}
              >
                {getWeatherIcon(item.weather[0].main, isNight(item.dt), 56)}
              </motion.div>
              
              <div className="text-3xl font-bold text-white">
                {Math.round(item.main.temp)}°C
              </div>
              
              <div className="text-sm text-white/70 capitalize text-center font-medium">
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