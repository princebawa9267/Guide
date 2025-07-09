import React, { useEffect, useState } from 'react'
import { Box, Divider, Fab, FormControl, Icon, IconButton, Rating, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FilterAlt, Star, Close } from '@mui/icons-material';

import { useSearchParams } from 'react-router-dom';

import { fetchRestaurant } from '../../state/restaurants/restaurantSlice';
import { useAppDispatch, useAppSelector } from '../../state/store';

import ItemCard from './ItemCard';

import { HashLoader } from 'react-spinners';




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
        <Fab color="primary" aria-label="add" className='transform transition-transform duration-200 ease-out scale-100' onClick={() => setOpenFilter(!openFilter)} >
          {
            openFilter ? <Close className='text-white ' /> : <FilterAlt className='text-white' />
          }
        </Fab>
      </div>


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

      {/* <Divider /> */}
      <div className="mt-5 overflow-y-auto max-h-[82vh] border-t-1">
        <div>
          <span style={{ display: restaurant?.loading ? 'flex' : 'none' }} className=" fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-white z-50">
            {
              restaurant?.loading && <HashLoader size={150} />
            }
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">

            {
              !restaurant?.loading && (restaurant?.restaurants?.length > 0 ? restaurant.restaurants.map((place, index) =>
                <ItemCard key={index} place={place} />) : "no places found")
            }

            {/* <div className='flex shadow-2xl flex-col w-[100%] h-[100%]  justify-center relative group cursor-pointer bg-white rounded-2xl text-black' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className=" overflow-hidden relative w-[100%] h-[250px]  rounded-lg shadow-md">
                {
                  foodImage.map((item, index) => <img key={index} style={{ transform: `translateX(${(index - currentImage) * 100}%)` }} className='transition-all duration-300 ease-in-out absolute top-0 left-0 w-[100vw] h-[100%] cursor-pointer object-cover' src={item} alt="" />)
                }
              </div>
              <div className='p-2'>
                <h2 className="text-xl font-bold">Lucky Juice corner</h2>
                <p className="text-gray-600">Professor Colony</p>
                <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
            </div>


            <div className='flex bg-white shadow-2xl flex-col w-[100%] h-[100%]  justify-center relative group cursor-pointer rounded-2xl text-black' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className=" overflow-hidden relative w-[100%] h-[250px]  rounded-lg shadow-md">
                {
                  foodImage.map((item, index) => <img key={index} style={{ transform: `translateX(${(index - currentImage) * 100}%)` }} className='transition-all duration-300 ease-in-out absolute top-0 left-0 w-[100vw] h-[100%] cursor-pointer object-cover' src={item} alt="" />)
                }
              </div>
              <div className='p-2'>
                <h2 className="text-xl font-bold">Lucky Juice corner</h2>
                <p className="text-gray-600">Professor Colony</p>
                <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
            </div>


            <div className='flex shadow-2xl flex-col w-[100%] h-[100%]  justify-center relative group cursor-pointer bg-white rounded-2xl text-black' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className=" overflow-hidden relative w-[100%] h-[250px]  rounded-lg shadow-md">
                {
                  foodImage.map((item, index) => <img key={index} style={{ transform: `translateX(${(index - currentImage) * 100}%)` }} className='transition-all duration-300 ease-in-out absolute top-0 left-0 w-[100vw] h-[100%] cursor-pointer object-cover' src={item} alt="" />)
                }
              </div>
              <div className='p-2'>
                <h2 className="text-xl font-bold">Lucky Juice corner</h2>
                <p className="text-gray-600">Professor Colony</p>
                <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
            </div>


            <div className='flex shadow-2xl flex-col w-[100%] h-[100%]  justify-center relative group cursor-pointer bg-white rounded-2xl text-black' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className=" overflow-hidden relative w-[100%] h-[250px]  rounded-lg shadow-md">
                {
                  foodImage.map((item, index) => <img key={index} style={{ transform: `translateX(${(index - currentImage) * 100}%)` }} className='transition-all duration-300 ease-in-out absolute top-0 left-0 w-[100vw] h-[100%] cursor-pointer object-cover' src={item} alt="" />)
                }
              </div>
              <div className='p-2'>
                <h2 className="text-xl font-bold">Lucky Juice corner</h2>
                <p className="text-gray-600">Professor Colony</p>
                <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
            </div>

            <div className='flex shadow-2xl flex-col w-[100%] h-[100%]  justify-center relative group cursor-pointer bg-white rounded-2xl text-black' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className=" overflow-hidden relative w-[100%] h-[250px]  rounded-lg shadow-md">
                {
                  foodImage.map((item, index) => <img key={index} style={{ transform: `translateX(${(index - currentImage) * 100}%)` }} className='transition-all duration-300 ease-in-out absolute top-0 left-0 w-[100vw] h-[100%] cursor-pointer object-cover' src={item} alt="" />)
                }
              </div>
              <div className='p-2'>
                <h2 className="text-xl font-bold">Lucky Juice corner</h2>
                <p className="text-gray-600">Professor Colony</p>
                <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
            </div>


            <div className='flex bg-white shadow-2xl flex-col w-[100%] h-[100%]  justify-center relative group cursor-pointer rounded-2xl text-black' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className=" overflow-hidden relative w-[100%] h-[250px]  rounded-lg shadow-md">
                {
                  foodImage.map((item, index) => <img key={index} style={{ transform: `translateX(${(index - currentImage) * 100}%)` }} className='transition-all duration-300 ease-in-out absolute top-0 left-0 w-[100vw] h-[100%] cursor-pointer object-cover' src={item} alt="" />)
                }
              </div>
              <div className='p-2'>
                <h2 className="text-xl font-bold">Lucky Juice corner</h2>
                <p className="text-gray-600">Professor Colony</p>
                <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
            </div>


            <div className='flex shadow-2xl flex-col w-[100%] h-[100%]  justify-center relative group cursor-pointer bg-white rounded-2xl text-black' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className=" overflow-hidden relative w-[100%] h-[250px]  rounded-lg shadow-md">
                {
                  foodImage.map((item, index) => <img key={index} style={{ transform: `translateX(${(index - currentImage) * 100}%)` }} className='transition-all duration-300 ease-in-out absolute top-0 left-0 w-[100vw] h-[100%] cursor-pointer object-cover' src={item} alt="" />)
                }
              </div>
              <div className='p-2'>
                <h2 className="text-xl font-bold">Lucky Juice corner</h2>
                <p className="text-gray-600">Professor Colony</p>
                <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
            </div>


            <div className='flex shadow-2xl flex-col w-[100%] h-[100%]  justify-center relative group cursor-pointer bg-white rounded-2xl text-black' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className=" overflow-hidden relative w-[100%] h-[250px]  rounded-lg shadow-md">
                {
                  foodImage.map((item, index) => <img key={index} style={{ transform: `translateX(${(index - currentImage) * 100}%)` }} className='transition-all duration-300 ease-in-out absolute top-0 left-0 w-[100vw] h-[100%] cursor-pointer object-cover' src={item} alt="" />)
                }
              </div>
              <div className='p-2'>
                <h2 className="text-xl font-bold">Lucky Juice corner</h2>
                <p className="text-gray-600">Professor Colony</p>
                <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
            </div>

            <div className='flex shadow-2xl flex-col w-[100%] h-[100%]  justify-center relative group cursor-pointer bg-white rounded-2xl text-black' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className=" overflow-hidden relative w-[100%] h-[250px]  rounded-lg shadow-md">
                {
                  foodImage.map((item, index) => <img key={index} style={{ transform: `translateX(${(index - currentImage) * 100}%)` }} className='transition-all duration-300 ease-in-out absolute top-0 left-0 w-[100vw] h-[100%] cursor-pointer object-cover' src={item} alt="" />)
                }
              </div>
              <div className='p-2'>
                <h2 className="text-xl font-bold">Lucky Juice corner</h2>
                <p className="text-gray-600">Professor Colony</p>
                <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
            </div>


            <div className='flex bg-white shadow-2xl flex-col w-[100%] h-[100%]  justify-center relative group cursor-pointer rounded-2xl text-black' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className=" overflow-hidden relative w-[100%] h-[250px]  rounded-lg shadow-md">
                {
                  foodImage.map((item, index) => <img key={index} style={{ transform: `translateX(${(index - currentImage) * 100}%)` }} className='transition-all duration-300 ease-in-out absolute top-0 left-0 w-[100vw] h-[100%] cursor-pointer object-cover' src={item} alt="" />)
                }
              </div>
              <div className='p-2'>
                <h2 className="text-xl font-bold">Lucky Juice corner</h2>
                <p className="text-gray-600">Professor Colony</p>
                <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
            </div>


            <div className='flex shadow-2xl flex-col w-[100%] h-[100%]  justify-center relative group cursor-pointer bg-white rounded-2xl text-black' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className=" overflow-hidden relative w-[100%] h-[250px]  rounded-lg shadow-md">
                {
                  foodImage.map((item, index) => <img key={index} style={{ transform: `translateX(${(index - currentImage) * 100}%)` }} className='transition-all duration-300 ease-in-out absolute top-0 left-0 w-[100vw] h-[100%] cursor-pointer object-cover' src={item} alt="" />)
                }
              </div>
              <div className='p-2'>
                <h2 className="text-xl font-bold">Lucky Juice corner</h2>
                <p className="text-gray-600">Professor Colony</p>
                <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
            </div>


            <div className='flex shadow-2xl flex-col w-[100%] h-[100%]  justify-center relative group cursor-pointer bg-white rounded-2xl text-black' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <div className=" overflow-hidden relative w-[100%] h-[250px]  rounded-lg shadow-md">
                {
                  foodImage.map((item, index) => <img key={index} style={{ transform: `translateX(${(index - currentImage) * 100}%)` }} className='transition-all duration-300 ease-in-out absolute top-0 left-0 w-[100vw] h-[100%] cursor-pointer object-cover' src={item} alt="" />)
                }
              </div>
              <div className='p-2'>
                <h2 className="text-xl font-bold">Lucky Juice corner</h2>
                <p className="text-gray-600">Professor Colony</p>
                <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
            </div> */}


          </div>
        </div>
      </div>

    </div>
  )
}

export default ItemLister
