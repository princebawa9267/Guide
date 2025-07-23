import React, { useState } from 'react'
import { ThumbUpOffAltOutlined, ThumbUpAlt, Comment, ThumbDownOutlined,ThumbDown } from '@mui/icons-material';
import {  Divider, ListItemIcon } from "@mui/material";

import { FaUser } from "react-icons/fa";


const Post = ({item}) => {

    const [like, setLike] = useState(item.postLiked);
    const [dislike, setDislike] = useState(item.postDisLiked);

    const handleLike = () => {
        setLike(!like);
        // Note here i am toggling the like state before making the API call because Backend take some time to respond
        // If i will dependend on Backend then it will take time to update the UI
        // We have usually seen on LinkedIn and other platforms that they update the UI first 
        // and then make the API call if i fall then message is shown your post is not liked or something like that
        if (like) {
            item.likeCount -= 1;
        } else {
            if(dislike){
                setDislike(false); // If user likes the post, we reset dislike
                item.dislikeCount -= 1; 
            }
            item.likeCount += 1;
        }

        // Backend API call to update like count change boolean and set likeCount accordingly

    };

    const handleDislike = () => {
        setDislike(!dislike);
        // Similar to like, we toggle dislike state and update dislike count
        if (dislike) {
            item.dislikeCount -= 1;
        } else {
            if(like){
                setLike(false);
                item.likeCount -= 1; // If user dislikes the post, we reset like
            }
            item.dislikeCount += 1;
        }

        // Backend API call to update dislike count change boolean and set dislikeCount accordingly
    }

    return (
        <div>
            <div className='flex flex-col w-[60vw] bg-white shadow-lg rounded-lg p-6'>
                <div className='flex items-center'>
                    <FaUser className='text-4xl text-gray-600' />
                    <div className='flex flex-col ml-4'>
                        <p className='font-bold text-xl'>Topic Headings</p>
                        <p className='text-gray-500 text-[12px]'>Posted By : {item.postBy}  | {item.postTime}</p>
                    </div>
                </div>
                <div className='mt-4 mb-4'>
                    <p className=' font-bold'>This is a sample post content. It can be about any topic of interest.</p>
                    <p className='text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos fuga deserunt doloremque debitis distinctio, quam ex officiis placeat non earum eius! Possimus amet non cumque nam excepturi laudantium esse nostrum.</p>
                </div>
                <Divider />
                <div className='flex justify-between items-center mt-3'>
                    {
                        like ? (
                            <div className='flex items-center'>
                                <ListItemIcon>
                                    <ThumbUpAlt className='text-blue-500 cursor-pointer' onClick={() => { handleLike() }}/> {item.likeCount}
                                </ListItemIcon>
                                <FaUser />
                                <FaUser />
                                <FaUser />
                                <FaUser />
                            </div>
                        ) : (
                            <div className='flex items-center' onClick={() => { handleLike() }}>
                                <ListItemIcon>
                                    <ThumbUpOffAltOutlined className='text-gray-500 hover:text-blue-500  cursor-pointer' /> {item.likeCount}
                                </ListItemIcon>
                                <FaUser />
                                <FaUser />
                                <FaUser />
                                <FaUser />
                            </div>
                        )
                    }
                    <div className='flex items-center'>
                        {
                            dislike ? (
                                <ListItemIcon onClick={() => handleDislike()} className='flex justify-center items-center gap-1'>
                                    <ThumbDown className='text-red-500  cursor-pointer' /> {item.dislikeCount}
                                </ListItemIcon>
                            ) : (
                                <ListItemIcon  onClick={() => handleDislike()} className='flex justify-center items-center gap-1'>
                                    <ThumbDownOutlined className='text-gray-500 hover:text-red-500  cursor-pointer' /> {item.dislikeCount}
                                </ListItemIcon>
                            )
                        }
                        <Comment className='text-gray-500 hover:text-blue-500 cursor-pointer' />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Post
