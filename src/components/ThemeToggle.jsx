import { Sparkles, Waves, Sun, Trees } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'midnight', icon: Sparkles, color: 'from-purple-500 to-indigo-600' },
    { id: 'ocean', icon: Waves, color: 'from-blue-500 to-cyan-500' },
    { id: 'sunset', icon: Sun, color: 'from-orange-500 to-pink-500' },
    { id: 'forest', icon: Trees, color: 'from-emerald-500 to-teal-500' }
  ];

  return (
    <div className="flex gap-2">
      {themes.map((t) => {
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center transition-all ${
              theme === t.id
                ? `bg-gradient-to-br ${t.color}`
                : 'bg-white/10 border border-white/20'
            }`}
          >
            <Icon size={18} className="text-white" />
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;