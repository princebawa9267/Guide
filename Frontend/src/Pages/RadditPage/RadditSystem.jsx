import React, { useState } from 'react'
import { Button, Divider, ListItemIcon, ListItemText, TextField } from "@mui/material";

import Post from './Post';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { FaUser } from "react-icons/fa";

const RadditSystem = () => {

  const data = [
    { title: "Topic Headings", postBy: "Sandeep Kumar", postTime: "25-May-2025, 14:13 PM IST", text: "", postLiked: true, postDisLiked: false, likeCount: 24, dislikeCount: 5, comments: 10 },
    { title: "Post 2", postBy: "Rajdeep Kumar", postTime: "25-May-2025, 14:13 PM IST", text: "", postLiked: false, postDisLiked: false, likeCount: 24, dislikeCount: 5, comments: 10 },
    { title: "Post 3", postBy: "Dharmpreet Kumar", postTime: "25-May-2025, 14:13 PM IST", text: "", postLiked: false, postDisLiked: true, likeCount: 24, dislikeCount: 5, comments: 10 },
    { title: "Post 4", postBy: "Vikram Kumar", postTime: "25-May-2025, 14:13 PM IST", text: "", postLiked: false, postDisLiked: false, likeCount: 24, dislikeCount: 5, comments: 10 },
    { title: "Post 5", postBy: "Ram Kumar", postTime: "25-May-2025, 14:13 PM IST", text: "", postLiked: true, postDisLiked: false, likeCount: 24, dislikeCount: 5, comments: 10 }
  ];

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 p-4 space-x-4">
      {/* Left Content */}
      <div className="flex flex-col space-y-4 flex-1 max-h-screen overflow-y-auto">
        {/* Button Row */}
        <div className="flex gap-5">
          <Button className='!text-black' variant='outlined'>All</Button>
          <Button className='!text-black' variant='outlined'>✨Popular</Button>
          <Button className='!text-black' variant='outlined'>📋New</Button>
          <Button className='!text-black' variant='outlined'>🔥Top</Button>
          <Button className='!text-black' variant='outlined'>📈Rising</Button>
        </div>

        {/* Posts */}
        <div className='flex flex-col gap-4'>
          {data.map((item, index) => (
            <Post key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Vertical Divider */}
      {/* <Divider orientation="vertical" flexItem /> */}

      {/* Right Content / Sidebar */}
      <div className="w-[32vw] bg-white p-4 rounded-lg shadow">
        <TextField
          fullWidth
          type="text"
          name="thoughts"
          label="What's on your mind?"
          sx={{
            borderRadius: '14px', // You can adjust the value as needed
            '& .MuiOutlinedInput-root': {
              borderRadius: '14px', // Apply to the input field's border
            },
          }}
        />
      </div>
    </div>

  )
}

export default RadditSystem;
