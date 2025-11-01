import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useTheme } from './context/ThemeContext';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import TodayForecast from './components/TodayForecast';
import WeeklyForecast from './components/WeeklyForecast';
import ThemeToggle from './components/ThemeToggle';
import LoadingSpinner from './components/LoadingSpinner';
import { CloudOff } from 'lucide-react';

function App() {
  const { theme } = useTheme();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('hourly'); // 'hourly' or 'weekly'

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE;

  // Fetch weather by city name
  const fetchWeatherByCity = async (city) => {
    setIsLoading(true);
    setError(null);

    try {
      const weatherResponse = await axios.get(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'City not found. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    setIsLoading(true);
    setError(null);

    try {
      const weatherResponse = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setError('Unable to retrieve your location. Please search manually.');
          setIsLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  // Load default city on mount
  useEffect(() => {
    fetchWeatherByCity('Lahore');
  }, []);

  // Theme-based background
  const getBackgroundClass = () => {
    if (theme === 'glassmorphism') {
      return 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400';
    }
    return 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900';
  };

  const cardClass = theme === 'glassmorphism' 
    ? 'glass-card' 
    : 'neuro-card-dark';

  return (
    <div className={`min-h-screen ${getBackgroundClass()} transition-all duration-500 relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ bottom: '10%', right: '10%' }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ top: '50%', left: '50%' }}
        />
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            onSearch={fetchWeatherByCity}
            onGetLocation={getUserLocation}
            isLoading={isLoading}
          />
        </div>

        {/* View Mode Toggle */}
        {weather && forecast && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end gap-3 mb-6"
          >
            <motion.button
              onClick={() => setViewMode('hourly')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300
                ${viewMode === 'hourly'
                  ? 'bg-blue-500 text-white shadow-glow'
                  : `${cardClass} text-gray-300`
                }`}
            >
              Hourly
            </motion.button>
            <motion.button
              onClick={() => setViewMode('weekly')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300
                ${viewMode === 'weekly'
                  ? 'bg-blue-500 text-white shadow-glow'
                  : `${cardClass} text-gray-300`
                }`}
            >
              Weekly
            </motion.button>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingSpinner />}

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`${cardClass} rounded-2xl p-6 mb-6 flex items-center gap-4`}
            >
              <CloudOff className="text-red-400" size={24} />
              <div>
                <p className="text-red-400 font-medium">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weather Content */}
        <AnimatePresence mode="wait">
          {!isLoading && weather && forecast && (
            <motion.div
              key="weather-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Current Weather */}
              <CurrentWeather weather={weather} />

              {/* Weather Details Grid */}
              <WeatherDetails weather={weather} />

              {/* Forecast Section */}
              {viewMode === 'hourly' ? (
                <TodayForecast forecast={forecast} />
              ) : (
                <WeeklyForecast forecast={forecast} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-white/60 text-sm">
            Weather data provided by OpenWeatherMap API
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;