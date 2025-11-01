import { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

const SearchBar = ({ onSearch, onGetLocation, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
      <div className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl p-1 flex items-center">
        <Search className="text-white/70 ml-3 mr-2 flex-shrink-0" size={18} />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
          disabled={isLoading}
          className="flex-1 bg-transparent text-white placeholder-white/50 outline-none px-2 py-2.5 sm:py-3 text-sm sm:text-base"
        />
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !city.trim()}
        className="bg-white text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold disabled:opacity-50 flex items-center justify-center"
      >
        {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
      </button>

      <button
        type="button"
        onClick={onGetLocation}
        disabled={isLoading}
        className="bg-white/10 backdrop-blur-lg border border-white/20 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-white disabled:opacity-50"
      >
        <MapPin size={18} />
      </button>
    </form>
  );
};

export default SearchBar;