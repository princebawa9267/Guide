import React from 'react'
import ItemLister from './Itemlister';

const Restaurant = () => {

    const restaurant = [
        {
          image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
          name : "Ganpati fast food",
          review : "💪",
          type : "Hamburger",
          exactLocation : "North Indian, ShakeKhasra 538, Mauza Basai Mustkil, Tajganj, Agra"
        },
        {
          image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
          name : "Burger King",
          review : "🥰",
          type : "Burgers",
          exactLocation : "location"
        },
        {
          image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
          name : "Hunger Point",
          review : "😎",
          type : "Fast Food",
          exactLocation : "location"
        },
        {
          image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
          name : "Boston & Co ",
          review : "😊",
          type : "American",
          exactLocation : "location"
        },
        {
          image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
          name : "Paiala Shahi Lassi",
          review : "😎",
          type : "Indian sweets shop",
          exactLocation : "location"
        },
        {
          image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
          name : "Gagz Food Point",
          review : "😎",
          type : "Fast Food",
          exactLocation : "location"
        },
        {
          image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
          name : "Vasta Food Factory",
          review : "😎",
          type : "Fast food",
          exactLocation : "location"
        },
        {
          image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
          name : "Xero Degrees",
          review : "😎",
          type : "Fast Foods",
          exactLocation : "location"
        },
      ];
      
      const line = "🥞🍔 Have some Delicious😋 with famous Restaurants";
      const onNullMessage = "No Restaurant listed Yet — Be the First Explorer to Share!";

  return (
    <div>
        <ItemLister heading={line} items={restaurant} onNullMessage={onNullMessage}/>
    </div>
  )
}

export default Restaurant
