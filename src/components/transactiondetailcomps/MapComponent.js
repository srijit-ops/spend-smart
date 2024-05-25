import React from 'react'
import GoogleMapReact from "google-map-react";
import LocationPin from './LocationPin';

function MapComponent({lat, lng, locationName}) {
    const location = {
        address: locationName,
        lat: lat,
        lng: lng,
      };
  return (
    <div className="w-full h-[60vh]">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB_ttiP6i1AVnRunsje9SU7LYn1Ldf7Ln0" }}
          defaultCenter={location}
          defaultZoom={17}>
          <LocationPin/>
        </GoogleMapReact>
      </div>
  )
}

export default MapComponent