import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import Typewriter from '../../Components/typewriter';
import Locations from './Locations';
import Footer from '../../Components/Footer';
import { useSearchParams } from 'react-router-dom';//hook use to read and modify URL query parameters in the browser.

const LocationSearchPage = () => {
  const [searchParams] = useSearchParams();
  const locality = searchParams.get('locality'); // Get ?locality=XYZ from URL
  const city = searchParams.get('city'); // Get ?city=XYZ from URL
  const restaurant_id = searchParams.get('restaurant_id'); // Get ?restaurant_id=XYZ from URL
  const [line, setLine] = useState('');

  
  useEffect(()=>{
    if(city){
      setLine(`Explore the best places in ${city}`);
    }

  },[city])

  useEffect(() => {
    if (locality) {
      setLine(`Your guide to ${locality}`);
    }
  }, [locality]);

  return (
    <div>
      <div className="">
        {/* div contain design */}
        <div className='relative h-[60vh] flex flex-col gap-20'>

          {/* design */}
          <svg
            className="absolute top-0 left-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 800 400"
          >
            <path d="M 0 350 C 200 400 500 400 800 300    L 800 0 L 0 0 Z" fill="#8a3ab9" />
          </svg>

          {/* Content inside SVG area */}
          <div className="relative z-10 p-2 text-center">
            <Navbar />
          </div>

          {/* Animated line/message */}
          <div className="p-4 relative mx-auto">
            <div className='text-white text-3xl font-semibold font-nunito flex'>
              <Typewriter line={line} />
            </div>
          </div>

        </div>
      </div>

      {/* Pass the locality to the Locations component */}
      <Locations locality={locality} />

      <Footer />
    </div>
  );
};

export default LocationSearchPage;
