import React, { useEffect, useState } from 'react'
import AuthFormat from './AuthFormat'
import { getAuth, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../register';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { Button } from '@mui/material';
import { updateEmailVerified } from '../../state/auth/authSlice';

const UserVerification = () => {

    const navigate = useNavigate();

    const auth = getAuth();
    const user = auth.currentUser;
    const [isVerified, setIsVerified] = useState(user?.emailVerified);
    const [checking, setChecking] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    const dispatch = useAppDispatch();

    const checkVerificationStatus = async () => {
        if (!user) return;
        setChecking(true);
        await user.reload(); // Refresh user data from Firebase
        setIsVerified(user.emailVerified);
        setChecking(false);
    };

    const resendVerification = async () => {
    if (!user) return;
    try {
      await sendEmailVerification(user);
      console.log("Verification email sent");
      alert("Verification email resent!");
      setResendCooldown(60); // 60-second cooldown

      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Resend Error:", error);
      alert(error.message);
      }
  };

    useEffect(() => {
        const userSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!user.emailVerified) {
                    console.log("User is not verified yet")
                }
                else {
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

   const [timeLeft, setTimeLeft] = useState(60); // how long to keep checking (in seconds)

   useEffect(() => {
    if (!user || isVerified) return;

    const checkInterval = 3000; // every 3 seconds
    const maxDuration = 60;     // stop after 60 seconds
    let totalTime = 0;

    const intervalId = setInterval(async () => {
      try {
        await auth.currentUser.reload(); // refresh user data from Firebase
        dispatch(updateEmailVerified(user.emailVerified));
        console.log("Checking emailVerified:", user.emailVerified);
        const updatedStatus = user.emailVerified;
        console.log("Checking emailVerified:", updatedStatus);
        if (updatedStatus) {
          setIsVerified(true);
            navigate("/"); // Redirect to home if verified
          clearInterval(intervalId);
        } else {
          totalTime += checkInterval / 1000;
          setTimeLeft(maxDuration - totalTime);
          if (totalTime >= maxDuration) {
            clearInterval(intervalId);
          }
        }
      } catch (error) {
        console.error("Error reloading user:", error);
        clearInterval(intervalId);
      }
    }, checkInterval);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [user, isVerified]);

  

    return (
        <div className=''>
            <AuthFormat type={"Check Email 📧"} />
            <div className='flex justify-center items-center'>
                <div className='w-[50vw]  flex flex-col justify-items-center text-center items-center gap-4 bg-white rounded-lg shadow-lg p-6'>
                    <h1 className='text-2xl font-bold text-center'>📬 User Verification</h1>
                    Your account is not verified yet. Please check your email for the verification link.
                    <br />
                    If you haven't received the email, please check your spam folder or click on the resend verification👇
                    <Button className='!capitalize' onClick={resendVerification} disabled={resendCooldown > 0}>
                        {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Verification Email"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UserVerification;
