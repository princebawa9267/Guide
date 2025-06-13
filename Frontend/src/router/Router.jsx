import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SearchedPage from '../Pages/SearchedPage'
import Home from '../Pages/Home'
import Signin from '../Pages/AuthPages/Signin'
import Signup from '../Pages/AuthPages/Signup'
import UserVerification from '../Pages/AuthPages/UserVerification'
import Contribute from '../Pages/contribute'

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/searched-page' element={<SearchedPage/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/contribute' element={<Contribute/>}></Route>
        <Route path='/user-verification' element={<UserVerification/>}></Route>
      </Routes>
    </div>
  )
}

export default Router;
