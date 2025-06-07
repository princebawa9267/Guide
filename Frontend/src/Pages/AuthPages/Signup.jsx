import React from 'react'
import AuthFormat from './AuthFormat';
import { useFormik } from 'formik';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useEffect } from 'react';

const Signup = () => {

  

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      console.log("Form-Data ", values);
    }
  })

  return (
    <div>
      <AuthFormat type={"Sign Up"} />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='col-1 flex flex-col justify-center p-[20px] h-[55vh] space-y-5'>
          <div>
            <TextField fullWidth name='email' label="Email" value={formik.values.email} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
          </div>
          <div>
            <TextField fullWidth name='otp' label="Otp" value={formik.values.otp} error={formik.touched.otp && Boolean(formik.errors.otp)} helperText={formik.touched.otp && formik.errors.otp} />
          </div>
          <Button fullWidth variant='contained' sx={{ py: "11px" }}>Login</Button>
        </div>
      </div>
    </div>
  )
}

export default Signup;
