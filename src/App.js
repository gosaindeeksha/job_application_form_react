import "./styles.css";
import React from "react";
import Signin from "./components/Signin";
import Success from "./components/Sucess";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}
