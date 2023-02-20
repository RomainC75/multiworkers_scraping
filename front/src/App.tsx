import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import socket from "./util/socket";

function App() {
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
      socket.off("news")
    };
  }, []);

  useEffect(() => {}, []);

  return <div className="App">{process.env.REACT_APP_SOCKET}</div>;
}

export default App;
