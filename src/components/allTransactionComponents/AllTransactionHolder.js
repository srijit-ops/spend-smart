import { useSearchParams } from 'next/navigation'
import React from 'react'

function AllTransactionHolder() {
    const searchParams= useSearchParams()
    const currentMonthYear= searchParams.get("month")
    console.log(currentMonthYear)
  return (
    <div className='text-white'>AllTransactionHolder</div>
  )
}

export default AllTransactionHolder