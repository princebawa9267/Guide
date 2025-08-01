import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../state/store';

const PrivateRoute = ({children}) => {

    const {auth} = useAppSelector(store => store);
    useEffect(() => {
        console.log("Private Route Rendered");
        console.log("auth", auth);
    }, [auth]);


    // Redux store
    console.log("Private Route", auth);

    return auth?.notLoadedDataYet ? <div></div> : auth?.user ? (auth?.user.emailVerified ? children : <Navigate to="/user-verification" replace={true} />) : <Navigate to="/signin" replace={true} />
}

export default PrivateRoute;
