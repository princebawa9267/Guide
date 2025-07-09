import React, { useEffect, useState } from 'react'
import {  Rating} from '@mui/material'
import { Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';



const ItemCard = ({place}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const navigate = useNavigate();

    const foodImage = [
        "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
        "https://tse1.mm.bing.net/th/id/OIP.nHdjesbJ7Yc8yl2bJQuY7wHaEo?pid=ImgDet&w=474&h=296&rs=1&o=7&rm=3",
        "https://tse2.mm.bing.net/th/id/OIP.ak3XveK3X42VVIh9fOixwgHaFB?rs=1&pid=ImgDetMain&o=7&rm=3"];

    useEffect(() => {
        let interval
        if (isHovered) {
            interval = setInterval(() => {
                setCurrentImage((prevImage) => (prevImage + 1) % foodImage.length)
            }, 1000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isHovered])

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

    return (
        <div>
            <div className='flex shadow-2xl flex-col w-[100%] h-[100%]  justify-center relative group cursor-pointer bg-white rounded-2xl text-black' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => handleClick(place)}>
                <div className=" overflow-hidden relative w-[100%] h-[250px]  rounded-lg shadow-md">
                    {
                        foodImage.map((item, index) => <img key={index} style={{ transform: `translateX(${(index - currentImage) * 100}%)` }} className='transition-all duration-300 ease-in-out absolute top-0 left-0 w-[100vw] h-[100%] cursor-pointer object-cover' src={item} alt="" />)
                    }
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
