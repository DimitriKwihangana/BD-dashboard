import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";




ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(ChartDataLabels);
const ChartThree = ({ contract, sales, Invoiced }) => {
  const data = {
    labels: ["T.Contract Value", "Sales Target", "Total Invoiced"],
    datasets: [
      {
        label: "Financial Status",
        data: [contract, sales, Invoiced],
        backgroundColor: ["#087ABC", "#8CCF98", "#7F7F7F"],
        hoverBackgroundColor: ["#087ABC", "#8CCF98", "#7F7F7F"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      datalabels: {
        anchor: "center",
        align: "center",

        // backgroundColor: function (context) {
        //   return context.dataset.backgroundColor;
        // },
        // borderColor: "white",
        borderRadius: 255,
        borderWidth: 1,
        color: "white",

   
        font: {
          size: 16
        },
        padding: 6,
    
      },
    },
    cutout: "65%",
  };

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <h5 className="text-base text-center font-semibold text-black dark:text-white">
        Financial status
      </h5>
      <div className="mb-2">
        <div className="mx-auto flex justify-center" style={{ height: "300px" }}>
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
