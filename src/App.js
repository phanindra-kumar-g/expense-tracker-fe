import React from "react";
import "./App.scss";
import Header from "./Components/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Reminders from "./Components/Reminders/Reminders";
import Expenses from "./Components/Expenses/Expenses";
import ErrorPage from "./Components/Error-Page/ErrorPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="outlet-wrapper">
          <Routes>
            <Route path="/" exact element={<Navigate to="/expenses" />} />
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
