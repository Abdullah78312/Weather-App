import { getWeatherIcon } from '../utils/weatherIcons';

const HourlyForecast = ({ forecast }) => {
  const hourly = forecast.list.slice(0, 8);

  const formatTime = (dt) => {
    return new Date(dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  const isNight = (dt) => {
    const hour = new Date(dt * 1000).getHours();
    return hour >= 18 || hour < 6;
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Hourly Forecast</h3>
      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 pb-2">
        <div className="flex gap-3 sm:gap-4 min-w-max sm:grid sm:grid-cols-4 lg:grid-cols-8 sm:min-w-0">
          {hourly.map((item) => (
            <div
              key={item.dt}
              className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center min-w-[110px] sm:min-w-0"
            >
              <p className="text-white/70 text-xs sm:text-sm font-medium mb-2">{formatTime(item.dt)}</p>
              <div className="my-3 flex justify-center">
                {getWeatherIcon(item.weather[0].main, isNight(item.dt), 36)}
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white mb-1">{Math.round(item.main.temp)}°</p>
              <p className="text-white/60 text-xs capitalize">{item.weather[0].description.split(' ')[0]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;