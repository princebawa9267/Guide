import React, { use, useEffect } from 'react'
import { Person, MilitaryTech, Edit, Verified, NewReleases, AddAPhoto, AddPhotoAlternate } from '@mui/icons-material';
import { useAppSelector } from '../../state/store';
import Userreview from '../../Components/userreview';
import { CircularProgress } from '@mui/material';
import Navbar from '../../Components/Navbar';
import Typewriter from '../../Components/typewriter';
import Footer from '../../Components/Footer';


const ProfilePage = () => {

  const { auth } = useAppSelector(store => store);

  useEffect(() => {
    console.log("User Authenticated:", auth.user);
  }, [auth.user]); // Log user authentication status when it changes

  const handleImageUpload = async (event) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "guide images");

    const res = await fetch("https://api.cloudinary.com/v1_1/dbvy9i1sq/image/upload", {
      method: "POST",
      body: data,
    });

    const file = event.target.files[0];
  }


  return (



    <div className=' overflow-hidden'>

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
          <Typewriter line="Plot routes. Save memories. Travel smart." />
        </div>

      </div>


      {/* mian */}
      <div className="w-[90%] mx-auto">
        {/* Header */}
        <div className="border p-2 rounded-lg border-[#8a3ab9] border-dashed pb-2 mb-6 nunito">
          <h2 className="font-extrabold text-2xl text-[#8a3ab9] tracking-wider">User Information</h2>
          <p className="text-gray-600 text-sm">View your profile details here</p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-4">

          {/* User Card */}
          <div className="col-span-2 bg-white shadow-lg p-5 rounded-xl border border-[#e5e5e5] hover:shadow-2xl transition-shadow duration-300">
            <div className="border-dotted border-2 border-[#8a3ab9] rounded-xl p-5">
              <h3 className="font-bold text-lg mb-1 text-center text-gray-800">{auth.user?.displayName}</h3>

              {/* Avatar */}
              <div className="flex justify-center mt-6 relative">
                <div className="relative border-4 border-[#8a3ab9] rounded-full p-1 w-[120px] h-[120px] md:w-[210px] md:h-[210px] flex items-center justify-center shadow-md hover:shadow-xl transition-shadow">
                  <img
                    src={auth.user?.photoURL}
                    alt="User Avatar"
                    className="rounded-full object-cover w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    hidden
                  // onChange={handleImageChange}
                  />
                  <label htmlFor="fileInput" className="absolute bottom-2 right-[15%]">
                    <div className="bg-white p-2 rounded-full shadow-md hover:shadow-lg cursor-pointer">
                      <AddAPhoto className="text-[#8a3ab9]" style={{ fontSize: '24px' }} />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="col-span-3 bg-white shadow-lg rounded-xl p-6 border border-[#e5e5e5] hover:shadow-2xl transition-shadow duration-300">
            <div className="border-dotted border-2 border-[#8a3ab9] rounded-xl h-full p-5">
              <h3 className="font-bold text-lg mb-5 text-gray-800">Profile Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Email Address</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-gray-800 text-md">{auth.user?.email}</p>
                      <Edit className="text-[#8a3ab9] cursor-pointer" style={{ fontSize: '17px' }} />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Phone Number</p>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-800 text-md">+91 1234567890</p>
                      <Edit className="text-[#8a3ab9] cursor-pointer" style={{ fontSize: '17px' }} />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Address</p>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-800 text-md">123 Main Street, City, Country</p>
                      <Edit className="text-[#8a3ab9] cursor-pointer" style={{ fontSize: '17px' }} />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-4">
                 
                  <div>
                    <p className="text-gray-600 text-sm">Badges</p>
                    <div className="flex items-center gap-2">
                      <MilitaryTech className="text-green-700 text-sm" />
                      <p className="text-green-700 text-sm">Top Collaborator</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Joined Date</p>
                    <p className="text-gray-800 text-sm md:text-md">January 1, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Userreview />
      </div>
      <Footer />
    </div>
  )
}

export default ProfilePage;
