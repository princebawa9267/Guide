import React from 'react';
import Hotel from './Hotel';
import Vendor from './Vendor';
import TouristPlaces from './TouristPlaces';
import Restaurant from './Restaurant';

const Locations = ({ locality }) => {
  return (
    <div>
      <Hotel locality={locality} />
      <Vendor locality={locality} />
      <TouristPlaces locality={locality} />
      <Restaurant locality={locality} />
    </div>
  );
};

export default Locations;
