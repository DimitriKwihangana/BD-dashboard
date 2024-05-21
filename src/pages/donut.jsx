import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const options = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: ["#087ABC", "#8CCF98", "#7F7F7F"],
    labels: ["T.Contract Value ", "Sales Target", "Deficit"],
    legend: {
      show: true,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 350,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
    style: {
      colors: ["black"], 
    },
  };
  

const ChartThree = ({contract, sales, Deficit}) => {
  const [state, setState] = useState({
    series: [5.9, 5,0],
  });


  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <h5 className="text-base text-center font-semibold text-black dark:text-white">
       Financial status
      </h5>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
