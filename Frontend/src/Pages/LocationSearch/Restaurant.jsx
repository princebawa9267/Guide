import React, { useEffect, useState } from 'react';
import ItemLister from './Itemlister';
import axios from 'axios';

const Restaurant = ({ locality }) => {
  const [places, setPlaces] = useState([]);
  const line = "Restaurants 🍽️ nearby your searched location📍";
  const onNullMessage = "No restaurants yet — be the first to explore!";

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!locality) return;

      try {
        const res = await axios.get('http://localhost:3000/restaurants?locality=' + locality);
        setPlaces(res.data);
      } catch (err) {
        console.error(err);
        setPlaces([]);
      }
    };

    fetchRestaurants();
  }, [locality]);

  return (
    <div>
      <ItemLister heading={line} items={places} onNullMessage={onNullMessage} />
    </div>
  );
};

export default Restaurant;
