import React from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";

function MapComponent({ lat, lng, locationName }) {
  const location = {
    address: locationName,
    lat: lat,
    lng: lng,
  };
  return (
    <div className="w-full h-[60vh]">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        defaultCenter={location}
        defaultZoom={17}
      >
        <LocationPin />
      </GoogleMapReact>
    </div>
  );
}

export default MapComponent;
