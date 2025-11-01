import { 
  Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, 
  CloudLightning, Wind, CloudFog, Moon, CloudMoon 
} from 'lucide-react';

export const getWeatherIcon = (condition, isNight = false, size = 64) => {
  const iconMap = {
    'clear': isNight ? <Moon size={size} className="text-blue-200" /> : <Sun size={size} className="text-yellow-400" />,
    'clouds': isNight ? <CloudMoon size={size} className="text-gray-300" /> : <Cloud size={size} className="text-gray-400" />,
    'rain': <CloudRain size={size} className="text-blue-400" />,
    'drizzle': <CloudDrizzle size={size} className="text-blue-300" />,
    'thunderstorm': <CloudLightning size={size} className="text-purple-400" />,
    'snow': <CloudSnow size={size} className="text-blue-100" />,
    'mist': <CloudFog size={size} className="text-gray-400" />,
    'fog': <CloudFog size={size} className="text-gray-400" />,
    'haze': <CloudFog size={size} className="text-yellow-300" />,
  };

  const key = condition.toLowerCase();
  return iconMap[key] || <Cloud size={size} className="text-gray-400" />;
};

export const getAnimatedWeatherIcon = (condition) => {
  const animations = {
    'clear': 'animate-spin-slow',
    'rain': 'animate-bounce',
    'snow': 'animate-pulse',
    'thunderstorm': 'animate-pulse',
    'clouds': 'animate-float',
  };
  
  return animations[condition.toLowerCase()] || '';
};