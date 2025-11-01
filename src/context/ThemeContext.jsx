import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('weather-theme') || 'glassmorphism';
  });

  useEffect(() => {
    localStorage.setItem('weather-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'glassmorphism' ? 'neumorphism' : 'glassmorphism');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};