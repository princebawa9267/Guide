import React, { useEffect, useState } from 'react'
import { Box, Divider, Fab, FormControl, Icon, IconButton, Rating, ToggleButton, toggleButtonClasses, ToggleButtonGroup, toggleButtonGroupClasses } from '@mui/material';
import { FilterAlt, Star, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import thinkingImg from '/src/assets/Thinking face-rafiki.png';


import { useSearchParams } from 'react-router-dom';

import { fetchRestaurant } from '../../state/restaurants/restaurantSlice';
import { useAppDispatch, useAppSelector } from '../../state/store';

import ItemCard from './ItemCard';
import { HashLoader } from 'react-spinners';




const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  // backgroundColor: '#8a3ab9', // Base color
  color: 'white',
  gap: '2rem',
  [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}`]:
  {
    borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
    borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
  },
  [`& .${toggleButtonGroupClasses.lastButton}, & .${toggleButtonGroupClasses.middleButton}`]:
  {
    borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
    borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
    borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
  },
  [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled}, & .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
  {
    borderLeft: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
  },
}));




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
        {/* <FilterCard/> */}
        <Fab
          aria-label="add"
          className={`bg-[#8a3ab9] text-white transform transition-transform duration-200 ease-out scale-100 
        ${openFilter ? 'bg-[#e5dcf8] hover:bg-[#9b4ec3]' : 'hover:bg-[#6a2992]'} 
        hover:scale-110`} // Hover effects
          onClick={() => setOpenFilter(!openFilter)}
        >
          {openFilter ? <Close className='text-white' /> : <FilterAlt className='text-white' />}
        </Fab>
      </div>


      <div className='flex justify-evenly items-center space-y-2.5 gap-2 mt-10 mr-2'>
        <FormControl size='small'>
          <StyledToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="items"
            className='text-[#8a3ab9]'
          >
            <ToggleButton value="restaurants" sx={{
              '&:hover': { backgroundColor: '#e5dcf8' }, '&.Mui-selected': {
                backgroundColor: '#e5dcf8', // Active (selected) color
                color: '#8a3ab9', // Text color when active
                '&.Mui-selected:hover': {
                  backgroundColor: '#e5dcf8', // Keep active color even on hover
                  color: '#8a3ab9',
                },
              },
            }}>Restaurants</ToggleButton>
            <ToggleButton value="parks" sx={{
              '&:hover': { backgroundColor: '#e5dcf8' }, '&.Mui-selected': {
                backgroundColor: '#e5dcf8', // Active (selected) color
                color: '#8a3ab9', // Text color when active
                '&.Mui-selected:hover': {
                  backgroundColor: '#e5dcf8', // Keep active color even on hover
                  color: '#8a3ab9',
                },
              },
            }}>Parks</ToggleButton>
            <ToggleButton value="hotels" sx={{
              '&:hover': { backgroundColor: '#e5dcf8' }, '&.Mui-selected': {
                backgroundColor: '#e5dcf8', // Active (selected) color
                color: '#8a3ab9', // Text color when active
                '&.Mui-selected:hover': {
                  backgroundColor: '#e5dcf8', // Keep active color even on hover
                  color: '#8a3ab9',
                },
              },
            }}>Hotels</ToggleButton>
            <ToggleButton value="vendors" sx={{
              '&:hover': { backgroundColor: '#e5dcf8' }, '&.Mui-selected': {
                backgroundColor: '#e5dcf8', // Active (selected) color
                color: '#8a3ab9', // Text color when active
                '&.Mui-selected:hover': {
                  backgroundColor: '#e5dcf8', // Keep active color even on hover
                  color: '#8a3ab9',
                },
              },
            }}>Vendors</ToggleButton>
          </StyledToggleButtonGroup>
        </FormControl>
      </div>

      <span style={{ display: restaurant?.loading ? 'flex' : 'none' }} className="flex justify-center items-center bg-white z-50">
        {
          <HashLoader size={120} loading={restaurant?.loading} color='#8a3ab9' />
        }
      </span>

      {/* <Divider /> */}
      {
        restaurant?.restaurants?.length > 0 ? (
          <div className='w-[90vw] max-w-6xl h-auto rounded-3xl nunito mx-auto  mb-10 cursor-pointer p-6'>
            <div className="h-1 w-full bg-[#8a3ab9] rounded-full mb-4"></div>
            <div className="w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
              {
                restaurant?.restaurants?.map((place, index) => (
                  <div key={place.restaurant_id} className='transition-transform-duration-300 hover:scale-[1.02]' >
                    <ItemCard key={index} place={place} />
                  </div>
                ))
              }

            </div>
          </div>
        ) : !restaurant?.loading && (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center text-[#8a3ab9]">
            <img
              src={thinkingImg}
              alt="No reviews yet"
              className="h-[40%] opacity-80 mb-4"
            />
            <p className="text-lg font-semibold">Not any restaurant existed yet</p>
          </div>
        )
      }



      {/* <div className="mt-5 overflow-y-auto max-h-[82vh] border-t-1">
        <div className="text-[#29264A] text-2xl md:text-3xl font-bold text-center mb-2">
          Restaurants 🍽️ nearby your searched location📍
        </div>
        <div>

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
      </div> */}

    </div>
  );
};

export default ItemLister;
