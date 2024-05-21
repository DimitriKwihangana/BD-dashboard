import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as chartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";


chartJS.register(ChartDataLabels);
function formatValueWithCommas(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatValueWithPercent(value, unit) {
  return unit === "%" ? value + "%" : value;
}

function ClusteredBarchat({ chartData, yTitle, xTitle, unit, legend, lgd}) {
  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        stacked: false,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 15,
          },
        },
        title: {
          display: false,
          text: xTitle,
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      x: {
        // stacked:true,
        grid: {
          display: false,
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          callback: function (value) {
            if (unit === "%") {
              return value + "%";
            }
            return formatValueWithCommas(value);
          },
          font: {
            size: 12,
          },
        },
        title: {
          display: false,
          text: yTitle,
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: legend,
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
          size: 15,
        },
        padding: 6,
    
      },
    },
    // Core options
    aspectRatio: 4 / 3,
    cutoutPercentage: 32,
    layout: {
      padding: 32,
    },
    elements: {
      line: {
        fill: false,
      },
      point: {
        hoverRadius: 7,
        radius: 0,
      },
    },
  };

  return (
    <div  style={{ height: "250px", width: "400px", backgroundColor: 'white', padding:0  }}>
     
      <h1  style={{ color: "black", fontWeight: "700" , textAlign:'center', marginBottom:-20}}>
        {yTitle}
      </h1>
      <div className="chart-container" style={{ height: "260px", width: "390px", padding:0 , marginLeft:-20}}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default ClusteredBarchat;
