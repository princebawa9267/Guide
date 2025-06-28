import Navbar from '../Components/Navbar';
import Typewriter from '../Components/typewriter';
import Selected_item_map from '../Components/Selected_item_map';
import Footer from '../Components/Footer';
import React, { useState } from 'react';
import img from "/src/assets/Tour guide-rafiki.png"
import think from "/src/assets/Thinking face-rafiki.png"

const Selected_item = () => {

  const [open_hours, setopen_hours] = useState('')
  const [images, setimages] = useState([img, think, 4, 8, 9, 0, 9])

  return (
    <div>
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
          <Typewriter line="A spot loved, lived, and now shared — come see why it stands out." />
        </div>

      </div>

      <div className='main flex flex-col items-center justify-center gap-15  mt-5'>


        {/* decoration */}
        <div className="w-[90vw]  appear-apply h-[60vh] bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8]  rounded-3xl shadow-2xl nunito mx-auto mt-10 mb-10  overflow-hidden relative p-6">

          {/* Heading */}

          <div className="h-1 w-full bg-[#8a3ab9] rounded-full mt-5 mb-4"></div>
          <span className="text-[#29264A] bg-white mx-2 text-2xl md:text-3xl font-bold absolute top-6 left-18 text-center mb-2">
            Basic Information
          </span>

          <div className="w-full bg-transparent text-lg text-gray-800 px-6 py-4">
            <div className="grid grid-cols-3 gap-y-7 border-y  border-gray-300 p-6">
              <span className="text-right font-semibold text-[#8a3ab9]">Name</span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">Punjabi Dhabha</span>

              <span className="text-right font-semibold text-[#8a3ab9]">Location</span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">Patel Chowk</span>

              <span className="text-right font-semibold text-[#8a3ab9]">City</span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">Jalandhar</span>

              <span className="text-right font-semibold text-[#8a3ab9]">Latitude</span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">31.364738</span>

              <span className="text-right font-semibold text-[#8a3ab9]">Longitude</span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">76.847463</span>
            </div>
          </div>

        </div>


        {/* decoration */}
        <div className="w-[90vw]  appear-apply h-[60vh] bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8] px-6  rounded-3xl shadow-2xl nunito mx-auto mt-7 mb-2  overflow-hidden relative pt-6">

          {/* Heading */}

          <div className="h-1 w-full bg-[#8a3ab9] rounded-full mt-5 mb-4 "></div>
          <span className="text-[#29264A] bg-white mx-2 text-2xl md:text-3xl font-bold absolute top-6 left-18 text-center mb-2">
            Map
          </span>

          <div className="w-full h-full text-lg text-gray-800 pt-3">
            <Selected_item_map />
          </div>

        </div>




        {/* decoration */}
        <div className="w-[90vw]  appear-apply h-[30vh] bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8]  rounded-3xl shadow-2xl nunito mx-auto mt-10 mb-10  overflow-hidden relative p-6">

          {/* Heading */}

          <div className="h-1 w-full bg-[#8a3ab9] rounded-full mt-5 mb-4"></div>
          <span className="text-[#29264A] bg-white mx-2 text-xl md:text-3xl font-bold absolute top-6 left-18 text-center mb-2">
            Emoji Ratings Explained
          </span>

          <div className="w-full bg-transparent text-lg text-gray-800 px-6 py-4">

            <div className="grid grid-cols-5 gap-y-7 text-2xl border-y items-center justify-items-center h-[16vh]  border-gray-300 p-3">
             <div className="flex gap-5">
              <span>😡</span>
              <span>:</span>
              <span>Worst</span>
             </div>

             <div className="flex gap-5"> 
              <span>😕</span>
              <span>:</span>
              <span>Okay</span>
             </div>

             <div className="flex gap-5">
              <span>😐</span>
              <span>:</span>
              <span>Average</span>
             </div>

             <div className="flex gap-5">
              <span>🙂</span>
              <span>:</span>
              <span>Very Good</span>
             </div>

             <div className="flex gap-5">
              <span>😁</span>
              <span>:</span>
              <span>Excellent</span>
             </div>

            </div>

          </div>

        </div>





        {/* decoration */}
        <div className="w-[90vw]   appear-apply h-[60vh] bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8]  rounded-3xl shadow-2xl nunito mx-auto mt-10 mb-10  overflow-hidden relative p-6">

          {/* Heading */}

          <div className="h-1 w-full bg-[#8a3ab9] rounded-full mt-5 mb-4"></div>
          <span className="text-[#29264A] bg-white mx-2 text-2xl md:text-3xl font-bold absolute top-6 left-18 text-center mb-2">
            Experience Overview
          </span>

          <div className="w-full bg-transparent text-lg text-gray-800 px-6 py-4">
            <div className="grid grid-cols-3 gap-y-7 border-y  border-gray-300 p-3">
              <span className="text-right font-semibold text-[#8a3ab9]">Popular Dish</span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">Dal Makhni , Shahi Paneer</span>

              <span className="text-right font-semibold text-[#8a3ab9]">Food Quality</span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">😁</span>

              <span className="text-right font-semibold text-[#8a3ab9]">Cleanliness</span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">😑</span>

              <span className="text-right font-semibold text-[#8a3ab9]">Service</span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">😊</span>

              <span className="text-right font-semibold text-[#8a3ab9]">Price Level</span>
              <span className="text-center text-gray-500">:</span>
              <span className="text-left font-medium">☺️</span>


              <span className="text-right font-semibold text-[#8a3ab9]">Open Hours</span>
              <span className="text-center text-gray-500">:</span>
              {open_hours ? (<span className="text-left font-medium">76.847463</span>) : (<span className="text-left font-medium">Not Aviable</span>)}
            </div>
          </div>

        </div>


        {/* decoration */}
        <div className="w-[90vw]  appear-apply h-[60vh] bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8]  rounded-3xl shadow-2xl nunito mx-auto mt-10 mb-10  overflow-hidden relative p-6">

          {/* Heading */}

          <div className="h-1 w-full bg-[#8a3ab9] rounded-full mt-5 mb-4"></div>
          <span className="text-[#29264A] bg-white mx-2 text-2xl md:text-3xl font-bold absolute top-6 left-18 text-center mb-2">
            Gallery
          </span>

          <div className="w-full bg-transparent text-lg text-gray-800 px-6 py-4">

            {images ? (<div className="grid grid-cols-5 gap-y-7 h-[45vh] border-y items-center justify-items-center  border-gray-300 p-3">
              {images.slice(0, 5).map((img, index) => (
                <img key={index} src={img} alt={`preview-${index}`} className="rounded-xl cursor-pointer w-65 h-65 object-cover transition-transform duration-300 ease-in-out hover:scale-155" />
              ))}
            </div>) : (<div className="flex justify-center h-[45vh] items-center border-y text-xl  border-gray-300 p-3">No images available</div>)}
          </div>

        </div>










        <Footer />
      </div>





    </div>
  )
}

export default Selected_item
