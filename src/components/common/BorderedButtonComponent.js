import React from "react";

function BorderedButtonComponent({ onClick, style, children }) {
  return (
    <button
      className="bg-transperant rounded-lg w-fit text-white px-4 py-3 border  tracking-wider border-yellow-500 hover:bg-yellow-500"
      onClick={onClick ? onClick : null}
    >
      {children}
    </button>
  );
}

export default BorderedButtonComponent;
