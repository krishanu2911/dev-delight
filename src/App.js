import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BackCare } from "./pages/BackCare";
import { EyeCare } from "./pages/EyeCare";
import { WaterIntake } from "./pages/WaterIntake";
import { Home } from "./pages/Home";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div style={{ paddingTop: "6rem" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/backcare" element={<BackCare />} />
            <Route path="/eyecare" element={<EyeCare />} />
            <Route path="/waterintake" element={<WaterIntake />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
