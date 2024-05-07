import React from 'react'

function ExpenseOverview() {
  return (
    <div className='flex justify-between items-center flex-wrap w-full py-5 px-6'>
        <h2 className='text-white text-3xl tracking-wider font-semibold'>Overview</h2>
        <div className='flex justify-between items-center gap-2'>
            <button>Select month</button>
            <button>All transactions</button>
            <button>+</button>
        </div>
    </div>
  )
}

export default ExpenseOverview