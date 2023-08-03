import React from "react";
import "./App.scss";
import Header from "./Components/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Reminders from "./Components/Reminders/Reminders";
import Expenses from "./Components/Expenses/Expenses";
import ErrorPage from "./Components/Error-Page/ErrorPage";
import Home from "./Components/Home/Home";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="outlet-wrapper">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/reminders" element={<Reminders />} />
            <Route exact path="/expenses" element={<Expenses />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
