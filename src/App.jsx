import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useTheme } from './context/ThemeContext';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import { AlertCircle } from 'lucide-react';

// Lazy load components for better performance
const CurrentWeather = lazy(() => import('./components/CurrentWeather'));
const WeatherDetails = lazy(() => import('./components/WeatherDetails'));
const HourlyForecast = lazy(() => import('./components/HourlyForecast'));
const WeeklyForecast = lazy(() => import('./components/WeeklyForecast'));
const ThemeToggle = lazy(() => import('./components/ThemeToggle'));

function App() {
  const { theme } = useTheme();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('today');

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE;

  const fetchWeatherByCity = async (city) => {
    setIsLoading(true);
    setError(null);
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`),
        axios.get(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`)
      ]);
      setWeather(weatherRes.data);
      setForecast(forecastRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'City not found');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setIsLoading(true);
    setError(null);
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
        axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
      ]);
      setWeather(weatherRes.data);
      setForecast(forecastRes.data);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => fetchWeatherByCoords(position.coords.latitude, position.coords.longitude),
        () => {
          setError('Location access denied');
          setIsLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    fetchWeatherByCity('Lahore');
  }, []);

  const themeConfig = {
    midnight: 'from-slate-900 via-purple-900 to-slate-900',
    ocean: 'from-blue-900 via-blue-600 to-cyan-400',
    sunset: 'from-orange-600 via-rose-500 to-purple-700',
    forest: 'from-emerald-900 via-teal-700 to-cyan-600'
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeConfig[theme]} transition-colors duration-700`}>
      <div className="container mx-auto px-4 py-4 sm:py-6 max-w-7xl">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Weather<span className="text-white/60">Hub</span>
            </h1>
            <p className="text-white/60 text-xs sm:text-sm mt-1">Real-time updates</p>
          </div>
          <Suspense fallback={<div className="w-12 h-12" />}>
            <ThemeToggle />
          </Suspense>
        </header>

        {/* Search */}
        <SearchBar 
          onSearch={fetchWeatherByCity}
          onGetLocation={getUserLocation}
          isLoading={isLoading}
        />

        {/* Error */}
        <AnimatePresence>
          {error && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl p-4 flex items-center gap-3"
            >
              <AlertCircle className="text-red-300 flex-shrink-0" size={20} />
              <p className="text-red-200 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading */}
        {isLoading && <LoadingSpinner />}

        {/* Content */}
        <AnimatePresence mode="wait">
          {!isLoading && weather && forecast && (
            <Suspense fallback={<LoadingSpinner />}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 space-y-4 sm:space-y-6"
              >
                <CurrentWeather weather={weather} />
                <WeatherDetails weather={weather} />

                {/* Toggle */}
                <div className="flex justify-center gap-2 sm:gap-3">
                  {['today', 'week'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all ${
                        viewMode === mode
                          ? 'bg-white text-gray-900'
                          : 'bg-white/10 text-white border border-white/20'
                      }`}
                    >
                      {mode === 'today' ? 'Today' : '7 Days'}
                    </button>
                  ))}
                </div>

                {viewMode === 'today' ? (
                  <HourlyForecast forecast={forecast} />
                ) : (
                  <WeeklyForecast forecast={forecast} />
                )}
              </motion.div>
            </Suspense>
          )}
        </AnimatePresence>

        {/* Footer */}
        {weather && (
          <footer className="mt-8 sm:mt-12 pb-4 text-center text-white/40 text-xs sm:text-sm">
            Powered by OpenWeatherMap
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;