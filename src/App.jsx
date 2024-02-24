import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Layout />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
