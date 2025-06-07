import React from 'react'
import Navbar from '../Components/Navbar';
import Searchbar from '../Components/Searchbar';

const Home = () => {
    return (
        <>
            <div className='relative h-[100vh]'>
                <svg style={{ position: "absolute", display: "block",}} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 400" width={"100%"} height={"100vh"}>
                    <path d="M 0 50 Q 150 50 300 100 Q 650 200 800 150 L 800 0 L 0 0 Z" fill="#6ee7b7" />
                </svg>
                <div className='relative z-1 p-2 text-center'>
                    <Navbar/>
                </div>
                <div className='absolute mt-15 ml-10'>
                    <Searchbar/>
                </div>
            </div>
        </>

    )
}

export default Home;
