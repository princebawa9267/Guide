import React from 'react'
import LocationSearchPage from './LocationSearchPage'
import ItemLister from './Itemlister'

const Hotel = () => {

    const places = [
        {
          image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
          name : "Ramesh ka Dabha",
          review : "💪",
          exactLocation : "North Indian, ShakeKhasra 538, Mauza Basai Mustkil, Tajganj, Agra"
        },
        {
          image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
          name : "Basnti ka Dabha",
          review : "🥰",
          exactLocation : "location"
        },
        {
          image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
          name : "Ramkumar",
          review : "😎",
          exactLocation : "location"
        },
        {
          image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
          name : "Vipin kumar",
          review : "😊",
          exactLocation : "location"
        },
        {
          image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
          name : "Karan Aujla Dabha",
          review : "😎",
          exactLocation : "location"
        },
      ]
      const line = "Hotels 🏨 nearby your searched location📍";
      const onNullMessage = "No location Yet — Be the First Explorer to Share!";
  return (
    <div>
      <ItemLister heading={line} items={places} onNullMessage={onNullMessage}/>
    </div>
  )
}

export default Hotel
