import React from 'react'
import Navbar from '../../Components/Navbar'
import Typewriter from '../../Components/typewriter';

const AuthFormat = (props) => {

  const authType = props.type;

  return (
    <div className='relative'>
      {/* <svg style={{ position: "absolute", display: "block", transform: "scaleX(-1)", }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 400" width={"100%"} height={"100vh"}>
        <path d="M 0 50 Q 150 50 300 100 Q 650 200 800 150 L 800 0 L 0 0 Z" fill="#8a3ab9" />
      </svg>
      <div className='relative z-1 p-2 text-center'>
        <Navbar/>
      </div> */}
      {/* div contain design */}
        <div className='relative h-[40vh] flex flex-col gap-20'>

          {/* design  */}
          <svg
            className="absolute top-0 left-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 800 400"
          >
            <path d="M 0 350 C 200 400 500 400 800 300    L 800 0 L 0 0 Z" fill="#8a3ab9" />
          </svg>

          {/* Content inside SVG area */}
          <div className="relative z-10 p-2 text-center">
            <Navbar />
          </div>

          {/* Animated line/message */}
          {/* <div className="p-4 text-center relative mx-auto">
            <Typewriter line={authType} />
          </div> */}

          {/* <div className='items-center justify-center z-1 text-6xl font-extrabold text-white'>
            {authType}
          </div> */}

        </div>
      
    </div>
  )
}

export default AuthFormat
