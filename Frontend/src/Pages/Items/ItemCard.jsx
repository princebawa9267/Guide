import React, { useEffect, useState } from 'react'
// import "./CSS/ProductCard.css"
import { Favorite, ModeComment } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../state/store';
// import { addProductToWishlist } from '../../../state/customer/wishlistSlice';

const ItemCard = ({ item }) => {

    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {

        let interval
        if (isHovered) {
            interval = setInterval(() => {
                setCurrentImage((prevImage) => (prevImage + 1) % item.images.length)
            }, 1000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isHovered])

    const handleWishlist = (event) => {
        event.stopPropagation()
        item.id && dispatch(addProductToWishlist({ productId: item.id }))
    }

    return (
        <>
            <div onClick={() => navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`)} className='group pt-5 pl-5 relative overflow-hidden'>
                <div className='card' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    {
                        [1].map((item, index) => <img key={index} style={{ transform: `translateX(${(index - currentImage) * 100}%)` }} className='card-media object-top' src="https://imgv3.fotor.com/images/videoImage/wonderland-girl-generated-by-Fotor-ai-art-generator.jpg" alt="" />)
                    }
                    {isHovered &&
                        <div className='indicator flex flex-col items-center space-y-2'>
                            <div className='flex gap-3'>
                                <Button onClick={handleWishlist} variant="contained" color='button_bg'>
                                    <Favorite sx={{ color: "var(--primary-color)" }} />
                                </Button>
                                <Button variant="contained" color='button_bg'>
                                    <ModeComment sx={{ color: "var(--primary-color)" }} />
                                </Button>
                            </div>
                        </div>
                    }
                </div>


                <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
                    <div className='name'>
                        <h1><strong>{item?.name}</strong></h1>
                    </div>

                </div>

            </div>



        </>
    )
}

export default ItemCard;
