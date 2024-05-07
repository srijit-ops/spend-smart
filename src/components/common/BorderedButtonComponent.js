import React from 'react'

function BorderedButtonComponent({name, onClick, style}) {
  return (
    <button className="bg-transperant rounded-lg w-fit text-white px-4 py-3 border  tracking-wider border-yellow-500 hover:bg-yellow-500" onClick={onClick?onClick:null}>
          {name}
    </button>
  )
}

export default BorderedButtonComponent