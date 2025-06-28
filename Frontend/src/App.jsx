import './App.css'
import 'flowbite';

import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import Router from './router/Router';

import { ToastContainer } from "react-toastify"
import { useAppDispatch } from './state/store';
import { setUser } from './state/auth/authSlice';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './register';
import Locations from './Pages/LocationSearch/Locations';
import LocationSearchPage from './Pages/LocationSearch/LocationSearchPage';

function App() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user) {
          if (!user.emailVerified) {
            console.log("User email id is not verified yet")
          }
          else {
            navigate("/")
            const providerId = user.providerData[0]?.providerId;
            if (providerId === "password") {
              console.log("User Details ", user);
              const docRef = doc(db, "Users", String(user.uid));
              const docSnap = await getDoc(docRef);
              dispatch(setUser({
                uid: user.uid,
                email: user.email,
                displayName: `${docSnap.data().firstName} ${docSnap.data().lastName}`,
                emailVerified: user.emailVerified,
                photoURL: user.photoURL
              }))
            }
            else if (providerId === "google.com") {
              console.log("User Details with google", user);
              dispatch(setUser({
                uid: user?.uid,
                email: user?.email,
                displayName: user?.displayName,
                emailVerified: user?.emailVerified,
                photoURL: user?.photoURL
              })) 
            }
          }
        }
        else{
          dispatch(setUser(null));
        }
      }
    })
  }, [])


  return (
    <>
      <ToastContainer />
      <Router />
      {/* <LocationSearchPage/> */}
    </>
  )
}

export default App;
