import React, { useEffect } from 'react'
import AuthFormat from './AuthFormat'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../register';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../state/store';

const UserVerification = () => {

    const navigate = useNavigate();

    // const {auth} = useAppSelector(store => store);

    useEffect(() => {
        const userSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if(!user.emailVerified){
                    console.log("User is not verified yet")
                }
                else{
                    navigate("/");
                    console.log("User is verified")
                     toast.success("Account created successfully");
                }
                console.log("✅ User is logged in:", user.email);
                // You can set user in state or context here
            } else {
                console.log("❌ No user is logged in");
                // Redirect to login or show login UI
            }
        });
    }, [])

    return (
        <div className=''>
            <AuthFormat type={"Check Email 📧"} />
            <div className='flex justify-center items-center'>
                <div className='w-[200px] h-[200px] flex justify-items-center'>
                    Check your Email ✉ and verify using link
                </div>
            </div>
        </div>
    )
}

export default UserVerification
