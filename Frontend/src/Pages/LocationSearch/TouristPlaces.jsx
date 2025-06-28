import React from 'react'
import ItemLister from './Itemlister';

const TouristPlaces = () => {

    // const TouristPlace = [
    //     {

    //     },
    //     {

    //     },
    //     {

    //     },
    // ]

    const touristPlace = [
        {
            image: "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
            name: "Patiala Heritage Walk",
            type : "Palace",
            review: "💪",
            exactLocation: "North Indian, ShakeKhasra 538, Mauza Basai Mustkil, Tajganj, Agra"
        },
        {
            image: "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
            name: "Gurdwara Dukh Nivaran Sahib",
            review: "🥰",
            type : "Gurudwara Sahib",
            exactLocation: "location"
        },
        {
            image: "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
            name: "Kali temple ",
            review: "😎",
            type : "Temple",
            exactLocation: "location"
        },
        {
            image: "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
            name: " Baradari Garden",
            review: "😊",
            type : "Garden",
            exactLocation: "location"
        },
        {
            image: "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
            name: "PVR",
            review: "😎",
            type : "Mall",
            exactLocation: "location"
        },
        {
            image: "https://media.gettyimages.com/id/2169257209/photo/daily-life-in-bazpur.jpg?s=2048x2048&w=gi&k=20&c=WAnD-NRO-SkevhdQKJB_zXOmBySPlRHCkDDpoOWQdc4=",
            name: "Omaxe Mall",
            review: "😎",
            type : "Mall",
            exactLocation: "location"
        }
    ]

    const line = "Most🎈 famous✨ places nearby you"
    const onNullMessage = "Yet, no tourist place is listed — Be the First Explorer to Share!"

    return (
        <div>
            <ItemLister heading={line} items={touristPlace} onNullMessage={onNullMessage} />
        </div>
    )
}

export default TouristPlaces;
