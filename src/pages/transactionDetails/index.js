import React from 'react'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';

const TransactionDetailsComponent= dynamic(()=>import("../../components/transactiondetailcomps/TransactionDetailsComponent"),{
    ssr:false
})

function TransactionDetails() {
  const session= useSession()
  const router= useRouter()
  // if (!session || !session.data) {
  //   router.push("api/auth/signin")
  // }
  return (
    <div>
        <TransactionDetailsComponent/>
    </div>
  )
}

export default TransactionDetails