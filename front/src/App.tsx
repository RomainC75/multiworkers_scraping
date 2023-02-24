import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import socket from "./util/socket";
import MyChart from "./components/MyChart";

const data = {
  labels: ["Red", "Orange", "Blue"],
  // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
  datasets: [
    {
      label: "Total",
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
  const [chartData, setChartData] = useState(data);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SOCKET}/scrape/`)
      .then((ans) => console.log("response : ", ans))
      .catch((err) => console.log("error ", err));

    socket.on("news", (message) => {
      console.log("news : ", message);
    });

    return () => {
      socket.off("user joined");
      socket.off("message");
      socket.off("news");
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <h1>{process.env.REACT_APP_SOCKET}</h1>
      <MyChart chartData={chartData}/>
    </div>
  );
}

export default App;
