import BorderedButtonComponent from '@/components/common/BorderedButtonComponent'
import ButtonComponent from '@/components/common/ButtonComponent'
import React, { useState } from 'react'
import Link from 'next/link'
import OverviewCard from '@/components/expenseOverviewComponents/OverviewCard'
import AddExpenseModal from '@/components/expenseOverviewComponents/AddExpenseModal'


function ExpenseOverview() {

  const [open, setOpen] = useState(false)

  const onCloseModal=()=>{
    setOpen(false)
  }

  return (
    <div className='w-full py-5 px-6'>
      <div className='flex justify-between items-center flex-wrap w-full mb-12'>
        <h2 className='text-white text-4xl tracking-wider font-semibold'>Overview</h2>
        <div className='flex justify-between items-center gap-3'>
            <BorderedButtonComponent>
              <p>Select month</p>
            </BorderedButtonComponent>
            <ButtonComponent style={{paddingBottom:"0.5rem", paddingTop:"0.5rem"}} onClick={()=>setOpen(true)}>
              <p className='flex justify-center items-center gap-1'> <span className='text-2xl'>+</span> Add expense</p>
            </ButtonComponent>
            {/* <button>All transactions</button> */}
        </div>
    </div>
    <div className='flex justify-between items-center flex-wrap my-7'>
          <h3 className='text-2xl tracking-wide text-gray-400'>May, 2024</h3>
          <p className=' text-yellow-500 tracking-wide'>See all transcations</p>
        </div>
      <div className='flex justify-between items-center flex-wrap gap-4'>
       {
       [1,2,3,4,5].map((item)=>{ //total income, fixed salary (editabel), total expense until now, target savings(editable), total savings until now 
        return (
          <div className='w-[18%]'>
          <OverviewCard cardTitle={"Total income"} value={50000}/> 
          </div>
        )
       })
}
      </div>
      <div className='mt-10'>
      <h3 className='text-2xl tracking-wide text-gray-400'>Analytics</h3>
      <div className='flex justify-between items-center flex-wrap mt-6'>
          <div className='w-5/12'>
            <h5 className='text-white tracking-wide text-lg font-semibold mb-6'>
              Income VS. Expense
            </h5>
            <div className='text-white'>graph</div>
          </div>
          <div className='w-5/12'>
            <h5 className='text-white tracking-wide text-lg font-semibold mb-6'>
              Expense domains analytics
            </h5>
            <div className='text-white'>pie graph</div>
          </div>
      </div>
      </div>
      <AddExpenseModal open={open} onCloseModal={onCloseModal} title={"Add new expense"}/>
    </div>
  )
}

export default ExpenseOverview