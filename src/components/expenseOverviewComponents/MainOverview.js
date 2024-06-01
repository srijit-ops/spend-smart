import BorderedButtonComponent from '../common/BorderedButtonComponent'
import ButtonComponent from '../common/ButtonComponent'
import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
import OverviewCard from './OverviewCard'
import AddExpenseModal from './AddExpenseModal'
import dayjs from 'dayjs'
import SalaryDetailModal from './SalaryDetailModal'
import SelectMonthModal from './SelectMonthModal'
import { useSearchParams } from 'next/navigation'


function MainOverview() {
    const searchParams= useSearchParams()
    const currentMonthYear= searchParams.get("month")

const [openAddExpense, setOpenAddExpense] = useState(false)
const [openSalaryModal, setOpenSalaryModal] = useState(false)
const [openSelectMonthModal, setOpenSelectMonthModal] = useState(false)
// const [totalIncome, setTotalIncome] = useState(0)
// const [totalExpense, setTotalExpense] = useState(0)

// const [selectedMonth, setSelectedMonth] = useState()

const salary= typeof localStorage !== 'undefined' && JSON.parse(localStorage.getItem("transactionData"))?.[currentMonthYear]?.salary
const targetSaving= typeof localStorage !== 'undefined' && ((JSON.parse(localStorage.getItem("transactionData"))?.[currentMonthYear]?.targetPercentage)/100)*salary
let totalIncome= salary
let totalExpense= 0

// const newTotalIncome= typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem("transactionData"))?.[currentMonthYear]?.transactions.forEach(item=>{
//   if(item.expenseType==='credit'){
//     totalIncome += item.amount
//   }
//   return totalIncome
// }) : totalIncome

if(typeof localStorage !== 'undefined'){
JSON.parse(localStorage.getItem("transactionData"))?.[currentMonthYear]?.transactions.forEach(item=>{
  if(item.expenseType==='credit'){
    totalIncome += item.amount
  }
  
})
// return totalIncome
// totalIncome += salary
}

if(typeof localStorage !== 'undefined'){
  JSON.parse(localStorage.getItem("transactionData"))?.[currentMonthYear]?.transactions.forEach(item=>{
    if(item.expenseType==='debit'){
      totalExpense += item.amount
    }
    
  })
  // return totalIncome
  }

// console.log(newTotalIncome)
let remainingBal= [(totalIncome-targetSaving)-totalExpense]

const cards= [
  {
    name:"Total income",
    value: totalIncome,
    info:"Monthly salary + other incomes"
  },
  {
    name:"Total expense",
    value:totalExpense,
    info:"Total money spent till now"
  },
  {
    name:"Remaining balance",
    value: remainingBal,
    info:"Remaining money to spend except target saving"
  },
  {
    name:"Target savings",
    value:targetSaving,
    info:"The amount to be invested"
  },
  {
    name:"Monthly salary",
    value:salary,
    info:"Fixed monthly income"
  },
]

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

  if(currentMonthYear){
    const allTransactions= JSON.parse(localStorage.getItem("transactionData")) || {}

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
          {
            dayjs().format('YYYY-MM')=== currentMonthYear &&
            <ButtonComponent style={{paddingBottom:"0.5rem", paddingTop:"0.5rem"}} onClick={()=>setOpenAddExpense(true)}>
            <p className='flex justify-center items-center gap-1'> <span className='text-2xl'>+</span> Add expense</p>
          </ButtonComponent>
          }
          
          {/* <button>All transactions</button> */}
      </div>
  </div>
  {/* { console.log(JSON.parse(localStorage.getItem("transactionData"))[currentMonthYear].transactions.length)} */}
  {
   
    (typeof localStorage === 'undefined' || !JSON.parse(localStorage.getItem("transactionData")) || (JSON.parse(localStorage.getItem("transactionData"))?.[currentMonthYear]?.transactions?.length===0) || typeof (JSON.parse(localStorage.getItem("transactionData"))?.[currentMonthYear]) === 'undefined') ?
    <div className='flex justify-center items-center mt-28 font-semibold'>
              <p className='text-gray-500 text-2xl tracking-wider'>No data available</p>
    </div>
    :
    <div>
  <div className='flex justify-between items-center flex-wrap my-7'>
        <h3 className='text-2xl tracking-wide text-gray-400'>{dayjs(currentMonthYear).format('MMM, YYYY')}</h3>
        <p className=' text-yellow-500 tracking-wide'>See all transcations</p>
      </div>
    <div className='flex justify-between items-stretch flex-wrap gap-4'>
     {
     cards.map((item)=>{ //total income, fixed salary (editabel), total expense until now, target savings(editable), total savings until now 
      return (
        <div className='w-[18%] self-stretch'>
        <OverviewCard cardTitle={item.name} value={item.value} info={item.info}/> 
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
    {
      currentMonthYear!==dayjs().format('YYYY-MM') &&
      <p className='text-white mt-10'>Hurrah! You saved </p>
    }
  </div>
  }
  
    <AddExpenseModal open={openAddExpense} onCloseModal={closeAddExpenseModal} title={"Add new expense"}/>
    <SalaryDetailModal open={openSalaryModal} onCloseModal={closeSalaryModal} title={"Enter salary & target"}/>
    <SelectMonthModal open={openSelectMonthModal} onCloseModal={closeSelectMonthModal} title={"Select a month"}/>
  </div>
)
}

export default MainOverview