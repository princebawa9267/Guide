import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import markerone from '/src/assets/icons8-marker-50.png';
import markertwo from '/src/assets/icons8-marker-50 (1).png';

// Custom user location icon
const userIcon = L.icon({
    iconUrl: markerone,
    iconSize: [30, 30],
});

// Custom selected marker icon
const selectedIcon = L.icon({
    iconUrl: markertwo,
    iconSize: [30, 30],
});

// Routing component
const Routing = ({ from, to }) => {
    const map = useMap();

    useEffect(() => {
        if (
            !from ||
            !to ||
            from[0] === undefined ||
            from[1] === undefined ||
            to[0] === undefined ||
            to[1] === undefined
        )
            return;

        const routingControl = L.Routing.control({
            waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
            lineOptions: {
                styles: [{ color: 'purple', weight: 4 }],
            },
            routeWhileDragging: false,
            show: false,
            addWaypoints: false,
            createMarker: () => null,
        }).addTo(map);

        return () => {
            try {
                map.removeControl(routingControl);
            } catch (err) {
                console.warn('Failed to remove routing control:', err);
            }
        };
    }, [from, to, map]);

    return null;
};

const Selected_item_map = ({ latitude, longitude }) => {
    const [position, setPosition] = useState(null); // User location
    const [destinationPosition, setDestinationPosition] = useState(null); // Destination location

    useEffect(() => {
        // Validate lat/lng before setting
        if (
            latitude !== undefined &&
            longitude !== undefined &&
            !isNaN(latitude) &&
            !isNaN(longitude)
        ) {
            setDestinationPosition([latitude, longitude]);
        }
    }, [latitude, longitude]);

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
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, []);

    return (
        <>
            {position ? (
                <MapContainer center={position} zoom={13} className="w-full h-full">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {/* User marker */}
                    <Marker position={position} icon={userIcon}>
                        <Popup>Your Current Location</Popup>
                    </Marker>

                    {/* Destination marker */}
                    {destinationPosition &&
                        destinationPosition[0] !== undefined &&
                        destinationPosition[1] !== undefined && (
                            <Marker position={destinationPosition} icon={selectedIcon}>
                                <Popup>Destination</Popup>
                            </Marker>
                        )}

                    {/* Routing */}
                    {destinationPosition &&
                        destinationPosition[0] !== undefined &&
                        destinationPosition[1] !== undefined && (
                            <Routing from={position} to={destinationPosition} />
                        )}
                </MapContainer>
            ) : (
                <p className="text-center text-gray-500">Fetching your location...</p>
            )}
        </>
    );
};

export default Selected_item_map;
