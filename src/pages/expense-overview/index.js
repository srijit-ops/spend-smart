import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const MainOverview = dynamic(
  () => import("../../components/expenseOverviewComponents/MainOverview"),
  {
    ssr: false,
  }
);

function ExpenseOverview({ session }) {
  return <MainOverview />;
}

export default ExpenseOverview;

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res);
  const currentMonth = dayjs().format("YYYY-MM");
  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=/expense-overview?month=${currentMonth}`,
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
