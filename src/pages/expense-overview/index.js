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


import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic'
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
 
const MainOverview = dynamic(() => import('../../components/expenseOverviewComponents/MainOverview'), {
  ssr: false,
})

function ExpenseOverview() {
  const session= useSession()
  const router= useRouter()
  // useEffect(() => {
  //   // Ensure the component is executed on the client-side
  //   if (typeof window !== 'undefined') {
  //     if (!session || !session.data) {
  //       router.push("/api/auth/signin");
  //     }
  //   }
  // }, [session, router]);
  // if (!session || !session.data) {
  //   router.push("api/auth/signin")
  // }
    return <MainOverview/>
}

export default ExpenseOverview

