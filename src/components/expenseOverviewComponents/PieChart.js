import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSearchParams } from 'next/navigation';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const searchParams= useSearchParams()
  const currentMonthYear= searchParams.get("month")
    const debitTransactions= JSON.parse(localStorage.getItem("transactionData"))?.[currentMonthYear]?.transactions?.filter(item=>
      item.expenseType==='debit'
        // return item.expenseCategory
      // }
        // return null
    )
    const labels= debitTransactions.map(item=>item.expenseCategory)
    // console.log(labels)
    const finalLabels= [...new Set(labels)]
  
    const values= finalLabels.map(data=>{
      let initialVal=0
      JSON.parse(localStorage.getItem("transactionData"))?.[currentMonthYear]?.transactions?.forEach(item=>{
        if(data=== item.expenseCategory && item.expenseType==='debit'){
          initialVal+=item.amount
        }
        // return item.expenseCategory
      
    })
    return initialVal
    })
    console.log(finalLabels, values)
    function getRandomColor() {
      // Generate random values for red, green, and blue components
      const red = Math.floor(Math.random() * 256); // Random integer between 0 and 255
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
    
      // Construct the RGB color string
      const color = `rgb(${red}, ${green}, ${blue})`;
    
      return color;
    }
    // function getRandomColor() {
    //   // Generate random hue value within the range of yellow to orange
    //   const hue = Math.floor(Math.random() * 60) + 30; // Range: 30 to 90 (yellow to orange)
    
    //   // Set saturation and lightness values
    //   const saturation = Math.floor(Math.random() * 50) + 50; // Range: 50 to 100
    //   const lightness = Math.floor(Math.random() * 25) + 50; // Range: 50 to 75
    
    //   // Convert HSL values to RGB
    //   const rgbColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    //   return rgbColor;
    // }
    
    
    
    const backgroundColors = finalLabels.map(() => getRandomColor());
   
      
    const options = {
      plugins: {
        doughnutlabel: {
          labels: {
            // Add padding between the doughnut chart and the labels
            padding: 20
          }
        }
      },
      responsive: true // Make the chart responsive
    };
      
        const finalData = {
          labels: finalLabels,
          datasets: [
            {
              data: values,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors,
              borderWidth: 1,
              // dataVisibility: new Array(data.length).fill(true),
            },
          ],
        };
        
  return (
    <div className='pt-10 w-11/12 h-11/12'>
        <Doughnut data={finalData} options={options} />
    </div>
  )
}

export default PieChart