import React, { useEffect, useState } from 'react'
import { Box, Divider, Fab, FormControl, Icon, IconButton, Rating, ToggleButton, toggleButtonClasses, ToggleButtonGroup, toggleButtonGroupClasses } from '@mui/material'
import { FilterAlt, Star, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { useSearchParams } from 'react-router-dom';

import { fetchRestaurant } from '../../state/restaurants/restaurantSlice';
import { useAppDispatch, useAppSelector } from '../../state/store';

import ItemCard from './ItemCard';

import { HashLoader } from 'react-spinners';




const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
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
  const [places, setPlaces] = useState([]); // State to hold restaurant data
  const [searchParams] = useSearchParams();
  const locality = searchParams.get('locality'); // Get ?locality=XYZ from URL

  useEffect(() => {
    dispatch(fetchRestaurant({ locality: locality }));
  }, [locality]);

  const [alignment, setAlignment] = useState('restaurants');  //Initial state of toggle button group

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  }

  return (
    <div className='flex relative min-h-[100vh] flex-col'>

      {
        console.log("My restaurants ", restaurant)
      }
      {/* Filter icon */}
      <div className='flex flex-col space-y-2 items-end absolute bottom-5 right-5 z-10'>
        {
          openFilter && <Box className='flex flex-col space-y-2 bg-white shadow-lg rounded-lg p-4'>
            <h2 className='text-lg font-semibold mb-0'>Filter Options</h2>
            <p className='text-sm text-gray-600'>Select your preferences to filter the items.</p>
            <h4 className='font-bold'>Cleanliness : </h4>
            <h4 className='font-bold'>Price : </h4>
          </Box>
        }
        {/* <FilterCard/> */}
        <Fab  aria-label="add" className='bg-[#8a3ab9] transform transition-transform duration-200 ease-out scale-100' onClick={() => setOpenFilter(!openFilter)} >
          {
            openFilter ? <Close className='text-white ' /> : <FilterAlt className='text-white' />
          }
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
          >
            <ToggleButton value="restaurants">Restaurants</ToggleButton>
            <ToggleButton value="parks">Parks</ToggleButton>
            <ToggleButton value="hotels">Hotels</ToggleButton>
            <ToggleButton value="vendors">Vendors</ToggleButton>
          </StyledToggleButtonGroup>
        </FormControl>
      </div>

       <span style={{ display: restaurant?.loading ? 'flex' : 'none' }} className="flex justify-center items-center bg-white z-50">
            {
               <HashLoader size={120} loading={restaurant?.loading} color='#8a3ab9'/>
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
        ) : (
          <div className='flex justify-center items-center h-[50vh]'>
            <h2 className='text-xl font-semibold text-gray-600'>No items found in this locality.</h2>
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
              !restaurant?.loading && (restaurant?.restaurants?.length > 0 ? restaurant.restaurants.map((place, index) =>
                <ItemCard key={index} place={place} />) : "no places found")
            }

          </div>
        </div>
      </div> */}

    </div>
  )
}

export default ItemLister
