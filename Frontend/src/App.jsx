import './App.css'
import 'flowbite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Router from './router/Router';
import { ToastContainer } from "react-toastify"
import store, { useAppDispatch, useAppSelector } from './state/store';
import { authenticate, setUser } from './state/auth/authSlice';
import ProfilePage from './Pages/ProfilePages/ProfilePage';

function App() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({top : 0, behavior : "smooth"});
  },[location.pathname])

  useEffect(() => {
    // Check if user is authenticated
    dispatch(authenticate({navigate,dispatch}));
  }, [])


  return (
    <>
      <ToastContainer />
      <Router />
    </>
  )
}

export default App;
