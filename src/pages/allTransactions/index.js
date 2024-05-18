import dynamic from 'next/dynamic'
 
const AllTransactionsComponent = dynamic(() => import('../../components/allTransactionComponents/AllTransactionHolder'), {
  ssr: false,
})

function AllTransactions() {

    return <AllTransactionsComponent/>
}

export default AllTransactions