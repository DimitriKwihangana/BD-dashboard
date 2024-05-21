import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as chartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";
import "../charts/bar.css";

chartJS.register(ChartjsPluginStacked100);

function PieChart({ chartData, yTitle, lgd }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: lgd,
        labels: {
          color: "white",
          font: {
            size: 14,
          },
          boxWidth: 4,
          borderRadius: 3,
          generateLabels: function (chart) {
            return chart.data.datasets[0].data.map(function (data, index) {
              return {
                text: chart.data.labels[index],
                fillStyle: chart.data.datasets[0].backgroundColor[index],
                hidden:
                  isNaN(chart.data.datasets[0].data[index]) ||
                  chart.data.datasets[0].data[index] == 0,
                lineCap: "round",
                strokeStyle: chart.data.datasets[0].borderColor[index],
                lineWidth: 2,
                pointStyle: "circle",
              };
            });
          },
        },
        position: "bottom",
      },
    },
    aspectRatio: 4 / 3,
    cutoutPercentage: 50, // Adjust thickness of the doughnut (50% means it will be half of the chart)
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
    <div style={{ height: "300px", width: "320px", backgroundColor: 'white', padding: 0 }}>
      <h1 style={{ color: "black", fontWeight: "700", textAlign: 'center', marginBottom: -20 }}>
        {yTitle}
      </h1>
      <div className="chart-container" style={{ height: "320px", width: "320px", padding: 0, marginLeft: -20 }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}

export default PieChart;
