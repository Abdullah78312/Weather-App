import { Droplets, Wind, Eye, Gauge, Thermometer, ArrowUpDown } from 'lucide-react';

const WeatherDetails = ({ weather }) => {
  const details = [
    { icon: Droplets, label: 'Humidity', value: `${weather.main.humidity}%`, color: 'from-blue-400 to-cyan-400' },
    { icon: Wind, label: 'Wind', value: `${weather.wind.speed} m/s`, color: 'from-teal-400 to-emerald-400' },
    { icon: Eye, label: 'Visibility', value: `${(weather.visibility / 1000).toFixed(1)} km`, color: 'from-purple-400 to-pink-400' },
    { icon: Gauge, label: 'Pressure', value: `${weather.main.pressure} hPa`, color: 'from-indigo-400 to-blue-400' },
    { icon: Thermometer, label: 'Feels Like', value: `${Math.round(weather.main.feels_like)}°`, color: 'from-orange-400 to-red-400' },
    { icon: ArrowUpDown, label: 'Min/Max', value: `${Math.round(weather.main.temp_min)}°/${Math.round(weather.main.temp_max)}°`, color: 'from-green-400 to-lime-400' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {details.map((item) => (
        <div
          key={item.label}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${item.color}`}>
              <item.icon size={18} className="text-white" />
            </div>
            <span className="text-white/70 text-xs sm:text-sm font-medium">{item.label}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;