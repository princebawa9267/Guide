import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Typewriter from '../Components/typewriter';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import shop from '/src/assets/shop3.png';
import { Box, Divider, Fab, FormControl, Icon, IconButton, Rating, ToggleButton, toggleButtonClasses, ToggleButtonGroup, toggleButtonGroupClasses } from '@mui/material';
import { styled } from '@mui/material/styles';



const Shop_register = () => {

   

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
                        <Typewriter line="Add your flavor to the journey — register your shop, gather reviews, and build real trust." />
                    </div>

                </div>
            </div>


            {/* saab kuj main vich payo */}
            <div className='main flex flex-col items-center justify-center gap-15  mt-5'>
                {/* Intro Section */}
                <div className="w-[90vw] max-w-7xl appear-apply h-[60vh] bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8] rounded-3xl shadow-2xl nunito mx-auto mt-10 mb-10 flex flex-col md:flex-row justify-center items-center overflow-hidden p-6">
                    <div className="w-full md:w-1/2 h-full flex justify-center md:justify-center">
                        <img className="h-[90%] object-contain transform hover:scale-105 transition duration-500" src={shop} alt="shop" />
                    </div>
                    <div className="w-full md:w-1/2 h-full flex flex-col justify-around px-4 py-4 space-y-3">
                        <div className="h-1 w-full bg-[#8a3ab9] rounded-full"></div>
                        <p className="text-sm md:text-base text-[#29264A] leading-relaxed font-medium overflow-y-auto">
                            <span className="text-xl font-bold text-[#8a3ab9]">Hey vendor!</span> Want to grow with real feedback? List your shop, share your service, and we’ll help you collect genuine reviews through your personalized QR code.

                        </p>
                        <div className="h-1 w-full bg-[#8a3ab9] rounded-full"></div>
                    </div>
                </div>

               
            </div>

        </>
    )
}

export default Shop_register
