import React from "react";
import { Line } from "react-chartjs-2";
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

// Register the required scales
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

interface DatasetInterface{
    label:string,
    data:number[],
    backgroundColor:string[],
    borderWidth: number
}


interface MyChartInterface{
    chartData:{
        labels:String[],
        datasets:DatasetInterface[]
    }
}

function MyChart({ chartData }:MyChartInterface) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={chartData}
        // options={{
        //   plugins: {
        //     title: {
        //       display: true,
        //       text: "Users Gained between 2016-2020"
        //     },
        //     legend: {
        //       display: false
        //     }
        //   }
        // }}
      />
    </div>
  );
}
export default MyChart;