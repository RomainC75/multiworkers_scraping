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
  labels: ["Red", "Orange", "Blue"],
  // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
  datasets: [
    {
      label: "Total",
      data: [55, 23, 96],
      // you can set indiviual colors for each bar
      backgroundColor: [
        "blue",
        // "rgba(255, 255, 255, 0.6)",
        // "rgba(255, 255, 255, 0.6)",
      ],
      borderWidth: 1,
    },
    {
      label: "FullCount",
      data: [55, 23, 96],
      // you can set indiviual colors for each bar
      backgroundColor: [
        "blue",
        "rgba(255, 255, 255, 0.6)",
        "rgba(255, 255, 255, 0.6)",
      ],
      borderWidth: 1,
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
