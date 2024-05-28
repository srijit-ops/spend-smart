import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSearchParams } from "next/navigation";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const searchParams = useSearchParams();
  const currentMonthYear = searchParams.get("month");
  const debitTransactions = JSON.parse(
    localStorage.getItem("transactionData")
  )?.[currentMonthYear]?.transactions?.filter(
    (item) => item.expenseType === "debit"
  );
  const labels = debitTransactions.map((item) => item.expenseCategory);
  const finalLabels = [...new Set(labels)];

  const values = finalLabels.map((data) => {
    let initialVal = 0;
    JSON.parse(localStorage.getItem("transactionData"))?.[
      currentMonthYear
    ]?.transactions?.forEach((item) => {
      if (data === item.expenseCategory && item.expenseType === "debit") {
        initialVal += item.amount;
      }
    });
    return initialVal;
  });
  function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const color = `rgb(${red}, ${green}, ${blue})`;

    return color;
  }

  const backgroundColors = finalLabels.map(() => getRandomColor());

  const options = {
    plugins: {
      doughnutlabel: {
        labels: {
          // Add padding between the doughnut chart and the labels
          padding: 20,
        },
      },
    },
    responsive: true, // Make the chart responsive
  };

  const finalData = {
    labels: finalLabels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="pt-10 w-11/12 h-11/12">
      <Doughnut data={finalData} options={options} />
    </div>
  );
}

export default PieChart;
