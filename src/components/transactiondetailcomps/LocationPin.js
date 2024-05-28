import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function LocationPin() {
  return (
    <div className="flex items-center">
      <FontAwesomeIcon icon={faLocationDot} className="text-4xl text-red-600" />
    </div>
  );
}

export default LocationPin;
