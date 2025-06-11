import React from 'react';
import Navbar from '../Components/Navbar';
import Searchbar from '../Components/Searchbar';
import Typewriter from '../Components/typewriter';
import Userreview from '../Components/userreview';
import Usermaps from '../Components/usermaps';
import Footer from '../Components/Footer';
import toursitImg from '/src/assets/Tour guide-rafiki.png';

const Home = () => {
  return (
    <>
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
            <Navbar />
          </div>

          {/* Animated line/message */}
          <div className="p-4 text-center relative mx-auto">
            <Typewriter line="Let your journey guide others — explore cities, share knowledge, and leave a trail of wisdom."/>
          </div>

        </div>
      </div>


      {/* saab kuj main vich payo */}
      <div className='main flex flex-col items-center justify-center gap-15  mt-5'>

        {/* Content BELOW the SVG section */}
        <div className=" p-4">
          <Searchbar />
        </div>

        {/* features */}
        <div className="p-6 flex appear-apply justify-center shadow-2xl text-white bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8] rounded-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className={`w-[80%] sm:w-[45vw] lg:w-[25vw] h-[22vh] bg-gradient-to-br ${idx % 2 === 0
                    ? 'from-[#8a3ab9] to-[#b46ae4]'
                    : 'from-[#f2435a] to-[#ff7b92]'
                  } p-6 rounded-2xl shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:ring-4 hover:ring-white flex items-center justify-center text-xl font-semibold text-center`}
              >
                Card {idx + 1}
              </div>
            ))}
          </div>
        </div>



        {/* user reviews heightlights */}
        <div className='w-full appear-apply'>
          <Userreview />
        </div>

        {/* decoration */}
        <div className="w-[90vw] max-w-7xl appear-apply h-[70vh] bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8]  rounded-3xl shadow-2xl nunito mx-auto mt-10 mb-10 flex flex-col md:flex-row justify-center items-center overflow-hidden p-6">
          {/* Text Section */}
          <div className="w-full md:w-1/2 h-full flex flex-col justify-around px-4 py-4 space-y-3">
            <div className="h-1 w-full bg-[#8a3ab9] rounded-full"></div>
            <p className="text-sm md:text-base text-[#29264A] leading-relaxed font-medium overflow-y-auto">
              <span className="text-xl font-bold text-[#8a3ab9]">Hey explorer!</span> We’ve locked in your spot on the map — now it’s your move! Wander, discover, snap a moment, and share the magic.
              <span className="block mt-1">The world’s waiting to hear your story — so go on, help us uncover every hidden gem!</span>
            </p>
            <div className="h-1 w-full bg-[#8a3ab9] rounded-full"></div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 h-full flex justify-center md:justify-end">
            <img className="h-[90%] object-contain transform hover:scale-105 transition duration-500" src={toursitImg} alt="Traveler" />
          </div>
        </div>


        {/* user location map */}
        <div className='w-full appear-apply'>
          <div><Usermaps /></div>
        </div>

        <Footer  />

      </div>


    </>
  );
};

export default Home;
