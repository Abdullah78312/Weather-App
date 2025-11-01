import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  Droplets, Wind, Eye, Gauge, 
  Thermometer, ArrowUpDown 
} from 'lucide-react';

const WeatherDetails = ({ weather }) => {
  const { theme } = useTheme();

  const cardClass = theme === 'glassmorphism' 
    ? 'glass-card' 
    : 'neuro-card-dark';

  const details = [
    {
      icon: <Droplets size={24} className="text-blue-400" />,
      label: 'Humidity',
      value: `${weather.main.humidity}%`
    },
    {
      icon: <Wind size={24} className="text-cyan-400" />,
      label: 'Wind Speed',
      value: `${weather.wind.speed} m/s`
    },
    {
      icon: <Eye size={24} className="text-purple-400" />,
      label: 'Visibility',
      value: `${(weather.visibility / 1000).toFixed(1)} km`
    },
    {
      icon: <Gauge size={24} className="text-pink-400" />,
      label: 'Pressure',
      value: `${weather.main.pressure} hPa`
    },
    {
      icon: <Thermometer size={24} className="text-orange-400" />,
      label: 'Feels Like',
      value: `${Math.round(weather.main.feels_like)}°C`
    },
    {
      icon: <ArrowUpDown size={24} className="text-green-400" />,
      label: 'Min / Max',
      value: `${Math.round(weather.main.temp_min)}° / ${Math.round(weather.main.temp_max)}°`
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {details.map((detail, index) => (
        <motion.div
          key={detail.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className={`${cardClass} rounded-2xl p-6 transition-all duration-300 hover:shadow-glow`}
        >
          <div className="flex items-center gap-3 mb-3">
            {detail.icon}
            <span className="text-gray-300 text-sm">{detail.label}</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white">
            {detail.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WeatherDetails;