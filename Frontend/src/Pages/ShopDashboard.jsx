import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Typewriter from '../Components/typewriter';
import { Edit, Add, Verified } from '@mui/icons-material';
import { Button, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import { db } from '../../src/register.js';
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAppSelector } from '../state/store';
import Lottie from 'lottie-react';
import No_DATA_found from '../assets/No Data found.json';

const ShopDashboard = () => {
    const { auth } = useAppSelector(store => store);
    const [restaurants, setRestaurants] = useState([]);
    const [ownerData, setOwnerData] = useState(null);
    const navigate = useNavigate();
    const ref = useRef(null);
    const user_id = auth?.user?.uid;

    const handleclick = () => {
        navigate("/listyourshop/register");
    };

    useEffect(() => {
        if (!auth?.user?.uid) return;

        const fetchData = async () => {
            try {
                const user_id = auth.user.uid;

                // 1. Fetch owner data
                const ownerDocRef = doc(db, 'owners', user_id);
                const ownerSnap = await getDoc(ownerDocRef);

                if (!ownerSnap.exists()) {
                    console.warn("Owner document not found");
                    return;
                }

                const ownerDetails = ownerSnap.data();
                setOwnerData(ownerDetails);

                // 2. Query restaurants for the current owner
                const q = query(collection(db, 'restaurants'), where("added_by", "==", user_id));

                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const list = [];

                    snapshot.docs.forEach((docSnap) => {
                        const data = docSnap.data();

                        list.push({
                            restaurant_id: docSnap.id,
                            ...data,
                            ownerData: {
                                GST_number: ownerDetails.GST_number || 'NA',
                                email_address: ownerDetails.email_address || 'NA',
                                phone_number: ownerDetails.phone_number || 'NA',
                                owner_name: ownerDetails.owner_name || 'NA',
                                locality: data.locality || '',
                                city: data.city || '',
                            },
                        });
                    });

                    setRestaurants(list);
                });

                return () => unsubscribe();

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, [auth?.user?.uid]);


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const onButtonClick = useCallback(() => {
        if (!ref.current) return;
        html2canvas(ref.current, { scale: 3, backgroundColor: null }).then((canvas) => {
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'QrCode.png';
            link.href = dataUrl;
            link.click();
        }).catch((err) => {
            console.log('Error generating image:', err);
        });
    }, []);

    return (
        <>
            {/* Top Hero Section */}
            <div className="relative h-[60vh] flex flex-col gap-20">
                <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 400">
                    <path d="M 0 350 C 200 400 500 400 800 300 L 800 0 L 0 0 Z" fill="#8a3ab9" />
                </svg>
                <div className="relative z-10 p-2 text-center">
                    <Navbar />
                </div>
                <div className="p-4 text-center relative mx-auto">
                    <Typewriter line="Your business, your journey — manage your shop, engage with travelers, and build lasting trust.." />
                </div>
            </div>

            {/* Main Content */}
            <div className='main flex flex-col items-center justify-center gap-15 mt-10'>

                {/* Owner Card */}
                {ownerData && (
                    <div className='flex appear-apply flex-col mt-15 gap-20 w-[70vw] px-4'>
                        <div className='flex flex-col items-center justify-center shadow-2xl text-white bg-gradient-to-br from-[#8a3ab9] to-[#b46ae4] rounded-3xl p-4'>
                            <h1 className='uppercase mt-4 text-2xl font-extrabold text-center'>Owner Details</h1>
                            <div className='grid grid-cols-3 gap-4'>
                                <div className='text-lg p-3 m-auto col-span-2 '>
                                    <div className='flex flex-col gap-2 text-[12px] md:text-[16px]'>
                                        <p><strong>Name: </strong>{ownerData.owner_name}</p>
                                        <p><strong>Email: </strong>{ownerData.email_address}</p>
                                        <p><strong>Contact: </strong>{ownerData.phone_number}</p>
                                        <p><strong>Address: </strong>{ownerData.locality}, {ownerData.city}</p>
                                    </div>
                                </div>
                                <div className=' col-span-1 m-auto' >
                                    <img src='/src/assets/boy-img.png' />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Shops Section */}
                <div className='flex flex-col items-center appear-apply justify-center gap-6'>
                    <div className="flex w-full">
                        <div className="flex-grow flex w-1/2 justify-center">
                            <h1 className=" uppercase !font-bold text-2xl ml-50 text-center">
                                Your Shops
                            </h1>
                        </div>
                        <div className='flex w-1/9 justify-center'>
                            <Button variant='outlined' onClick={handleclick}><Add />New Shop</Button>
                        </div>
                    </div>

                    {/* No Shops Found */}
                    {restaurants.length === 0 ? (
                        <div className="flex flex-col items-center justify-center mt-8 p-6 bg-red-100 border border-red-300 rounded-lg shadow-md">
                            <Lottie animationData={No_DATA_found} loop className="w-full h-48 object-contain" />
                            <h2 className="text-xl md:text-2xl font-semibold text-red-600">No Restaurants Found</h2>
                            <p className="text-sm md:text-base text-red-500 mt-1">
                                Once your restaurant gets verified, it will appear here.
                            </p>
                        </div>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: "85vw" }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Shop ID</StyledTableCell>
                                        <StyledTableCell>Images</StyledTableCell>
                                        <StyledTableCell>Reviews</StyledTableCell>
                                        <StyledTableCell>Shop</StyledTableCell>
                                        <StyledTableCell>Status</StyledTableCell>
                                        <StyledTableCell>QR Code</StyledTableCell>
                                        <StyledTableCell>Edit Shop</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {restaurants.map((restaurant, index) => (
                                        <StyledTableRow key={restaurant.restaurant_id}>
                                            <StyledTableCell>{restaurant.restaurant_id}</StyledTableCell>
                                            <StyledTableCell>
                                                {restaurant.images && restaurant.images.length > 0 ? (
                                                    <img
                                                        src={restaurant.images[0] || "/src/assets/default.jpg"}
                                                        className="w-[70px] h-[70px] object-cover rounded-md"
                                                        alt="Restaurant"
                                                    />
                                                ) : (
                                                    <p className='text-red-500'>No image available</p>
                                                )}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <p><strong>Food:</strong> {restaurant.avg_food_quality || 0} ⭐</p>
                                                <p><strong>Service:</strong> {restaurant.avg_service_score || 0} ⭐</p>
                                                <p><strong>Cleanliness:</strong> {restaurant.avg_cleanliness_score || 0} ⭐</p>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <p><strong>Title:</strong> {restaurant.name}</p>
                                                <p><strong>Address:</strong> {restaurant.locality}, {restaurant.city}</p>
                                                <p><strong>Contact:</strong> {restaurant.phone_number}</p>
                                                <p><strong>Open Hours:</strong> {restaurant.open_hours}</p>
                                                <p><strong>GST:</strong> {restaurant.GST_number}</p>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {restaurant.verification_status ? (
                                                    <span className="text-green-500 font-bold flex items-center gap-1">
                                                        <Verified /> <span className="text-black">Verified</span>
                                                    </span>
                                                ) : (
                                                    <span className="text-yellow-500 font-bold">Pending</span>
                                                )}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {restaurant.verification_status ? (
                                                    <div className="flex flex-col items-end text-[#57326c] font-bold">
                                                        <div ref={ref}>
                                                            <QRCodeSVG
                                                                className="w-[70px]"
                                                                value={`http://localhost:5174/contribute?name=${encodeURIComponent(restaurant.name)}&location=${encodeURIComponent(restaurant.locality)}&city=${encodeURIComponent(restaurant.city)}&longitude=${restaurant.longitude}&latitude=${restaurant.latitude}&open_hours=${encodeURIComponent(restaurant.open_hours)}`}
                                                            />
                                                        </div>
                                                        <span className="text-black underline cursor-pointer" onClick={onButtonClick}>Download QR</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">Not verified</span>
                                                )}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Edit
                                                    className="cursor-pointer text-[#57326c]"
                                                    onClick={() => navigate(`/listyourshop/register?restaurant_id=${restaurant.restaurant_id}`)}
                                                />
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </div>
            </div>

            <div className='mt-6 w-full'>
                <Footer />
            </div>
        </>
    );
};

export default ShopDashboard;
