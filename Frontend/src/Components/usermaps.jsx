import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fixing the marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Usermaps = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    let watchId; //watch id continously updating user longitude and latitude with watchposition html geolocation service

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
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
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
    <div className='w-[85vw] max-w-6xl h-[70vh] rounded-4xl nunito mx-auto mb-20 mt-2 shadow-2xl cursor-pointer'>
      <div className='top text-[#29264A] rounded-t-2xl text-center flex justify-center items-center h-15 w-full bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8]'>
        Where are You?
      </div>
      <div className='h-1 w-full bg-[#8a3ab9]'></div>
      <div className='w-full h-[87%] flex justify-center text-lg '>
        {position ? (
          <MapContainer center={position} zoom={13} className='w-full h-full rounded-b-4xl'>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <Marker position={position}>
              <Popup>You are here!</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p className='text-center text-gray-500'>Fetching your location...</p>
        )}
      </div>
    </div>
  );
};

export default Usermaps;
