import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Typewriter from '../Components/typewriter'



const Contribute = () => {

  return (
    <>
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
            <Navbar />
          </div>

          {/* Animated line/message */}
          <div className="p-4 text-center relative mx-auto">
            <Typewriter line="Add your story to the map — share hidden gems, trusted stays, and helpful tips for fellow travelers"/>
          </div>

        </div>
         <div className='main flex flex-col items-center justify-center gap-15  mt-5'>
          
         </div>
    </>
  )
}

export default Contribute
