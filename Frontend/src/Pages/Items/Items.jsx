import React, { useEffect, useState } from 'react'

// Material Ui IconButton and other components for responsive design
import { Divider, FormControl, IconButton, InputLabel, MenuItem, Select, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme } from '@mui/material';

// Material ui icons for filter and search
import { FilterAlt, Search } from '@mui/icons-material';

import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import FilterSection from './FilterSection';
import ItemCard from './ItemCard';

const Items = () => {

    const [alignment, setAlignment] = useState('restaurants');  //Initial state of toggle button group
    const [places, setPlaces] = useState([]); //State to hold the fetched places
    const [searchParams] = useSearchParams(); // This will allow us to read the URL query parameters
    const locality = searchParams.get('locality'); //Used to get value from the locality query parameter in the URL
    const line = "Restaurants 🍽️ nearby your searched location📍";
    const onNullMessage = "No restaurants yet — be the first to explore!";

    useEffect(() => {
        const fetchRestaurants = async () => {
            if (!locality) return;

            try {
                const res = await axios.get('http://localhost:3000/restaurants?locality=' + locality);
                setPlaces(res.data);
            } catch (err) {
                console.error(err);
                setPlaces([]);
            }
        };
        fetchRestaurants();
    }, [locality]);

    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"));  // Check if the screen size is large

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    }

    return (
        <div className='-z-10 mt-10'>
            {
                (places.length == 0 && searchParams.size == 0) ? <div className='message-div p-5'><h1 className='message'>Yet not product exists with this category</h1></div> :
                    <div>
                        <h1 className='text-3xl text-center font-extrabold text-[var(--primary-color)] pb-5 px-9 uppercase space-x-2'>
                        </h1>
                        <div className='lg:flex'>
                            <section className='filter_section hidden lg:block w-[25%]'>
                                <FilterSection />
                            </section>
                            <div className='w-full lg:w-[80%] space-y-3'>
                                <div className='flex justify-between pr-4'>
                                    <div className="relative w-[50%]">
                                        {
                                            !isLarge && (<IconButton onClick={() => setFilterDrawer(!filterDrawer)}><FilterAlt /></IconButton>)
                                        }
                                    </div>
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
                                <Divider />
                                {(places.length > 0) ? <section className='products_section grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center'>
                                    {
                                        Array.isArray(places) && places.map((items) => <ItemCard item={items} />)
                                    }
                                </section> : <div className='message-div'><h1 className='message'>No item exist with this filter</h1></div>}

                                {/* Pagination */}
                                <div className='flex justify-center pt-4 pb-10'>
                                    {/* <Stack spacing={2} >
                                        <Pagination
                                            count={product.totalPages}
                                            page={page}
                                            onChange={(event, value) => {
                                                console.log("Page Selected ", value);
                                                setPage(value);
                                            }}
                                            renderItem={(item) => (
                                                <PaginationItem
                                                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                                    {...item}
                                                />
                                            )}
                                        />
                                    </Stack> */}
                                </div>
                            </div>
                        </div>

                    </div>
            }

        </div>
    )
}

export default Items
