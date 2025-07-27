import React, { useState,useEffect,useRef } from 'react';
import { FaUser } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAppSelector } from '../../state/store';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';// Import dayjs for date formatting its an open-source JavaScript library for parsing, validating, manipulating, and formatting dates.

import {
    ThumbUpOffAltOutlined,
    ThumbUpAlt,
    ThumbDownOutlined,
    ThumbDown,
    Comment,
} from '@mui/icons-material';
import { Divider, ListItemIcon } from '@mui/material';

const Post = ({
    post_id = null,
    heading = 'Untitled Post',
    description = 'No description provided.',
    created_at = 'Unknown Date',
    postLiked = false,
    likeCount = 0,
    img = null, // URL of user image
    name = 'Anonymous', // User name
    visiblecomments,
    togglecommetsfun,

}) => {
    const [like, setLike] = useState(postLiked);
    const [likes, setLikes] = useState(likeCount);
    const { auth } = useAppSelector(store => store);

    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

    const handleLike = async () => {
        toast.loading('Processing your like...', { toastId: 'likeToast' });

        try {
            const response = await axios.post(`http://localhost:3000/questions/${post_id}/upvote`, {
                user_id: auth?.user?.uid,
            });

            if (response.status === 200) {
                setLike(!like);
                setLikes(prev => like ? prev - 1 : prev + 1);
                toast.update('likeToast', {
                    render: 'Like processed successfully!',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000
                });
            } else {
                toast.update('likeToast', {
                    render: 'Failed to process like may be you alredy liked it',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000
                });
            }
        } catch (error) {
            console.error('Error processing like:', error);
            toast.update('likeToast', {
                render: 'Error processing like may be you alredy liked it',
                type: 'error',
                isLoading: false,
                autoClose: 3000
            });
        }
    };



    return (
        <div ref={ref} className={`flex scroll-fade-in ${visible ? 'visible' : ''} flex-col w-[55vw] bg-white shadow-lg  transition-transform duration-300 hover:scale-[1.02] rounded-2xl p-6`}>
            {/* User Info */}
            <div className="flex items-center">
                {img ? (
                    <img
                        src={img}
                        alt="User"
                        className="w-12 h-12 rounded-full object-cover border border-gray-300"
                    />
                ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white text-xl">
                        {name?.charAt(0).toUpperCase()}
                    </div>
                )}

                <div className="flex flex-col ml-4">
                    <p className="text-lg font-semibold text-gray-800">{name}</p>
                    {/* Displaying the formatted date using dayjs */}
                    <p className="text-sm text-gray-500">
                        Posted: {dayjs(created_at).format('DD MMM YYYY, hh:mm A')}
                    </p>
                </div>
            </div>

            {/* Heading */}
            <div className="mt-4">
                <p className="text-xl font-bold text-[#8a3ab9]">{heading}</p>
            </div>

            {/* Description */}
            <div className="mt-2 mb-4">
                <p className="text-gray-700">{description}</p>
            </div>

            <Divider />

            {/* Actions */}
            <div className="flex justify-between items-center mt-4">
                {/* Likes */}
                <div className="flex items-center gap-2">
                    <ListItemIcon onClick={handleLike} className="cursor-pointer">
                        {like ? (
                            <ThumbUpAlt className="text-blue-500" />
                        ) : (
                            <ThumbUpOffAltOutlined className="text-gray-500 hover:text-blue-500" />
                        )}
                    </ListItemIcon>
                    <span className="text-sm text-gray-600">{likes}</span>
                </div>

                {/* Comment */}
                <div className="flex items-center gap-1 cursor-pointer">
                    <Comment className="text-gray-500 hover:text-blue-500" />
                </div>
            </div>
        </div>
    );
};

export default Post;
