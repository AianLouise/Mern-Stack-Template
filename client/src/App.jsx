import { BrowserRouter, Routes, Route } from "react-router-dom";
import Passcode from "./pages/Passcode";
import Home from "./pages/Home";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Passcode />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter >
  )
}
