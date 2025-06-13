import React from 'react'
import { Button } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { useAppDispatch } from '../../state/store';
import { signInWithGoogle } from '../../state/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const SignInWithGoogle = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch()

    // Login with google
    const handleGoogleLogin = () => {
        dispatch(signInWithGoogle({navigate : navigate}))
    }

    return (
        <div>
            <Button fullWidth sx={{ textTransform: 'none', py: "11px" }} variant="outlined" onClick={handleGoogleLogin}>
                <FcGoogle className="mr-2 size-5" /> Continue with Google
            </Button>
        </div>
    )
}

export default SignInWithGoogle;
