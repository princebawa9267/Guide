import React, { useState } from 'react'
import AuthFormat from "./AuthFormat";

// Form
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SignInWithGoogle from './SignInWithGoogle';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { loginUserWithEmailAndPassword } from '../../state/auth/authSlice';

import authImage from "../../assets/authentication-img.svg"; // Placeholder for image


const Signin = () => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { auth } = useAppSelector(store => store);

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
      dispatch(loginUserWithEmailAndPassword({ values: values, navigate: navigate }));
    }
  })


  return (
    <div>

      {/* Auth Format is upper portion  */}
      <AuthFormat type={"Sign In"} />

      <Grid container spacing={2} className="justify-center md:justify-around items-center">
        {/* Left side - Image */}
        <Grid item xs={false} md={6} lg={4}>
          <div className="hidden md:flex justify-center items-center h-full">
            <img src={authImage} alt="Authentication visual" className="object-cover h-[50vh] rounded-xl" />
          </div>
        </Grid>

        {/* Right side - Login Form */}
        <Grid item xs={12} md={6} lg={4}>
          <div className="flex w-full justify-center">
            <div className="flex flex-col w-[40vw] p-12 gap-5 bg-white shadow-lg rounded-2xl">

              <div className='flex justify-center text-3xl font-bold text-[#57326c]'>Sign in</div>

              {/* Email Input */}
                <div >
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </div>
              <div>

                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />

              </div>

              {/* Password Input */}


              {/* Login Button and Other Options */}
              <div className="space-y-2">
                <Button fullWidth variant="contained" onClick={formik.handleSubmit} sx={{ py: "11px" }}>
                  {auth.loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>

                <p className="text-center">or</p>
                <SignInWithGoogle />

                <div className="text-center">
                  <p>
                    Don’t have an account?{" "}
                    <Button onClick={() => navigate("/signup")} sx={{ textTransform: "none" }}>
                      Signup
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      {/* Container that contain signin content */}
    </div>
  )
}

export default Signin;
