import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import userIconImg from '/src/assets/icons8-marker-50.png';
import selectedIconImg from '/src/assets/icons8-marker-50 (1).png';

// Custom icons
const userIcon = L.icon({ iconUrl: userIconImg, iconSize: [30, 30] });
const selectedIcon = L.icon({ iconUrl: selectedIconImg, iconSize: [30, 30] });

const Usermap_form = ({ onLocationSelect, setFieldValue, initialLat, initialLng }) => {
    const [position, setPosition] = useState(null);         // user's live location
    const [markerPosition, setMarkerPosition] = useState(null); // marker location (editable)

    // 👇 When form loads with restaurant data (edit mode), set marker
    useEffect(() => {
        if (initialLat && initialLng) {
            const initialCoords = [parseFloat(initialLat), parseFloat(initialLng)];
            setMarkerPosition(initialCoords);
            onLocationSelect(initialCoords);
            setFieldValue("latitude", initialCoords[0]);
            setFieldValue("longitude", initialCoords[1]);
        }
    }, [initialLat, initialLng]);

    // 🔁 Track user live position only for centering map
    useEffect(() => {
        let watchId;

        if ('geolocation' in navigator) {
            watchId = navigator.geolocation.watchPosition(
                (pos) => {
                    const userLat = pos.coords.latitude;
                    const userLng = pos.coords.longitude;
                    setPosition([userLat, userLng]);
                },
                (err) => {
                    console.error('Error watching location:', err);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            console.log('Geolocation is not supported.');
        }

        return () => {
            if (watchId) navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const coords = [e.latlng.lat, e.latlng.lng];
                setMarkerPosition(coords);
                onLocationSelect(coords);
                setFieldValue("latitude", coords[0]);
                setFieldValue("longitude", coords[1]);
            },
        });
        return null;
    };

    return (
        <>
            {position ? (
                <MapContainer
                    center={markerPosition || position}
                    zoom={13}
                    className="w-full h-full rounded-b-3xl"
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapClickHandler />

                    {/* User's live location */}
                    <Marker position={position} icon={userIcon}>
                        <Popup>Your Current Location</Popup>
                    </Marker>

                    {/* Marker for selected or pre-filled location */}
                    {markerPosition && (
                        <Marker position={markerPosition} icon={selectedIcon}>
                            <Popup>Selected Location</Popup>
                        </Marker>
                    )}
                </MapContainer>
            ) : (
                <p className="text-center text-gray-500">📍 Fetching your location...</p>
            )}
        </>
    );
};

export default Usermap_form;
