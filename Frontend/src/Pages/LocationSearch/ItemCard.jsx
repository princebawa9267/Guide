import React from 'react'

const ItemCard = ({data}) => {
  return (
    <div className=''>
      <div className=''>
        <div>
            <div className="text-center text-xl">
                <h2>{data.name}</h2>
            </div>
            <div className='text-xl font-thin flex justify-center'>
            <span >{data.review} </span><span className=''>{data?.type || "Item Category"}</span>
            </div>
            <div className='text-lg text-center font-thin'>
                 <span>{data.exactLocation}</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
