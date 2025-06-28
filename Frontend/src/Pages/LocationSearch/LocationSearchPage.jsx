import React, { useState } from 'react'
import thinkingImg from '/src/assets/Thinking face-rafiki.png';
import Navbar from '../../Components/Navbar';
import Typewriter from '../../Components/typewriter';
import { data } from 'react-router-dom';
import Locations from './Locations';
import Footer from '../../Components/Footer';

const LocationSearchPage = ({heading,items}) => {

  const [line , setLine] = useState(`Your guide to ${data.location}`);
  console.log("Line ",heading);
  // console.log("Places ",props.places)

  return (
    <div>

      <div className="">

        {/* div contain design */}
        <div className='relative h-[60vh] flex flex-col gap-20'>

          {/* design  */}
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
            <Navbar/>
          </div>

          {/* Animated line/message */}
          <div className="p-4  relative mx-auto">
            <div className='text-white text-3xl font-semibold font-nunito flex'>
            
            <Typewriter line={line}/>
            </div>
          </div>

        </div>
      </div>

      <Locations/>
      <Footer/>
    </div>
  );
};

export default LocationSearchPage;

