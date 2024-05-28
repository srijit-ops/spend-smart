import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const AllTransactionsComponent = dynamic(
  () =>
    import("../../components/allTransactionComponents/AllTransactionHolder"),
  {
    ssr: false,
  }
);

function AllTransactions({ session }) {
  return <AllTransactionsComponent />;
}

export default AllTransactions;

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res);
  const currentMonth = dayjs().format("YYYY-MM");
  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=/allTransactions?month=${currentMonth}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
