import BorderedButtonComponent from "../common/BorderedButtonComponent";
import ButtonComponent from "../common/ButtonComponent";
import React, { useEffect, useState } from "react";
import OverviewCard from "./OverviewCard";
import AddExpenseModal from "./AddExpenseModal";
import dayjs from "dayjs";
import SalaryDetailModal from "./SalaryDetailModal";
import SelectMonthModal from "./SelectMonthModal";
import { useSearchParams } from "next/navigation";
import PieChart from "./PieChart";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import LineChart from "../expenseOverviewComponents/LineChart";
import { useSession } from "next-auth/react";

function MainOverview() {
  const searchParams = useSearchParams();
  const session = useSession();

  const currentMonthYear = searchParams.get("month");
  const router = useRouter();
  const [openAddExpense, setOpenAddExpense] = useState(false);
  const [openSalaryModal, setOpenSalaryModal] = useState(false);
  const [openSelectMonthModal, setOpenSelectMonthModal] = useState(false);

  const salary =
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("transactionData"))?.[currentMonthYear]
      ?.salary;
  const targetSaving =
    typeof localStorage !== "undefined" &&
    (JSON.parse(localStorage.getItem("transactionData"))?.[currentMonthYear]
      ?.targetPercentage /
      100) *
      salary;
  let totalIncome = salary;
  let totalExpense = 0;

  if (typeof localStorage !== "undefined") {
    JSON.parse(localStorage.getItem("transactionData"))?.[
      currentMonthYear
    ]?.transactions.forEach((item) => {
      if (item.expenseType === "credit") {
        totalIncome += item.amount;
      }
    });
  }

  if (typeof localStorage !== "undefined") {
    JSON.parse(localStorage.getItem("transactionData"))?.[
      currentMonthYear
    ]?.transactions.forEach((item) => {
      if (item.expenseType === "debit") {
        totalExpense += item.amount;
      }
    });
  }

  let remainingBal =
    totalIncome - targetSaving <= totalExpense
      ? 0
      : [totalIncome - targetSaving - totalExpense];

  const cards = [
    {
      name: "💰 Total income",
      value: totalIncome,
      info: "Monthly salary + other incomes",
    },
    {
      name: "✂️ Total expense",
      value: totalExpense,
      info: "Total money spent till now",
    },
    {
      name: "🐖 Balance",
      value: remainingBal,
      info: "Remaining money to spend except target saving",
    },
    {
      name: "🎯 Target savings",
      value: targetSaving,
      info: "The amount to be invested",
    },
    {
      name: "💸 Monthly salary",
      value: salary,
      info: "Fixed monthly income",
    },
  ];

  let lineChartLables;

  if (
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("transactionData"))?.[currentMonthYear]
      ?.transactions?.length > 0
  ) {
    let oldLineChartLables = JSON.parse(
      localStorage.getItem("transactionData")
    )?.[currentMonthYear]?.transactions?.map((item, index) => {
      return dayjs(item.date).format("MMM D");
    });
    lineChartLables = [...new Set(oldLineChartLables)].sort((a, b) => {
      const dateA = dayjs(a, "MMM D");
      const dateB = dayjs(b, "MMM D");
      return dateA - dateB;
    });
  }

  const closeAddExpenseModal = () => {
    setOpenAddExpense(false);
  };
  const closeSalaryModal = () => {
    setOpenSalaryModal(false);
  };
  const closeSelectMonthModal = () => {
    setOpenSelectMonthModal(false);
  };
  useEffect(() => {
    if (currentMonthYear) {
      const allTransactions =
        JSON.parse(localStorage.getItem("transactionData")) || {};

      const monthMatch = Object.keys(allTransactions).findIndex(
        (item) => item === currentMonthYear
      );
      if (monthMatch == -1) {
        setOpenSalaryModal(true);
      }
    }
  }, []);

  let debitTrasactionIndex;
  if (
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("transactionData"))?.[currentMonthYear]
      ?.transactions?.length > 0
  ) {
    debitTrasactionIndex = JSON.parse(
      localStorage.getItem("transactionData")
    )?.[currentMonthYear]?.transactions.findIndex(
      (item) => item.expenseType === "debit"
    );
  }

  const navigateHandler = () => {
    router.push({
      pathname: "/allTransactions",
      query: {
        month: currentMonthYear,
      },
    });
  };

  return (
    <div className="w-full py-5 px-6">
      <div className="flex justify-between items-center flex-wrap w-full mb-12">
        <h2 className="text-white text-2xl tracking-wider ">
          Welcome,{" "}
          <span className="text-[#EAB308]">{session?.data?.user?.name}</span>
        </h2>
        <div className="flex justify-between items-center gap-3">
          {typeof localStorage !== "undefined" &&
            JSON.parse(localStorage.getItem("transactionData")) && (
              <BorderedButtonComponent
                onClick={() => setOpenSelectMonthModal(true)}
              >
                <p>Select month</p>
              </BorderedButtonComponent>
            )}
          {dayjs().format("YYYY-MM") === currentMonthYear && (
            <ButtonComponent
              style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
              onClick={() => setOpenAddExpense(true)}
            >
              <p className="flex justify-center items-center gap-1">
                {" "}
                <span className="text-2xl">+</span> Add expense
              </p>
            </ButtonComponent>
          )}
        </div>
      </div>

      {typeof localStorage === "undefined" ||
      !JSON.parse(localStorage.getItem("transactionData")) ||
      JSON.parse(localStorage.getItem("transactionData"))?.[currentMonthYear]
        ?.transactions?.length === 0 ||
      typeof JSON.parse(localStorage.getItem("transactionData"))?.[
        currentMonthYear
      ] === "undefined" ? (
        <div className="flex justify-center items-center mt-28 font-semibold">
          <p className="text-gray-500 text-2xl tracking-wider">
            No data available
          </p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center flex-wrap my-7">
            <h3 className="text-2xl tracking-wide text-gray-400">
              🗓️ {dayjs(currentMonthYear).format("MMM, YYYY")}
            </h3>
            <p
              className=" text-yellow-500 tracking-wide cursor-pointer hover:text-white"
              onClick={navigateHandler}
            >
              See all transcations
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </p>
          </div>
          <div className="flex justify-between items-stretch flex-wrap gap-4">
            {cards.map((item, index) => {
              return (
                <div className="w-[18%] self-stretch" key={index}>
                  <OverviewCard
                    cardTitle={item.name}
                    value={item.value}
                    info={item.info}
                  />
                </div>
              );
            })}
          </div>
          {currentMonthYear !== dayjs().format("YYYY-MM") ? (
            <div className="mt-10 flex justify-center items-center flex-col">
              {totalExpense === totalIncome - targetSaving ? (
                <p className="text-white mb-6 tracking-wider text-xl font-semibold">
                  <span className="text-3xl">🤩</span> Hurrah! You&apos;ve
                  achived your monthly target{" "}
                  <span className="font-semibold  text-2xl text-green-500">
                    {targetSaving}/-
                  </span>
                </p>
              ) : totalExpense < totalIncome - targetSaving ? (
                <p className="text-white mb-6 tracking-wider text-xl font-semibold">
                  <span className="text-3xl">🥳</span> You have achieved your
                  target plus saved extra{" "}
                  <span className="font-semibold  text-2xl text-green-500">
                    {remainingBal}/-
                  </span>
                </p>
              ) : (
                <p className="text-white mb-6 tracking-wider text-xl font-semibold">
                  <span className="text-3xl">☹️</span> You didn&apos;t achieve
                  your monthly target, even you spent extra{" "}
                  <span className="font-semibold  text-2xl text-red-500">
                    {totalExpense - (totalIncome - targetSaving)}/-
                  </span>
                </p>
              )}
              <ButtonComponent>
                <p>
                  Invest now
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-2 rotate-[-45deg]"
                  />
                </p>
              </ButtonComponent>
            </div>
          ) : null}
          <div className="mt-10">
            <h3 className="text-2xl tracking-wide text-gray-400">
              📊 Analytics
            </h3>
            <div className="flex justify-between items-start flex-wrap mt-6">
              {lineChartLables?.length >= 2 && (
                <div className="w-8/12">
                  <h5 className="text-white tracking-wide text-xl font-semibold mb-6">
                    Income VS. Expense
                  </h5>
                  <div className="text-white">
                    <LineChart lineChartLables={lineChartLables} />
                  </div>
                </div>
              )}
              {debitTrasactionIndex !== -1 && (
                <div className="w-1/4">
                  <h5 className="text-white tracking-wide text-xl font-semibold">
                    Expense domains analytics
                  </h5>
                  <div className="text-white">
                    <PieChart />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <AddExpenseModal
        open={openAddExpense}
        onCloseModal={closeAddExpenseModal}
        title={"Add new expense"}
      />
      <SalaryDetailModal
        open={openSalaryModal}
        onCloseModal={closeSalaryModal}
        title={"Enter salary & target"}
      />
      <SelectMonthModal
        open={openSelectMonthModal}
        onCloseModal={closeSelectMonthModal}
        title={"Select a month"}
      />
    </div>
  );
}

export default MainOverview;
