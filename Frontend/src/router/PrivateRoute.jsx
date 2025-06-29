import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../state/store';

const PrivateRoute = ({children}) => {

    // Redux store
    const {auth} = useAppSelector(store => store);
    console.log("Private Route", auth);

    return auth?.isLoggedIn ? children : <Navigate to="/signin" replace={true} />
}

export default PrivateRoute;
