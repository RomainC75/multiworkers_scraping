import { Line } from "react-chartjs-2";
import { ChartDataInterface } from "../@types/data";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

interface MyChartInterface{
    chartData: ChartDataInterface
}

function MyChart({ chartData }:MyChartInterface) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data = {chartData}
        options = {{
          plugins: {
            title: {
              display: true,
              text: "Evolution of the scraping process"
            },
            legend: {
              display: true,
              position: 'top'
            }
          }
        }}
      />
    </div>
  );
}
export default MyChart;