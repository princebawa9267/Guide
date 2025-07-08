import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SearchedPage from '../Pages/SearchedPage'
import Home from '../Pages/Home'
import Signin from '../Pages/AuthPages/Signin'
import Signup from '../Pages/AuthPages/Signup'
import UserVerification from '../Pages/AuthPages/UserVerification'
import Contribute from '../Pages/contribute'
import Locations from '../Pages/LocationSearch/Locations'
import LocationSearchPage from '../Pages/LocationSearch/LocationSearchPage'
import Selected_item from '../Pages/selected_item'
import PrivateRoute from './PrivateRoute'
import { useAppSelector } from '../state/store'
import ItemLister from '../Pages/Items/ItemLister'

const Router = () => {

  const {auth} = useAppSelector(store => store);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/searched-page' element={<SearchedPage/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        {/* <Route */}
        <Route path='/contribute' element={
            <PrivateRoute>
              <Contribute/>
            </PrivateRoute>
          }></Route>
        <Route path='/user-verification' element={<UserVerification/>}></Route>
        <Route path='/searched-location' element={<ItemLister/>}></Route>
        <Route path="/selected-item/:restaurantId" element={<Selected_item />} />
      </Routes>
    </div>
  )
}

export default Router;