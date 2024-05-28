import React from "react";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";

const TransactionDetailsComponent = dynamic(
  () =>
    import(
      "../../components/transactiondetailcomps/TransactionDetailsComponent"
    ),
  {
    ssr: false,
  }
);

function TransactionDetails({ session }) {
  return (
    <div>
      <TransactionDetailsComponent />
    </div>
  );
}

export default TransactionDetails;

export const getServerSideProps = async (context) => {
  const { req, res, query } = context;
  const session = await getServerSession(req, res);

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=/transactionDetails?id=${query.id}`,
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
