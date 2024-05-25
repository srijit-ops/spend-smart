import React from 'react'
import dynamic from 'next/dynamic'

const TransactionDetailsComponent= dynamic(()=>import("../../components/transactiondetailcomps/TransactionDetailsComponent"),{
    ssr:false
})

function TransactionDetails() {
  return (
    <div>
        <TransactionDetailsComponent/>
    </div>
  )
}

export default TransactionDetails