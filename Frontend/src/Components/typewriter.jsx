import React from 'react'

const Typewriter = (props) => {
  return (
    <div className='text-white text-3xl font-semibold font-nunito'>
        <p className='overflow-x-hidden whitespace-nowrap border-r-2 border-white w-fit' style={{animation: 'typing 6s steps(40, end), blink 0.75s step-end infinite',
          whiteSpace: 'nowrap',
          overflow: 'hidden',}}>{props.line}</p>


     {/* Inline CSS for animations */}
      <style>
        {`
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }

          @keyframes blink {
            0%, 100% { border-color: transparent }
            50% { border-color: white }
          }
        `}
      </style>
      
    </div>
  )
}

export default Typewriter
