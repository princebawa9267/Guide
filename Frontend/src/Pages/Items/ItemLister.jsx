import React, { useEffect, useState } from 'react';
import {
  Box, Fab, FormControl, ToggleButton, ToggleButtonGroup
} from '@mui/material';
import { FilterAlt, Close } from '@mui/icons-material';

import { useSearchParams } from 'react-router-dom';

import { fetchRestaurant } from '../../state/restaurants/restaurantSlice';
import { useAppDispatch, useAppSelector } from '../../state/store';

import ItemCard from './ItemCard';
import { HashLoader } from 'react-spinners';

const ItemLister = () => {
  const dispatch = useAppDispatch();
  const restaurant = useAppSelector(store => store.restaurant);

  const [openFilter, setOpenFilter] = useState(false);
  const [searchParams] = useSearchParams();
  const locality = searchParams.get('locality');
  const city = searchParams.get('city'); // ✅ Get city from URL

  useEffect(() => {
    const filters = {};
    if (locality) filters.locality = locality.trim().toLowerCase();
    if (city) filters.city = city.trim().toLowerCase(); // ✅ Add city to filters

    dispatch(fetchRestaurant(filters));
  }, [locality, city, dispatch]); // ✅ include city

  const [alignment, setAlignment] = useState('restaurants');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <div className='flex relative min-h-[100vh] flex-col'>

      {/* Debug log */}
      {console.log("Restaurants from API: ", restaurant)}

      {/* Filter icon */}
      <div className='flex flex-col space-y-2 items-end absolute bottom-5 right-5 z-10'>
        {
          openFilter && (
            <Box className='flex flex-col space-y-2 bg-white shadow-lg rounded-lg p-4'>
              <h2 className='text-lg font-semibold mb-0'>Filter Options</h2>
              <p className='text-sm text-gray-600'>Select your preferences to filter the items.</p>
              <h4 className='font-bold'>Cleanliness : </h4>
              <h4 className='font-bold'>Price : </h4>
            </Box>
          )
        }
        <Fab color="primary" onClick={() => setOpenFilter(!openFilter)}>
          {openFilter ? <Close className='text-white' /> : <FilterAlt className='text-white' />}
        </Fab>
      </div>

      {/* Toggle Button */}
      <div className='flex justify-end items-center space-y-2.5 gap-2 mt-10 mr-2'>
        <FormControl size='small'>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="items"
          >
            <ToggleButton value="restaurants">Restaurants</ToggleButton>
            <ToggleButton value="parks">Parks</ToggleButton>
            <ToggleButton value="hotels">Hotels</ToggleButton>
            <ToggleButton value="vendors">Vendors</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
      </div>

      {/* Restaurant Cards */}
      <div className="mt-5 overflow-y-auto max-h-[82vh] border-t-1">
        <div>
          {/* Loading Spinner */}
          {restaurant?.loading && (
            <span className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-white z-50">
              <HashLoader size={120} color="#8a3ab9" />
            </span>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
            {
              !restaurant.loading && restaurant.restaurants.length > 0 ? (
                restaurant.restaurants.map((place, index) => (
                  <ItemCard key={index} place={place} />
                ))
              ) : !restaurant.loading && (
                <p className="text-center text-gray-600 text-lg col-span-full">No places found.</p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemLister;
