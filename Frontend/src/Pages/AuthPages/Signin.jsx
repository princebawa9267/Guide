import React, { useState } from 'react'
import AuthFormat from "./AuthFormat";

// Form
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, CircularProgress, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SignInWithGoogle from './SignInWithGoogle';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { loginUserWithEmailAndPassword } from '../../state/auth/authSlice';


const Signin = () => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(store=> store);

  const [timeLeft, setTimeLeft] = useState(60);
  const [otpSent, setOtpSent] = useState(false);
  const [reSendOtp, setReSendOtp] = useState(false);


  // On Click of otp Action perform
  const sendOtp = () => {
    setOtpSent(true);
    setTimeLeft(60);
    startTimer();
  }
  // Timer for Otp
  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

// Validation Field
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginUserWithEmailAndPassword({values : values , navigate : navigate}));
    }
  })


  return (
    <div>

      {/* Auth Format is upper portion  */}
      <AuthFormat type={"Sign In"} />

      {/* Container that contain signin content */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='col-1 flex flex-col justify-center p-[20px] h-[67vh] space-y-5'>
          <div>
            <TextField fullWidth name='email' label="Email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
          </div>

          {/* Otp portion show only when otp is sent to user */}
          {/* {
            otpSent && <div>
              <TextField fullWidth name='otp' label="Otp" value={formik.values.otp} error={formik.touched.otp && Boolean(formik.errors.otp)} helperText={formik.touched.otp && formik.errors.otp} />
              <div className='flex justify-end'>
                <Button className={`${timeLeft > 0 ? 'text-[#A0A0A0]' : 'text-[#3B82F6]'}`} onClick={() => sendOtp()} disabled={timeLeft > 0}>
                  {timeLeft > 0 ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}
                </Button>
              </div>
            </div>
          } */}


          {/* Action button for send otp and login */}
          {/* <div>
            <Button fullWidth variant='contained' onClick={() => otpSent ? loginRequest() : sendOtp()} sx={{ py: "11px" }}>{(otpSent) ? "Login" : "Send Otp"}</Button>
          </div> */}

          <div>
            <TextField fullWidth type='password' name='password' label="Password" value={formik.values.password} onChange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} />
          </div>

          <div>
            <Button fullWidth variant='contained' onClick={formik.handleSubmit} sx={{ py: "11px" }}>{auth.loading ? <CircularProgress size={24} color='white'/> : "Login"}</Button>
            <p className='flex justify-center mt-1 mb-1'>or</p>
            <SignInWithGoogle/>
            {/* Already have account */}
            <div className='flex justify-center mt-2'><p>Don't have account? <Button onClick={() => navigate("/signup")} sx={{ textTransform: 'none' }} >Signup</Button></p></div>
          </div>

          {/* Create account */}
          {/* <div className='flex justify-center'><p>Don't have account? <Button onClick={() => navigate("/signup")}>Signup</Button></p></div> */}
        </div>
        <div className='hidden md:block md:col-1 lg:col-2'>
            {/* Here image can be placed.....👨‍💻 */}
        </div>
      </div>
    </div>
  )
}

export default Signin;
