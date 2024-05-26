import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
 
const AllTransactionsComponent = dynamic(() => import('../../components/allTransactionComponents/AllTransactionHolder'), {
  ssr: false,
})

function AllTransactions() {
  const session= useSession()
  const router= useRouter()
  // if (!session || !session.data) {
  //   router.push("api/auth/signin")
  // }
    return <AllTransactionsComponent/>
}

export default AllTransactions