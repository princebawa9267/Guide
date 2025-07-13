import React, { useEffect, useState } from 'react'
import { Rating } from '@mui/material'
import { Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import resturent_animation from '../../assets/resturent_delivery.json';
import axios from 'axios';




const ItemCard = ({ place }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const navigate = useNavigate();
    const [reviewImages, setReviewImages] = useState([]); // key = restaurant_id


    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    const value = place?.avg_food_quality;

    const handleClick = (data) => {
        // Navigate to the selected item page with the place data
        navigate(`/selected-item/${data.restaurant_id}`, { state: data });
    };


    useEffect(() => {
        const fetchReviewImages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/reviews');
                const reviews = response.data;

                const images = {};
                reviews.forEach(review => {
                    if (review.restaurant_id && review.image_url) {
                        images[review.restaurant_id] = review.image_url;
                    }
                });

                setReviewImages(images);
            } catch (error) {
                console.error('Error fetching review images:', error);
            }
        };
        fetchReviewImages();
    }, []);


    return (
        <div>
            <div className='flex shadow-2xl flex-col w-[100%] h-[100%]  justify-center relative group cursor-pointer bg-white rounded-2xl text-black' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => handleClick(place)}>
                <div className="overflow-hidden relative w-[100%] h-[200px] rounded-lg shadow-md">
                    {reviewImages[place?.restaurant_id] ? (
                        <img
                            src={reviewImages[place.restaurant_id]}
                            alt="Restaurant Review"
                            className="w-full h-48 object-cover rounded-md"
                            onError={(e) => (e.target.src = '/fallback.jpg')}
                        />
                    ) : (
                        <Lottie
                            animationData={resturent_animation}
                            loop
                            className="w-full h-48 object-contain"
                        />
                    )}
                </div>
                <div className='p-2'>
                    <p className="text-lg font-bold capitalize m-0">{place?.name}</p>
                    <p className="text-gray-600 text-sm capitalize">{place?.locality}</p>
                    <Rating
                        name="text-feedback"
                        value={value}
                        readOnly
                        precision={0.5}
                        emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                </div>
            </div>
        </div>
    )
}

export default ItemCard;
