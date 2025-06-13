import React from 'react'
import { CiSearch } from "react-icons/ci";

const Searchbar = () => {
    return (
        <>
            <form className="w-screen flex justify-center">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative w-1/2 flex items-center">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className=" w-full shadow-xl  p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-4xl bg-[#e3d3fa] focus:ring-white focus:border-white " placeholder="Search Mockups, Logos..." required />
                </div>

            </form>
            <div className='w-screen flex justify-center mt-3'>
            <button type="submit" className="text-white cursor-pointer shadow-xl bg-[#8a3ab9] px-8 py-3 rounded-3xl transform hover:scale-105 flex items-center gap-2 ">Search<CiSearch /></button>
            </div>
        </>
    )
}

export default Searchbar;
