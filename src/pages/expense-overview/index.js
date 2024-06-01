// import BorderedButtonComponent from '@/components/common/BorderedButtonComponent'
// import ButtonComponent from '@/components/common/ButtonComponent'
// import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
// import OverviewCard from '@/components/expenseOverviewComponents/OverviewCard'
// import AddExpenseModal from '@/components/expenseOverviewComponents/AddExpenseModal'
// import dayjs from 'dayjs'
// import SalaryDetailModal from '@/components/expenseOverviewComponents/SalaryDetailModal'
// import SelectMonthModal from '@/components/expenseOverviewComponents/SelectMonthModal'
// import { useSearchParams } from 'next/navigation'

import dynamic from 'next/dynamic'
 
const MainOverview = dynamic(() => import('../../components/expenseOverviewComponents/MainOverview'), {
  ssr: false,
})

function ExpenseOverview() {

    return <MainOverview/>
}

export default ExpenseOverview

