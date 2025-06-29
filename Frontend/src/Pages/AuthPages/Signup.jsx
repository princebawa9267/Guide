import AuthFormat from './AuthFormat';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authImage from "../../assets/authentication-img.svg"; // Placeholder for image

// Form imports
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Firebase setup
import SignInWithGoogle from './SignInWithGoogle';

// Redux setup
import { useAppDispatch, useAppSelector } from '../../state/store';
import { createAccountWithEmailAndPassword } from '../../state/auth/authSlice';


const Signup = () => {

  // React-router navigate function
  const navigate = useNavigate();

  const { auth } = useAppSelector(store => store);

  // Validation
  const validationSchema = Yup.object({
    fName: Yup.string()
      .required("First name is required")
      .min(2, "Too short")
      .max(20, "Too long"),

    lName: Yup.string()
      .required("Last name is required")
      .min(2, "Too short")
      .max(20, "Too long"),

    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),

    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Redux useDispatch()
  const dispatch = useAppDispatch();


  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Values : ", values);
      dispatch(createAccountWithEmailAndPassword({ values: values, navigate: navigate }));
    }
  })

  return (
    <div>

      {/* Auth Format is upper portion */}
      <AuthFormat type={"Sign Up"} />
      <Grid container spacing={2} className="justify-center md:justify-around items-center min-h-screen">

        {/* Left side - Image */}
        <Grid item xs={false} md={6} lg={4}>
          <div className="hidden md:flex justify-center items-center h-full">
            <img src={authImage} alt="Authentication visual" className="object-cover h-[50vh] rounded-xl" />
          </div>
        </Grid>

        {/* Right side - Login Form */}
        <Grid item xs={12} md={6} lg={4}>
          <div className="flex w-full justify-center">
            <div className="flex flex-col w-full p-12 gap-5 bg-white shadow-lg rounded-2xl">
              <div className='flex justify-center text-3xl font-bold text-[#57326c]'>Sign up</div>

              <div className='grid grid-col-1 md:grid-cols-2 gap-x-4'>
                <TextField name="fName" label="First Name" value={formik.values.fName} onChange={formik.handleChange} error={formik.touched.fName && Boolean(formik.errors.fName)} helperText={formik.touched.fName && formik.errors.fName} required />
                <TextField name="lName" label="Last Name" values={formik.values.lName} onChange={formik.handleChange} error={formik.touched.lName && Boolean(formik.errors.lName)} helperText={formik.touched.lName && formik.errors.lName} required />
              </div>

              {/* Email Input */}
              <div>
                <TextField fullWidth type='email' name='email' label="Email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} required />
              </div>

              {/* Password */}
              <div>
                <TextField fullWidth type='password' name='password' label="Password" onChange={formik.handleChange} value={formik.values.password} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} required />
              </div>

              {/* Confirm Password */}
              {/* <div>
                <TextField fullWidth type='password' name='c' label="Password" onChange={formik.handleChange} value={formik.values.password} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} required />
              </div> */}

              {/* Buttons */}
              <div>
                <Button fullWidth variant='contained' onClick={formik.handleSubmit} sx={{ py: "11px" }}>{auth.loading ? <CircularProgress size={24} color='white' /> : "Register"}</Button>
                <p className='flex justify-center mt-1 mb-1'>or</p>
                <SignInWithGoogle />
                {/* Already have account */}
                <div className='flex justify-center mt-2'><p>Have account?<Button onClick={() => navigate("/signin")} sx={{ textTransform: 'none' }} >Signin</Button></p></div>
              </div>

            </div>
          </div>
        </Grid>


      </Grid>
    </div>
  )
}

export default Signup;
