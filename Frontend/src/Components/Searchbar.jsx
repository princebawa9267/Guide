import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../src/register.js';

const Searchbar = () => {
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [allLocalities, setAllLocalities] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'restaurants'));
      const localitySet = new Set();
      const citySet = new Set();

      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.locality) {
          localitySet.add(data.locality.toLowerCase());
        }
        if (data.city) {
          citySet.add(data.city.toLowerCase());
        }
      });

      setAllLocalities([...localitySet]);
      setAllCities([...citySet]);
    };

    fetchData();
  }, []);

  const handleLocalityInput = (e) => {
    const value = e.target.value;
    setLocality(value);

    if (value.trim() === '') {
      setSuggestions([]);
    } else {
      const filtered = allLocalities.filter(loc =>
        loc.startsWith(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }
  };

  const handleCityInput = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.trim() === '') {
      setCitySuggestions([]);
    } else {
      const filtered = allCities.filter(c =>
        c.startsWith(value.toLowerCase())
      );
      setCitySuggestions(filtered.slice(0, 5));
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocality(suggestion);
    setSuggestions([]);
  };

  const handleCitySuggestionClick = (suggestion) => {
    setCity(suggestion);
    setCitySuggestions([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (locality.trim()) params.append('locality', locality.trim().toLowerCase());
    if (city.trim()) params.append('city', city.trim().toLowerCase());

    if (params.toString()) {
      navigate(`/searched-location?${params.toString()}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className="w-screen flex flex-col items-center gap-4 relative">
        {/* Locality input */}
        <div className="relative w-1/2">
          <input
            type="text"
            className="w-full shadow-xl p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-4xl bg-[#e3d3fa] focus:ring-white focus:border-white"
            placeholder="Search by locality..."
            value={locality}
            onChange={handleLocalityInput}
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md max-h-48 overflow-y-auto shadow-md">
              {suggestions.map((sugg, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSuggestionClick(sugg)}
                  className="p-2 hover:bg-gray-200 cursor-pointer capitalize"
                >
                  {sugg}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* City input */}
        <div className="relative w-1/2">
          <input
            type="text"
            className="w-full shadow-xl p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-4xl bg-[#e3d3fa] focus:ring-white focus:border-white"
            placeholder="Search by city..."
            value={city}
            onChange={handleCityInput}
            autoComplete="off"
          />
          {citySuggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md max-h-48 overflow-y-auto shadow-md">
              {citySuggestions.map((sugg, idx) => (
                <li
                  key={idx}
                  onClick={() => handleCitySuggestionClick(sugg)}
                  className="p-2 hover:bg-gray-200 cursor-pointer capitalize"
                >
                  {sugg}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>

      <div className="w-screen flex justify-center mt-3">
        <button
          type="submit"
          onClick={handleSearch}
          className="text-white cursor-pointer shadow-xl bg-[#8a3ab9] px-8 py-3 rounded-3xl transform hover:scale-105 flex items-center gap-2"
        >
          Search <CiSearch />
        </button>
      </div>
    </>
  );
};

export default Searchbar;
