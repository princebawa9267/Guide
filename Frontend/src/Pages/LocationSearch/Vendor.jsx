import React from 'react'
import ItemLister from './Itemlister'

const Vendor = () => {

    // const vendor = [
    //     {
    //       image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
    //       name : "Ramesh Chemist Store",
    //       review : "💪",
    //       type : "Chemist",
    //       exactLocation : "North Indian, ShakeKhasra 538, Mauza Basai Mustkil, Tajganj, Agra"
    //     },
    //     {
    //       image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
    //       name : "Just only here Grocery",
    //       review : "🥰",
    //       type : "Grocery",
    //       exactLocation : "location"
    //     },
    //     {
    //       image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
    //       name : "Basnti Beauty Products",
    //       review : "😎",
    //       type : "Cosmetics",
    //       exactLocation : "location"
    //     },
    //     {
    //       image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
    //       name : "Taj hair Salon",
    //       review : "😊",
    //       type : "Salon & Cosmetics",
    //       exactLocation : "location"
    //     },
    //     {
    //       image : "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
    //       name : "Kajal Bakery",
    //       review : "😎",
    //       type : "Bakery",
    //       exactLocation : "location"
    //     },
    //   ]

    const vendor = [

    ]

     const line = "Vendor nearby you"
     const onNullMessage = "Not listed vendor nearby you yet — Be the First Explorer to Share!"

  return (
    <div>
      <ItemLister heading={line} items={vendor} onNullMessage={onNullMessage}/>
    </div>
  )
}

export default Vendor
