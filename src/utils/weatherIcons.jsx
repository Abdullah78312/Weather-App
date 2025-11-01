import { Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, CloudLightning, CloudFog, Moon, CloudMoon } from 'lucide-react';

export const getWeatherIcon = (condition, isNight = false, size = 64) => {
  const icons = {
    'Clear': isNight ? <Moon size={size} className="text-blue-200" /> : <Sun size={size} className="text-yellow-300" />,
    'Clouds': isNight ? <CloudMoon size={size} className="text-gray-300" /> : <Cloud size={size} className="text-gray-200" />,
    'Rain': <CloudRain size={size} className="text-blue-300" />,
    'Drizzle': <CloudDrizzle size={size} className="text-blue-200" />,
    'Thunderstorm': <CloudLightning size={size} className="text-purple-300" />,
    'Snow': <CloudSnow size={size} className="text-blue-100" />,
    'Mist': <CloudFog size={size} className="text-gray-300" />,
    'Fog': <CloudFog size={size} className="text-gray-300" />,
    'Haze': <CloudFog size={size} className="text-yellow-200" />,
  };

  return icons[condition] || <Cloud size={size} className="text-gray-300" />;
};