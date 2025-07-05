import React from 'react'
import thinkingImg from '/src/assets/Thinking face-rafiki.png';
import ItemCard from './ItemCard'
import { useNavigate } from 'react-router-dom';

const ItemLister = ({items, heading,onNullMessage}) => {

  const navigate=useNavigate();
  const handleclick=()=>{
    navigate('/selected-item');
  }



  return (
    <div>
      <div className="w-[90vw] max-w-6xl h-auto rounded-3xl appear-apply nunito mx-auto mt-10 mb-10 bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8] shadow-2xl cursor-pointer p-6">
      {/* Heading */}
      <div className="text-[#29264A] text-2xl md:text-3xl font-bold text-center mb-2">
        {heading}
      </div>
      <div className="h-1 w-full bg-[#8a3ab9] rounded-full mb-4"></div>

      {/* Conditional rendering for reviews */}
      {items.length === 0 ? (
        <div className="w-full h-[50vh] flex flex-col justify-center items-center text-[#8a3ab9]">
          <img src={thinkingImg} alt="No reviews yet" className="h-[40%] opacity-80 mb-4" />
          <p className="text-lg font-semibold">{onNullMessage}</p>
        </div>
      ) : (
        <div className="w-full max-h-[55vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
          {items.map((data, index) => (
            <div
              onClick={handleclick}
              key={index}
              className="border-l-4 border-[#8a3ab9] bg-whitec cursor-pointer p-5 rounded-2xl shadow-md text-[#29264A] hover:scale-[1.02] transition-transform duration-300"
            >
              <ItemCard data={data}/>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  )
}

export default ItemLister
