import React from 'react'
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';//libaray for router
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Custom user location icon
const userIcon = L.icon({
    iconUrl: './src/assets/icons8-marker-50.png', // Make sure this file exists
    iconSize: [30, 30],
});

// Custom selected marker icon
const selectedIcon = L.icon({
    iconUrl: './src/assets/icons8-marker-50 (1).png', // Make sure this file exists
    iconSize: [30, 30],
});


// Component to add the route to the map //eg of component in component
const Routing = ({ from, to }) => {
    const map = useMap();

    useEffect(() => {
        if (!from || !to) return;

        const routingControl = L.Routing.control({
            waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])], //setting route from start to end
            lineOptions: {
                styles: [{ color: 'purple', weight: 4 }],
            },
            routeWhileDragging: false, //Don't update the route live if the user drags points.
            show: false, //Hides the directions panel by default (you only see the line on the map).
            addWaypoints: false,//Prevents users from clicking and adding intermediate points.

            // ✅ Prevent leaflet-routing-machine from adding its own markers
            createMarker: () => null,

        }).addTo(map);

        return () => {
            map.removeControl(routingControl);//This cleans up the route when the component re-renders or unmounts. Without this, multiple routes could stack up if state updates.
        };
    }, [from, to, map]);

    return null;//This component doesn't render any visible JSX — it just interacts with the Leaflet map, so null is returned.
};


const Selected_item_map = ({ latitude, longitude }) => {

    const [position, setPosition] = useState(null);//store user location
    const [destinationPosition, setdestinationPosition] = useState([31.4371263, 75.5761829]);//store destination

    useEffect(() => {
        if ('geolocation' in navigator) { //use to fetch user location
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const userLat = pos.coords.latitude;
                    const userLng = pos.coords.longitude;
                    setPosition([userLat, userLng]);
                    console.log('Latitude:', userLat);
                    console.log('Longitude:', userLng);
                },
                (err) => {
                    console.error('Error fetching location:', err);
                }
            );
        } else {
            console.log('Geolocation is not supported.'),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        }
    }, []);

    return (
        <>
            {position ? (
                <MapContainer center={position} zoom={13} className='w-full h-full '>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {/* User's current location */}
                    <Marker position={position} icon={userIcon}>
                        <Popup>Your Current Location</Popup>
                    </Marker>

                    {/* destination */}
                    {destinationPosition && (
                        <Marker position={destinationPosition} icon={selectedIcon}>
                            <Popup>Destination</Popup>
                        </Marker>
                    )}

                    {/* Route between user and destination */}
                    <Routing from={position} to={destinationPosition} />



                </MapContainer>
            ) : (
                <p className="text-center text-gray-500">Fetching your location...</p>
            )}

        </>
    )
}

export default Selected_item_map
