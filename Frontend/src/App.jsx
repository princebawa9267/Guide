import './App.css'
import 'flowbite';
import Home from './Pages/Home';
import Contribute from './Pages/contribute';
import Selected_item from './Pages/selected_item';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Router from './router/Router';
import { ToastContainer } from "react-toastify"
import { useAppDispatch } from './state/store';
import { authenticate, setUser } from './state/auth/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './register';
import Locations from './Pages/LocationSearch/Locations';
import LocationSearchPage from './Pages/LocationSearch/LocationSearchPage';
import PrivateRoute from './router/PrivateRoute';
import UserVerification from './Pages/AuthPages/UserVerification';
import Items from './Pages/Items/Items';

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
      {/* <Router /> */}
      <Items/>
    </>
  )
}

export default App;
