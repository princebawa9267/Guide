import './App.css'
import 'flowbite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Router from './router/Router';
import { ToastContainer } from "react-toastify"
import { useAppDispatch } from './state/store';
import { authenticate, setUser } from './state/auth/authSlice';
import ItemLister from './Pages/Items/ItemLister';
import RadditSystem from './Pages/RadditPage/RadditSystem';

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
    <div className='realative'>
      <ToastContainer />
      <Router />
      {/* <RadditSystem /> */}
      {/* <ItemLister/> */}
    </div>
  )
}

export default App;
