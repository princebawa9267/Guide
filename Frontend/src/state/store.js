import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux";
// import {thunk} from 'redux-thunk';
import authSlice from "./auth/authSlice"

// 1. Combine your reducers here
const rootReducer = combineReducers({
    auth : authSlice,
});

// 2. Create the store
export const store = configureStore({
    reducer : rootReducer,


    // One Way
    // middleware : (getDefaultMiddleware) => 
    //     getDefaultMiddleware().concat(thunk)



    // Another way
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

// 3. Custom hooks (for convenience)
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;