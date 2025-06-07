import React from 'react'

const AuthFormat = () => {
  return (
    <div className='relative'>
      <svg style={{ position: "absolute", display: "block", transform: "scaleX(-1)", }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 400" width={"100%"} height={"100vh"}>
        <path d="M 0 50 Q 150 50 300 100 Q 650 200 800 150 L 800 0 L 0 0 Z" fill="#6ee7b7" />
      </svg>
      <div className='relative z-1 p-2 text-center'>
        <Navbar/>
      </div>
      <div className='relative z-1 text-6xl top-14 left-20 font-extrabold text-white'>
        Sign In
      </div>
    </div>
  )
}

export default AuthFormat
