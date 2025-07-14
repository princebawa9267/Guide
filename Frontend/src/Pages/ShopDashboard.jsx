import React, { useState, useEffect, useCallback, useRef } from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Typewriter from '../Components/typewriter';
import { Edit, Add, Verified } from '@mui/icons-material';
import { Button, Grid, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { PieChart } from '@mui/x-charts/PieChart';

import { QRCodeSVG } from 'qrcode.react';

import html2canvas from 'html2canvas';

const ShopDashboard = () => {

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
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }


    const rows = [
        createData(1, 159, 6.0, 24, 4.0),
        createData(2, 237, 9.0, 37, 4.3),
        createData(3, 262, 16.0, 24, 6.0),
        createData(4, 305, 3.7, 67, 4.3),
        createData(5, 356, 16.0, 49, 3.9),
    ];

    // Chart Configuration
    const data = [
        { label: 'Group A', value: 20, color: '#0088FE' },
        { label: 'Group B', value: 300, color: '#00C49F' },

    ];

    const settings = {
        width: 110,
        height: 110,
        hideLegend: true,
    };


    // Dummy data for QR Code
    const name = "Ram Ka Dhaba";
    const location = "123 Main Street, City, State";
    const city = "YourCity";
    const latitude = "30.1330";
    const longitude = "76.3473";
    const open_hours = "9 AM - 9 PM";

    // For Qr Code download

    const ref = useRef(null);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }
        console.log("Generating image...");
        html2canvas(ref.current, {
            scale: 3, // Increase scale for higher resolution
            x: 0, // Capture from the top-left corner
            y: 0, // Capture from the top-left corner
            width: ref.current.offsetWidth,  // Use the width of the element
            height: ref.current.offsetHeight,  // Use the height of the element
            backgroundColor: null, // Remove background color (important for transparent images)
        }).then((canvas) => {
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'QrCode.png';  // Set the file name for the download
            link.href = dataUrl;  // Set the generated PNG as the href
            link.click();  // Trigger the download
        }).catch((err) => {
            console.log('Error generating image:', err);
        });
    }, [ref]);

    return (
        <>
            <div className="">

                {/* div contain design */}
                <div className='relative h-[60vh] flex flex-col gap-20'>

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

                    {/* Animated line/message */}
                    <div className="p-4 text-center relative mx-auto">
                        <Typewriter line="Add your flavor to the journey — register your shop, gather reviews, and build real trust." />
                    </div>

                </div>
            </div>

            {/* saab kuj main vich payo */}
            <div className='main flex flex-col items-center justify-center gap-15  mt-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-20 w-[90vw] px-4'>

                    <div className='flex flex-col items-center justify-center shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:ring-4 hover:ring-white text-white bg-gradient-to-br from-[#f2435a] to-[#ff7b92] rounded-3xl '>
                        <h1 className='uppercase mt-4 text-2xl oswald font-extrabold text-center text-white'>
                            Your Details
                        </h1>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className='text-lg p-3 m-auto col-span-2 '>
                                <div className='flex flex-col gap-2 text-[12px] md:text-[16px]'>
                                    <p><strong>Name: </strong>John Doe</p>
                                    <p><strong>Email: </strong>princebawa9267@gmail.com</p>
                                    <p><strong>Contact: </strong>+91 12345 67890</p>
                                    <p><strong>Address: </strong>123 Main Street, City, State</p>
                                </div>
                            </div>
                            <div className=' col-span-1 m-auto' >
                                <img src='/src/assets/boy-img.png' />
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col items-center justify-center rounded-3xl  p-4 shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:ring-4 hover:ring-[#b46ae4] text-white bg-gradient-to-br '>
                        <h1 className='text-2xl font-bold text-[#57326c]'>
                            Reviews
                        </h1>
                        <div className='grid grid-cols-4 '>
                            <div className=''>
                                <PieChart
                                    series={[{ innerRadius: 20, outerRadius: 50, data, arcLabel: 'value' }]}
                                    {...settings} />
                                <p className='text-[#858585] text-center font-bold'>
                                    Food
                                </p>
                            </div>
                            <div className=''>
                                <PieChart
                                    series={[{ innerRadius: 20, outerRadius: 50, data, arcLabel: 'value' }]}
                                    {...settings} />
                                <p className='text-[#858585] text-center font-bold'>
                                    Service
                                </p>
                            </div>
                            <div className=''>
                                <PieChart
                                    series={[{ innerRadius: 20, outerRadius: 50, data, arcLabel: 'value' }]}
                                    {...settings} />
                                <p className='text-[#858585] text-center font-bold'>
                                    Cleanliness
                                </p>
                            </div>
                            <div className=''>
                                <PieChart
                                    series={[{ innerRadius: 20, outerRadius: 50, data, arcLabel: 'value' }]}
                                    {...settings} />
                                <p className='text-[#858585] text-center font-bold'>
                                    Price
                                </p>

                            </div>
                        </div>
                    </div>

                </div>
                <div className='flex flex-col items-center justify-center gap-6'>
                    <div className="flex w-full items-center justify-between mx-auto">
                        <div className="flex-grow flex justify-center">
                            <h1 className=" uppercase !font-bold text-2xl text-center">
                                Your Shops
                            </h1>
                        </div>
                        <Button variant='outlined' className="ml-auto"><Add />New Shop</Button>
                    </div>


                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: "90vw" }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Shop id</StyledTableCell>
                                    <StyledTableCell align="left">Images</StyledTableCell>
                                    <StyledTableCell align="right">Reviews</StyledTableCell>
                                    <StyledTableCell align="right">Shop</StyledTableCell>
                                    <StyledTableCell align="right">Status</StyledTableCell>
                                    <StyledTableCell align="right">QR Code</StyledTableCell>
                                    <StyledTableCell align="right">Edit Shop</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{row.calories}</StyledTableCell>

                                        <StyledTableCell align="right">
                                            <div>
                                                <p><strong>Food : </strong>4 star</p>
                                                <p><strong>Service : </strong>3 star</p>
                                                <p><strong>Price : </strong>3.5 star</p>
                                                <p><strong>Cleanliness : </strong>3 star</p>
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align="right"><div>
                                            <p><strong>Title : </strong>Ram Ka Dhaba</p>
                                            <p><strong>GST Number : </strong>22AAAAA0000A1Z5</p>
                                            <p><strong>Address : </strong>123 Main Street, City, State</p>
                                            <p><strong>Contact : </strong>+91 12345 67890   </p>
                                            <p><strong>Overall Rating : </strong>4.5</p>
                                        </div></StyledTableCell>
                                        <StyledTableCell align="right">
                                            <span className='text-green-500 font-bold flex justify-end'><Verified /> <p className='text-black'> Active</p> </span>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <span className='flex flex-col text-[#57326c] font-bold'>
                                                <div ref={ref} className='flex justify-end'>
                                                    <QRCodeSVG className='w-[70px]' value={`http://localhost:5174/contribute?name=${encodeURIComponent(name)}&location=${encodeURIComponent(location)}&city=${encodeURIComponent(city)}&longitude=${encodeURIComponent(longitude)}&latitude=${encodeURIComponent(latitude)}&open_hours=YourOpenHours`} />
                                                </div>
                                                <span className='text-black underline cursor-pointer' onClick={() => onButtonClick()}>Download QR</span>
                                            </span>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Edit className='cursor-pointer text-[#57326c]' />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    )
}

export default ShopDashboard;
