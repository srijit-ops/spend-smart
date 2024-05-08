import React from 'react'

function ButtonComponent({onClick, children, style}) {
  return (
    <button className="bg-yellow-500 rounded-lg w-fit text-white tracking-wider px-4 py-3  hover:bg-yellow-600" onClick={onClick?onClick:null} style={{...style}}>
    {children}
  </button>
  )
}

export default ButtonComponent