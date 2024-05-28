import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

function AllTransactionHolder() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentMonthYear = searchParams.get("month");
  const navigateHandler = (expenseId) => {
    router.push({
      pathname: "/transactionDetails",
      query: {
        id: expenseId,
      },
    });
  };
  return (
    <div className="w-full py-5 px-6">
      <h2 className="text-white text-3xl tracking-wider font-semibold mb-7">
        All transactions
      </h2>
      <h3 className="text-xl tracking-wide text-gray-400 mb-7">
        🗓️ {dayjs(currentMonthYear).format("MMM, YYYY")}
      </h3>
      <table className="w-full border-collapse">
        <thead className="bg-transparent">
          <tr className=" text-yellow-500 text-left text-[1.1rem]">
            <th className="pt-4 pb-2">Name</th>
            <th className="pt-4 pb-2">Category</th>
            <th className="pt-4 pb-2">Amount</th>
            <th className="pt-4 pb-2">Date</th>
            <th className="pt-4 pb-2 opacity-0">Action</th>
          </tr>
        </thead>
        <tbody className="border-t-[16px] border-transparent">
          {typeof localStorage !== "undefined" &&
            JSON.parse(localStorage.getItem("transactionData"))?.[
              currentMonthYear
            ]?.transactions?.map((item) => {
              return (
                <tr
                  key={item.id}
                  className="border-b border-[#141416] last:border-none"
                >
                  <td className="py-4 text-white">{item.expenseName}</td>
                  <td className="py-4 text-white">{item.expenseCategory}</td>
                  <td
                    className={`py-4 ${
                      item.expenseType === "debit"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.expenseType === "debit" ? "-" : "+"}
                    {item.amount} /-
                  </td>
                  <td className="py-4 text-white">
                    {dayjs(item.date).format("h:mm A, MMMM D, YYYY")}
                  </td>
                  <td className="py-4 text-white cursor-pointer">
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-white rotate-[-45deg] text-xl hover:text-yellow-500"
                      onClick={() => navigateHandler(item.id)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default AllTransactionHolder;
