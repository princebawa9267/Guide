import React, { use, useEffect } from 'react'
import { Person, MilitaryTech, Edit, Verified, NewReleases, AddAPhoto, AddPhotoAlternate } from '@mui/icons-material';
import { useAppSelector } from '../../state/store';
import Userreview from '../../Components/userreview';
import { CircularProgress } from '@mui/material';


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
    <div className='m-4'>
      <div className='border-b-2 rounded-lg border-[#8a3ab9] h-full border-dashed pb-2 mb-4 nunito'>
        <h2 className='font-extrabold text-2xl'>User Information</h2>
        <p className='text-gray-600 text-sm'>View your profile details here</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-5'>
        <div className='bg-white col-span-2 shadow-md p-4 rounded-lg '>
          <div className='border-dotted border-2 border-[#8a3ab9] rounded-lg p-4'>
            <h3 className='font-bold text-lg mb-2 text-center'>{auth.user?.displayName}</h3>
            <p className='text-green-800 text-sm text-center mt-[-12px]'>Premium user</p>
            <div className='flex justify-center mt-4'>
              <div className='flex relative justify-center border-2 rounded-[50%] border-[#8a3ab9] w-[120px] h-[120px]  md:w-[210px] md:h-[210px] items-center'>
                <img src={auth.user?.photoURL} alt="User Avatar" className='rounded-full w-[100px] h-[100px]  md:w-[200px] md:h-[200px]' />
                
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  style={{ display: "none" }}
                // onChange={handleImageChange}
                />
                <label  htmlFor="fileInput">
                  <div className='absolute bottom-0 right-[20%] bg-white p-2 rounded-full shadow-md'>
                  <AddAPhoto className='cursor-pointer text-black' style={{ fontSize: '25px' }} />
                </div>
                </label>
                {/* <Person className='text-gray-500' style={{ fontSize: '200px' }} /> */}
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white col-span-3 p-4 shadow-md rounded-lg'>
          <div className='border-dotted border-2 border-[#8a3ab9] rounded-lg h-full p-4'>
            <h3 className='font-bold text-lg mb-4'>Profile Details</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-3'>
                <div>
                  <p className='text-gray-600 text-sm'>Email Address</p>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <p className='text-gray-800 text-sm md:text-md'>{auth.user?.email}</p>
                    <Edit className='text-gray-500 cursor-pointer' style={{ fontSize: '17px' }} />
                  </div>
                </div>
                <div>
                  <p className='text-gray-600 text-sm'>Phone Number</p>
                  <div className='flex items-center gap-2'>
                    <p className='text-gray-800 text-sm md:text-md'>+91 1234567890</p>
                    <Edit className='text-gray-500 cursor-pointer' style={{ fontSize: '17px' }} />
                  </div>
                </div>
                <div>
                  <p className='text-gray-600 text-sm'>Address</p>
                  <div className='flex items-center gap-2'>
                    <p className='text-gray-800 text-sm md:text-md'>123 Main Street, City, Country</p>
                    <Edit className='text-gray-500 cursor-pointer' style={{ fontSize: '17px' }} />
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <div>
                  <p className='text-gray-600'>Status</p>
                  {
                    auth.user?.emailVerified ? <div className='flex items-center gap-2 text-sm md:text-md'><Verified className='text-blue-700' /><p className='text-blue-700 text-sm'>Verified</p></div> : <div className='flex items-center gap-2'><NewReleases className='text-red-700' /><p className='text-red-700'>Unverified</p></div>
                  }
                </div>
                <div>
                  <p className='text-gray-600 text-sm'>Badges</p>
                  <div className='flex items-center gap-2'>
                    <MilitaryTech className='text-green-800 text-xs ' />
                    <p className='text-green-800 text-xs '>Top Collaborator</p>
                  </div>
                </div>
                <div>
                  <p className='text-gray-600 text-sm mt-2'>Joined Date</p>
                  <p className='text-gray-800 text-sm md:text-md'>January 1, 2023</p>
                </div>
                <div>
                  <p className='text-gray-600 text-sm'>Level</p>
                  <p className='text-gray-800 text-sm md:text-md'>1st Level</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Userreview />
      </div>
    </div>
  )
}

export default ProfilePage;
