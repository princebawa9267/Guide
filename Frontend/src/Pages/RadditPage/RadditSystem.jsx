import React, { useState } from 'react'
import { Button, Divider, ListItemIcon, ListItemText } from "@mui/material";
import Navbar from '../../Components/Navbar';

import Post from './Post';

const RadditSystem = () => {

  const handlesubmit = (e) => {}

  const data = [
    { title: "Topic Headings", postBy: "Sandeep Kumar", postTime: "25-May-2025, 14:13 PM IST", text: "", postLiked: true, postDisLiked: false, likeCount: 24, dislikeCount: 5, comments: 10 },
    { title: "Post 2", postBy: "Rajdeep Kumar", postTime: "25-May-2025, 14:13 PM IST", text: "", postLiked: false, postDisLiked: false, likeCount: 24, dislikeCount: 5, comments: 10 },
    { title: "Post 3", postBy: "Dharmpreet Kumar", postTime: "25-May-2025, 14:13 PM IST", text: "", postLiked: false, postDisLiked: true, likeCount: 24, dislikeCount: 5, comments: 10 },
    { title: "Post 4", postBy: "Vikram Kumar", postTime: "25-May-2025, 14:13 PM IST", text: "", postLiked: false, postDisLiked: false, likeCount: 24, dislikeCount: 5, comments: 10 },
    { title: "Post 5", postBy: "Ram Kumar", postTime: "25-May-2025, 14:13 PM IST", text: "", postLiked: true, postDisLiked: false, likeCount: 24, dislikeCount: 5, comments: 10 }
  ];

  return (
    <div className='flex flex-col space-y-4  bg-gray-100 overflow-hidden'>
      {/* Header */}
      <div className='relative h-[40vh] flex flex-col gap-20'>

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

      </div>

      {/* put every thing in the main */}
      <div className='main flex w-screen'>
        <div className=' flex flex-col w-[70vw] items-center'>      {/* Button Divs */}
          <div className='flex gap-5 m-10 '>
            <Button className='!text-black' variant='outlined'>All</Button>
            <Button className='!text-black' variant='outlined'>✨Popular</Button>
            <Button className='!text-black' variant='outlined'>📋New</Button>
            <Button className='!text-black' variant='outlined'>🔥Top</Button>
            <Button className='!text-black' variant='outlined'>📈Rising</Button>
          </div>

          {/* Post Containers */}
          <div className='flex gap-4 flex-col '>
            {/* Post Div */}
            {
              data.map((item, index) => (
                <Post key={index} item={item} />
              ))
            }

          </div>
        </div>
        <div className=' w-[30vw] border-t-2 mt-10 border-l-2  flex flex-col border-gray-400'>
           <form className='w-full flex flex-col items-center' onSubmit={handlesubmit}>
            <div className='w-full'></div>
            <input 
            type="text"
            placeholder='Explore...'
            className='w-[70%] mt-5  shadow-xl p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-4xl bg-[#e3d3fa] focus:ring-white focus:border-white'
            autoComplete='off' />
           </form>
        </div>
      </div>

    </div>

  )
}

export default RadditSystem;
