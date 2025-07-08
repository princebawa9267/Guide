import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; //navigate use to navigate to the another page
import { CiSearch } from "react-icons/ci";
import { collection, getDocs } from 'firebase/firestore';//importing firebase methods to read data of db
import { db } from '../../src/register.js';//importing database from the regiter page where the firebase is registered

const Searchbar = () => {
  const [locality, setLocality] = useState('');
  const [suggestions, setSuggestions] = useState([]);//Stores suggested localities matching user input for autocomplete.
  const [allLocalities, setAllLocalities] = useState([]);//Stores all unique localities fetched from Firebase to filter for suggestions.
  const navigate = useNavigate();//Initializes navigation function to redirect the user to the search results page.

  useEffect(() => {
    const fetchLocalities = async () => {  //function use to fetch data from database
      const snapshot = await getDocs(collection(db, 'restaurants'));
      const unique = new Set();//Creates a Set to store unique localities (removes duplicates).
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.locality) {
          unique.add(data.locality.toLowerCase());//Extracts locality and stores it in lowercase inside the Set.
        }
      });
      setAllLocalities([...unique]);//Converts the Set into an array and saves it in state.
    };

    fetchLocalities();
  }, []);

  const handleInput = (e) => {
    const value = e.target.value;
    setLocality(value);

    if (value.length === 0) {
      setSuggestions([]);//If input is empty, clear suggestions.
    } else {
      //Filters matching localities from allLocalities using lowercase match.
      //Shows only the top 5 suggestions.
      const filtered = allLocalities.filter(loc =>
        loc.startsWith(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocality(suggestion);
    setSuggestions([]);
    //When a suggestion is clicked, it fills the input box with that value and hides the list.
  };

  const handleSearch = (e) => {
  // Without e.preventDefault(), when you submit the form (by pressing Enter or clicking the submit button), the browser would:
  // Refresh the page
  // Lose React state
  // Possibly break the SPA (Single Page Application) flow
    e.preventDefault();
    if (locality.trim()) { // we use trim bcz A user doesn't accidentally search with only spaces (e.g., " ")
      navigate(`/searched-location?locality=${encodeURIComponent(locality)}`);//going to the next page with the selected locality as a URL query parameter.
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className="w-screen flex justify-center relative">
        <div className="relative w-1/2">
          <input
            type="text"
            className="w-full shadow-xl p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-4xl bg-[#e3d3fa] focus:ring-white focus:border-white"
            placeholder="Search by locality..."
            value={locality}
            onChange={handleInput}
            autoComplete="off"
          />

          {/* Autocomplete Dropdown */}
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
      </form>

      <div className='w-screen flex justify-center mt-3'>
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
