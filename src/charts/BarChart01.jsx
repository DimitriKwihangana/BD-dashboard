import React from "react";
import { Bar , Pie } from "react-chartjs-2";
import { Chart as chartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../charts/bar.css";
import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";

chartJS.register(ChartjsPluginStacked100);
chartJS.register(ChartDataLabels);

function formatValueWithCommas(value) {
  const integerValue = Math.floor(value);
  return integerValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatValueWithPercent(value, decimalPlaces = 0) {
  const roundedValue =
    Math.round(value * 10 ** decimalPlaces) / 10 ** decimalPlaces;
  return roundedValue + "%";
}

function Barchat({ chartData, yTitle, xTitle, unit, legend, lgd, product }) {
  console.log(chartData);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false,
        },
        ticks: {
          display:false,
          color: "white",
          font: {
            size: 15,
          },
        },
        title: {
          display: false,
          text: xTitle,
          color: "white",
          font: {
            size: 20,
            weight: "bold",
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          display: false,
        },
        ticks: {
          display:false,
          font: {
            size: 15,

          },
          color: "white",
        },
        title: {
          display: false,
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: lgd,
        labels: {
          color: "white", // Color of the legend labels
          font: {
            size: 12, // Font size of the legend labels
          },
          boxWidth: 4, // Adjust the width of the legend rectangles
          borderRadius: 3, // Set the border radius to make rectangles round
          generateLabels: function (chart) {
            return chart.data.datasets[0].data.map(function (data, index) {
              return {
                text: chart.data.labels[index], // Use the labels from chart data
                fillStyle: chart.data.datasets[0].backgroundColor[index], // Use the background color of the corresponding dataset
                hidden:
                  isNaN(chart.data.datasets[0].data[index]) ||
                  chart.data.datasets[0].data[index] == 0,
                lineCap: "round",
                strokeStyle: chart.data.datasets[0].borderColor[index], // Use the border color of the corresponding dataset
                lineWidth: 2,
                pointStyle: "circle",
              };
            });
          },
        },
        position: legend,
      },
      datalabels: {
        color: "white",
        anchor: "end",
        align: "top",
        
        display: function (context) {
          var dataset = context.dataset;
          var value = dataset.data[context.dataIndex];
          return value;
        },
        font: {
          size: 13,
        },
       
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
    <div  style={{ height: "300px", width: "320px", backgroundColor: 'white', padding:0 }}>
     
      <h1  style={{ color: "black", fontWeight: "700" , textAlign:'center', marginBottom:-20}}>
        {yTitle}
      </h1>
      <div className="chart-container" style={{ height: "320px", width: "320px", padding:0 , marginLeft:-20}}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default Barchat;
