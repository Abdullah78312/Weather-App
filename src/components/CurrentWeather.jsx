import { getWeatherIcon } from '../utils/weatherIcons';
import { MapPin, Calendar, Clock } from 'lucide-react';

const CurrentWeather = ({ weather }) => {
  const isNight = () => new Date().getHours() >= 18 || new Date().getHours() < 6;

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <MapPin className="text-white flex-shrink-0" size={20} />
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white truncate">
          {weather.name}, {weather.sys.country}
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex-shrink-0">
            {getWeatherIcon(weather.weather[0].main, isNight(), 80)}
          </div>
          
          <div>
            <div className="text-6xl sm:text-7xl lg:text-8xl font-black text-white">
              {Math.round(weather.main.temp)}°
            </div>
            <p className="text-lg sm:text-xl text-white/80 capitalize mt-2">
              {weather.weather[0].description}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-white/70 text-sm sm:text-base w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;