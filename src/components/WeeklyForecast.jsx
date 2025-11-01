import { getWeatherIcon } from '../utils/weatherIcons';

const WeeklyForecast = ({ forecast }) => {
  const getDailyData = () => {
    const daily = {};
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!daily[date]) {
        daily[date] = { temps: [], weather: item.weather[0], dt: item.dt };
      }
      daily[date].temps.push(item.main.temp);
    });

    return Object.entries(daily).slice(0, 7).map(([date, data]) => ({
      date,
      min: Math.round(Math.min(...data.temps)),
      max: Math.round(Math.max(...data.temps)),
      weather: data.weather
    }));
  };

  const formatDay = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date().toDateString();
    const tomorrow = new Date(Date.now() + 86400000).toDateString();
    
    if (dateStr === today) return 'Today';
    if (dateStr === tomorrow) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const dailyData = getDailyData();

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">7-Day Forecast</h3>
      <div className="space-y-2 sm:space-y-3">
        {dailyData.map((day) => (
          <div
            key={day.date}
            className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <span className="text-white font-semibold text-sm sm:text-base w-20 sm:w-28 flex-shrink-0">{formatDay(day.date)}</span>
              <div className="flex-shrink-0">
                {getWeatherIcon(day.weather.main, false, 32)}
              </div>
              <span className="text-white/70 capitalize text-xs sm:text-sm truncate flex-1">{day.weather.description}</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold text-white">{day.max}°</div>
                <div className="text-[10px] sm:text-xs text-white/50">High</div>
              </div>
              <div className="text-center">
                <div className="text-base sm:text-lg font-semibold text-white/70">{day.min}°</div>
                <div className="text-[10px] sm:text-xs text-white/50">Low</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;