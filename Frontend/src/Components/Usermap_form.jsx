import  { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';



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

const Usermap_form = ({ onLocationSelect, setFieldValue }) => {
    const [position, setPosition] = useState(null);//store user location
    const [markerPosition, setMarkerPosition] = useState(null);//store selected location

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
            console.log('Geolocation is not supported.');
        }
    }, []);

    const MapClickHandler = () => { //use to set selected location
        useMapEvents({
            click(e) {
                const coords = [e.latlng.lat, e.latlng.lng];
                setMarkerPosition(coords);
                onLocationSelect(coords); // Send coords to parent
                setFieldValue("latitude", coords[0]);
                setFieldValue("longitude", coords[1]);
            },
        });
        return null;
    };

    return (
        <>
            {position ? (
                <MapContainer  center={position} zoom={13} className=" w-full h-full rounded-b-3xl">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapClickHandler />

                    {/* User's current location */}
                    <Marker position={position} icon={userIcon}>
                        <Popup>Your Current Location</Popup>
                    </Marker>

                    {/* Dropped marker */}
                    {markerPosition && (
                        <Marker position={markerPosition} icon={selectedIcon}>
                            <Popup>Selected Location</Popup>
                        </Marker>
                    )}
                </MapContainer>
            ) : (
                <p className="text-center text-gray-500">Fetching your location...</p>
            )}
        </>
    );
};

export default Usermap_form;
