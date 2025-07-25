import React, { useState } from 'react';
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
    heading = 'Untitled Post',
    description = 'No description provided.',
    created_at = 'Unknown Date',
    postLiked = false,
    postDisLiked = false,
    likeCount = 0,
    dislikeCount = 0,
    img = null, // URL of user image
    name = 'Anonymous', // User name
}) => {
    const [like, setLike] = useState(postLiked);
    const [dislike, setDislike] = useState(postDisLiked);
    const [likes, setLikes] = useState(likeCount);
    const [dislikes, setDislikes] = useState(dislikeCount);

    const handleLike = () => {
        if (like) {
            setLike(false);
            setLikes(likes - 1);
        } else {
            setLike(true);
            setLikes(likes + 1);
            if (dislike) {
                setDislike(false);
                setDislikes(dislikes - 1);
            }
        }
    };

    const handleDislike = () => {
        if (dislike) {
            setDislike(false);
            setDislikes(dislikes - 1);
        } else {
            setDislike(true);
            setDislikes(dislikes + 1);
            if (like) {
                setLike(false);
                setLikes(likes - 1);
            }
        }
    };

    return (
        <div className="flex flex-col w-[55vw] bg-white shadow-lg  transition-transform duration-300 hover:scale-[1.02] rounded-2xl p-6">
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

                {/* Dislikes */}
                <div className="flex items-center gap-2">
                    <ListItemIcon onClick={handleDislike} className="cursor-pointer">
                        {dislike ? (
                            <ThumbDown className="text-red-500" />
                        ) : (
                            <ThumbDownOutlined className="text-gray-500 hover:text-red-500" />
                        )}
                    </ListItemIcon>
                    <span className="text-sm text-gray-600">{dislikes}</span>
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
