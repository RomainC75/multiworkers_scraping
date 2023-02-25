import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import socket from "./util/socket";
import MyChart from "./components/MyChart";
import { updateChartData } from "./util/updateChartData";
import { ChartDataInterface, DatasetInterface } from "./@types/data";
import { scrapingInfoData } from "./@types/socket";

const data:ChartDataInterface = {
  labels: ["13:22:08", "13:25:08", "13:32:18"],
  datasets: [
    {
      label: "FullCount",
      data: [55, 75, 96],
      backgroundColor: [
        "red",       
      ],
      borderWidth: 1,
      borderColor: 'rgba(230,0,0,0.5)'
    },
    {
      label: "HalfCount",
      data: [5, 23, 50],
      backgroundColor: [
        "blue"
      ],
      borderWidth: 1,
      borderColor: 'rgba(0,0,230,0.5)'
    },
  ],
};

function App() {
  const [chartData, setChartData] = useState<ChartDataInterface>(data);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SOCKET}/scrape/`)
      .then((ans) => console.log("response : ", ans))
      .catch((err) => console.log("error ", err));

    socket.on("scrapingInfo", (message:scrapingInfoData) => {
      const fullCount = message.fullCount ? message.fullCount : null
      const halfCount = message.halfCount ? message.halfCount : null
      console.log("scrapingInfo : ", message)
      setChartData(chartData=>{
        const data={...chartData}
        return updateChartData(data, message.date, fullCount, halfCount)
      })
    });

    return () => {
      socket.off("scrapingInfo");

    };
  }, []);

  useEffect(() => {
    console.log('==>', chartData)
  }, [chartData]);

  return (
    <div className="App">
      <h1>Scraping Evolution</h1>
      <MyChart chartData={chartData}/>
    </div>
  );
}

export default App;
