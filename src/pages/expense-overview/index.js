import BorderedButtonComponent from '@/components/common/BorderedButtonComponent'
import ButtonComponent from '@/components/common/ButtonComponent'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import OverviewCard from '@/components/expenseOverviewComponents/OverviewCard'
import AddExpenseModal from '@/components/expenseOverviewComponents/AddExpenseModal'
import dayjs from 'dayjs'
import SalaryDetailModal from '@/components/expenseOverviewComponents/SalaryDetailModal'
import SelectMonthModal from '@/components/expenseOverviewComponents/SelectMonthModal'
import { useSearchParams } from 'next/navigation'

function ExpenseOverview() {

    const searchParams= useSearchParams()
  const [openAddExpense, setOpenAddExpense] = useState(false)
  const [openSalaryModal, setOpenSalaryModal] = useState(false)
  const [openSelectMonthModal, setOpenSelectMonthModal] = useState(false)
  // const [selectedMonth, setSelectedMonth] = useState()

  const closeAddExpenseModal=()=>{
    setOpenAddExpense(false)
  }
  const closeSalaryModal=()=>{
    setOpenSalaryModal(false)
  }
  const closeSelectMonthModal=()=>{
    setOpenSelectMonthModal(false)
  }
  useEffect(()=>{
    const currentMonthYear= searchParams.get("month")
    if(currentMonthYear){
      const allTransactions= JSON.parse(localStorage.getItem("transactionData")) || {}
      // const currentMonthYear= dayjs().format('YYYY-MM')
      console.log(currentMonthYear)
     const monthMatch= Object.keys(allTransactions).findIndex(item=>item===currentMonthYear)
     if(monthMatch==-1){
      setOpenSalaryModal(true)
     }
    }

  },[])

  return (
    <div className='w-full py-5 px-6'>
      <div className='flex justify-between items-center flex-wrap w-full mb-12'>
        <h2 className='text-white text-4xl tracking-wider font-semibold'>Overview</h2>
        <div className='flex justify-between items-center gap-3'>
            {
              typeof localStorage !== 'undefined' && JSON.parse(localStorage.getItem("transactionData")) &&
              <BorderedButtonComponent onClick={()=>setOpenSelectMonthModal(true)}>
              <p>Select month</p>
            </BorderedButtonComponent>
            }
            
            <ButtonComponent style={{paddingBottom:"0.5rem", paddingTop:"0.5rem"}} onClick={()=>setOpenAddExpense(true)}>
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
      <AddExpenseModal open={openAddExpense} onCloseModal={closeAddExpenseModal} title={"Add new expense"}/>
      <SalaryDetailModal open={openSalaryModal} onCloseModal={closeSalaryModal} title={"Enter salary & target"}/>
      <SelectMonthModal open={openSelectMonthModal} onCloseModal={closeSelectMonthModal} title={"Select a month"}/>
    </div>
  )
}

export default ExpenseOverview