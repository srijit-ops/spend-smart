import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart, Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ lineChartLables }) {
  const searchParams = useSearchParams();
  const currentMonthYear = searchParams.get("month");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          color: "#141416", // Set x-axis grid color
        },
      },
      y: {
        grid: {
          color: "#141416", // Set y-axis grid color
        },
      },
    },
  };

  const labels = lineChartLables;

  let totalIncomeData = labels.map((item) => {
    let totalIncome = 0;
    JSON.parse(localStorage.getItem("transactionData"))?.[
      currentMonthYear
    ]?.transactions?.forEach((data) => {
      if (
        dayjs(data.date).format("MMM D") === item &&
        data.expenseType === "credit"
      ) {
        totalIncome += data.amount;
      }
    });
    return totalIncome;
  });
  let totalExpenseData = labels.map((item) => {
    let totalExpense = 0;
    JSON.parse(localStorage.getItem("transactionData"))?.[
      currentMonthYear
    ]?.transactions?.forEach((data) => {
      if (
        dayjs(data.date).format("MMM D") === item &&
        data.expenseType === "debit"
      ) {
        totalExpense += data.amount;
      }
    });
    return totalExpense;
  });
  const data = {
    labels,
    datasets: [
      {
        label: "Total Income",
        data: totalIncomeData,
        borderColor: "#eab308",
        backgroundColor: "#eab308",
      },
      {
        label: "Total expense",
        data: totalExpenseData,
        borderColor: "#e23d35",
        backgroundColor: "#e23d35",
      },
    ],
  };
  return (
    <div className="pt-8">
      <Line options={options} data={data} />
    </div>
  );
}

export default LineChart;
