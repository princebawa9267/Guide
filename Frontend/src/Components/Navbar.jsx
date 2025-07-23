import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../state/store';
import { Button } from '@mui/material';
import { logoutUser } from '../state/auth/authSlice';

const Navbar = () => {

    const [drawerToggle, setDrawerToggle] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null)

    // User image URL state
    // This will hold the converted Blob URL for the user image
    const [userImageUrl, setUserImageUrl] = useState(null);

    // Toggle for navabar profile section
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        console.log("Menu toggled");
        setMenuOpen(prevState => !prevState);
        console.log("Menu open state:", menuOpen);
    };

    // Getting value form the redux store
    // This will be used to get the user details
    const { auth } = useAppSelector(store => store);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    // Logout user
    const logout = () => {
        dispatch(logoutUser({ dispatch: dispatch }));
        setMenuOpen(false); // Close the menu on logout
        console.log("Logout");
    }

    // Conversion on image to Blob so error does not occur with image URL
    const fetchImageAsBlob = async (imageUrl, retries = 3, delay = 1000) => {

        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                const response = await fetch(imageUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }
                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);
                return objectUrl;
            } catch (error) {
                console.error("Error fetching image:", error);
                if (error.message.includes('429') && attempt < retries - 1) {
                    console.log("Rate limit hit, retrying...");
                    await new Promise((resolve) => setTimeout(resolve, delay));  // Retry delay
                }
            }
        }


    };

    useEffect(() => {
        if (auth?.user?.photoURL) {
            // Fetch and set image if URL is available
            fetchImageAsBlob(auth.user.photoURL).then((objectUrl) => {
                if (objectUrl) {
                    setUserImageUrl(objectUrl);
                }
            });
        }
    }, [auth?.user?.photoURL]);

    // close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [])

    return (
        <div className='flex justify-center'>
            <nav className="sticky z-999 w-[95vw] bg-transparent border-gray-200 dark:bg-transparent">
                <div className="max-w-screen-xl flex shadow-2xl bg-white rounded-3xl flex-wrap items-center justify-between mx-auto mt-8 p-2">
                    <NavLink className="flex items-center space-x-3 rtl:space-x-reverse" onClick={navigate("/")}>

                        <svg fill="#766f6f" className='h-9 ml-2' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXNavLink="http://www.w3.org/1999/xNavLink" viewBox="0 0 477.273 477.273" xmlSpace="preserve" stroke="#766f6f"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M450.658,266.295c-14.725-11.251-34.852-20.991-59.874-28.994v-13.08c0-83.895-68.253-152.147-152.147-152.147 S86.489,140.327,86.489,224.222v13.08c-25.023,8.003-45.15,17.744-59.875,28.994C9.203,279.599,0,294.957,0,310.71 c0,26.677,25.834,51.057,72.743,68.647c44.438,16.664,103.353,25.841,165.894,25.841s121.456-9.177,165.894-25.841 c46.909-17.591,72.743-41.97,72.743-68.647C477.273,294.957,468.07,279.599,450.658,266.295z M238.637,88.074 c75.072,0,136.147,61.076,136.147,136.147v18.98c0,0.038-0.001,0.076,0,0.115v10.022c-12.075,6.358-55.131,25.473-136.147,25.473 c-81.048,0-124.106-19.13-136.147-25.471v-29.119C102.489,149.15,163.564,88.074,238.637,88.074z M398.912,364.376 c-42.686,16.007-99.605,24.823-160.275,24.823s-117.59-8.815-160.275-24.823C38.729,349.515,16,329.955,16,310.71 c0-20.715,26.136-41.517,70.489-56.56v3.853c0,0.012,0,0.024,0,0.036v52.671c0,2.675,1.337,5.173,3.563,6.656 c1.848,1.232,46.434,30.173,148.585,30.173c33.396,0,64.133-3.108,91.356-9.237c4.311-0.971,7.019-5.251,6.048-9.562 c-0.97-4.31-5.249-7.019-9.562-6.047c-26.072,5.87-55.627,8.847-87.843,8.847c-81.033,0-124.097-19.126-136.147-25.47v-34.894 c19.645,8.888,63.224,23.635,136.147,23.635s116.503-14.747,136.147-23.635v34.911c-2.449,1.301-6.167,3.128-11.195,5.201 c-4.085,1.683-6.032,6.359-4.349,10.444c1.684,4.086,6.358,6.033,10.444,4.349c11.368-4.685,16.939-8.316,17.538-8.714 c2.225-1.484,3.562-3.981,3.562-6.656v-56.56c44.353,15.044,70.489,35.845,70.489,56.56 C461.273,329.955,438.544,349.515,398.912,364.376z"></path> </g></svg>

                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#766f6f]">Guide</span>
                    </NavLink>
                    <div className='md:order-2 relative'>
                        {
                            (!auth.isLoggedIn) ?
                                <Button variant="contained"
                                    sx={{ textTransform: 'none', backgroundColor: "#8a3ab9" }}
                                    onClick={() => navigate("/signin")}>Login</Button>
                                :
                                <div className="flex items-center space-x-3 md:space-x-0 rtl:space-x-reverse mr-4">
                                    <button
                                        type="button"
                                        onClick={handleMenuToggle}
                                        className="flex md:me-0 focus:text-[#8a3ab9] text-[#766f6f] cursor-pointer"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        {
                                            (auth?.user?.photoURL) ? (<img src={userImageUrl} alt='user-image' className="w-10 h-10 rounded-full" />) : (<FaUser className='h-5' />)
                                        }
                                    </button>
                                </div>
                        }

                        <div
                            className={`z-50 my-4 absolute right-3.5 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm ${menuOpen ? '' : 'hidden'}`}
                            id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 ">{auth?.user?.displayName}</span>
                                <span className="block text-sm  text-gray-500">{auth?.user?.email}</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <NavLink to="#" className="block px-4 py-2 text-sm text-gray-500">Dashboard</NavLink>
                                </li>
                                <li>
                                    <NavLink to="#" className="block px-4 py-2 text-sm text-gray-500">Settings</NavLink>
                                </li>
                                <li>
                                    <NavLink to="#" className="block px-4 py-2 text-sm text-gray-500">Earnings</NavLink>
                                </li>
                                <li>
                                    <Button variant="contained" color='error' sx={{ textTransform: "none" }} onClick={logout}>Logout</Button>
                                </li>
                            </ul>
                        </div>
                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                        {/* </div> */}

                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                            <li>
                                <NavLink to="/" className={({ isActive }) =>
                                    `block py-2 px-3 cursor-pointer rounded-sm ${isActive ? 'text-[#8a3ab9] font-semibold' : 'text-[#766f6f]'
                                    }`
                                } aria-current="page">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contribute" className={({ isActive }) =>
                                    `block py-2 px-3 cursor-pointer rounded-sm ${isActive ? 'text-[#8a3ab9] font-semibold' : 'text-[#766f6f]'
                                    }`
                                }>Contribute</NavLink>
                            </li>
                            <li className='relative' ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="block py-2 px-3 cursor-pointer rounded-sm text-[#766f6f] hover:text-[#8a3ab9] font-medium"
                                >
                                    List Your Shop ▾
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute top-15 left-0 bg-white  shadow-lg rounded-md w-48 z-50">
                                        <NavLink
                                            to="/listyourshop/register"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Register Shop
                                        </NavLink>
                                        <NavLink
                                            to="/listyourshop/dashbord"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Owner Dashboard
                                        </NavLink>
                                    </div>
                                )}
                            </li>
                            <li>
                                <NavLink to="#" className={({ isActive }) =>
                                    `block py-2 px-3 cursor-pointer rounded-sm ${isActive ? 'text-[#8a3ab9] font-semibold' : 'text-[#766f6f]'
                                    }`
                                }>Pricing</NavLink>
                            </li>
                            <li>
                                <NavLink to="#" className={({ isActive }) =>
                                    `block py-2 px-3 cursor-pointer rounded-sm ${isActive ? 'text-[#8a3ab9] font-semibold' : 'text-[#766f6f]'
                                    }`
                                }>Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar