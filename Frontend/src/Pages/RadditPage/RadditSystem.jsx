import React, { useState } from 'react'
import { Button, Divider, ListItemIcon, ListItemText } from "@mui/material";
import Navbar from '../../Components/Navbar';

import Post from './Post';

const RadditSystem = () => {

  const data = [
  { title: "Topic Headings",postBy : "Sandeep Kumar", postTime: "25-May-2025, 14:13 PM IST", text : "",postLiked : true, postDisLiked : false, likeCount: 24 , dislikeCount: 5, comments: 10 },
  { title: "Post 2",postBy : "Rajdeep Kumar", postTime: "25-May-2025, 14:13 PM IST", text : "",postLiked : false, postDisLiked : false, likeCount: 24 , dislikeCount: 5, comments: 10 },
  { title: "Post 3" ,postBy : "Dharmpreet Kumar", postTime: "25-May-2025, 14:13 PM IST", text : "",postLiked : false, postDisLiked : true, likeCount: 24 , dislikeCount: 5, comments: 10},
  { title: "Post 4" ,postBy : "Vikram Kumar", postTime: "25-May-2025, 14:13 PM IST", text : "",postLiked : false, postDisLiked : false, likeCount: 24 , dislikeCount: 5, comments: 10},
  { title: "Post 5",postBy : "Ram Kumar", postTime: "25-May-2025, 14:13 PM IST", text : "",postLiked : true, postDisLiked : false, likeCount: 24 , dislikeCount: 5, comments: 10 }
];

  return (
    <div className='flex flex-col space-y-4  min-h-screen bg-gray-100'>
      {/* Header */}
      <div className='relative h-[30vh] flex flex-col gap-20'>

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

      {/* Button Divs */}
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
            <Post key={index} item={item}/>
          ))
        }
          
      </div>

    </div>
  )
}

export default RadditSystem;
