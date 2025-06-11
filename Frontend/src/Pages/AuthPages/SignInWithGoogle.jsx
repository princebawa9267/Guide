import React from 'react'
import { Button } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';

const SignInWithGoogle = () => {

    // Login with google
    const handleGoogleLogin = () => {
        console.log("Google login");
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
