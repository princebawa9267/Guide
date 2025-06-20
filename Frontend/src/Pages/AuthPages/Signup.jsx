import AuthFormat from './AuthFormat';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  
  const {auth} = useAppSelector(store => store);

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
      console.log("Values : ",values);
      dispatch(createAccountWithEmailAndPassword({values : values, navigate : navigate}));
    }
  })

  return (
    <div>

      {/* Auth Format is upper portion */}
      <AuthFormat type={"Sign Up"} />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='col-1 flex flex-col justify-center p-[20px] h-[67vh] space-y-5'>

          {/* First Name and Last name of user */}
          <div className='grid grid-col-1 md:grid-cols-2 gap-x-4'>
            <TextField name="fName" label="First Name" value={formik.values.fName} onChange={formik.handleChange} error={formik.touched.fName && Boolean(formik.errors.fName)} helperText={formik.touched.fName && formik.errors.fName} required />
            <TextField name="lName" label="Last Name" values={formik.values.lName} onChange={formik.handleChange} error={formik.touched.lName && Boolean(formik.errors.lName)} helperText={formik.touched.lName && formik.errors.lName} required />
          </div>
          {/* Email Address */}
          <div>
            <TextField fullWidth type='email' name='email' label="Email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} required />
          </div>
          {/* Password */}
          <div>
            <TextField fullWidth type='password' name='password' label="Password" onChange={formik.handleChange} value={formik.values.password} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} required />
          </div>
          {/* <div>
            <TextField fullWidth type='password' name='password' label="Password" onChange={formik.handleChange} value={formik.values.password} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && Boolean(formik.errors.password)} required/>
          </div> */}

          <div>
            <Button fullWidth variant='contained' onClick={formik.handleSubmit} sx={{ py: "11px" }}>{auth.loading ? <CircularProgress size={24} color='white'/> : "Register"}</Button>
            <p className='flex justify-center mt-1 mb-1'>or</p>
            <SignInWithGoogle />
            {/* Already have account */}
            <div className='flex justify-center mt-2'><p>Have account?<Button onClick={() => navigate("/signin")} sx={{ textTransform: 'none' }} >Signin</Button></p></div>
          </div>


        </div>

        <div className='hidden md:block md:col-1 lg:col-2'>

        </div>
      </div>
    </div>
  )
}

export default Signup;
