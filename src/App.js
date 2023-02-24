import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BackCare } from "./pages/BackCare";
import { EyeCare } from "./pages/EyeCare";
import { WaterIntake } from "./pages/WaterIntake";
import { Home } from "./pages/Home";
import * as mobilenetModule from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import {
  notifySitStraight,
  notifyWaterIntake,
  notifyEyeCare,
} from "./utils/notification";

const classifier = knnClassifier.create();

const fromDatasetObject = (datasetObject) => {
  return Object.entries(datasetObject).reduce(
    (result, [indexString, { data, shape }]) => {
      const tensor = tf.tensor2d(data, shape);
      const index = Number(indexString);
      result[index] = tensor;
      return result;
    },
    {}
  );
};
function App() {
  const [backcareFeature, setBackcareFeature] = useState(false);
  const [eyecareFeature, setEyecareFeature] = useState(false);
  const [waterIntakeFeature, setWaterIntakeFeature] = useState(false);
  const classifyPic = async () => {
    let net = await mobilenetModule.load();
    const img = camRef.current.video;
    const activation = net.infer(img, true);
    const result = await classifier.predictClass(activation);
    if (result.label == 1) {
      notifySitStraight();
    }
  };
  const camRef = useRef(null);
  useEffect(() => {
    localStorage.setItem(
      "features",
      JSON.stringify({ backCare: false, waterIntake: false, eyeCare: false })
    );
    let str = localStorage.getItem("postureDataset");
    if (str) {
      classifier.setClassifierDataset(
        fromDatasetObject(JSON.parse(localStorage.getItem("postureDataset")))
      );
    }
  }, []);
  useEffect(() => {
    const backTimer = setInterval(() => {
      classifyPic();
    }, 3000);
    if (!backcareFeature) {
      clearInterval(backTimer);
    }
    return () => clearInterval(backTimer);
  }, [backcareFeature]);
  useEffect(() => {
    const eyeTimer = setInterval(() => {
      notifyEyeCare();
    }, 15000);
    if (!eyecareFeature) {
      clearInterval(eyeTimer);
    }
    return () => clearInterval(eyeTimer);
  }, [eyecareFeature]);
  useEffect(() => {
    const waterTimer = setInterval(() => {
      notifyWaterIntake();
    }, 10000);
    if (!waterIntakeFeature) {
      clearInterval(waterTimer);
    }
    return () => clearInterval(waterTimer);
  }, [waterIntakeFeature]);
  return (
    <>
      <div style={{ backgroundColor: "white" }} className="App">
        <Navbar />
        <div style={{ paddingTop: "6rem" }}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    backcareFeature={backcareFeature}
                    setBackcareFeature={setBackcareFeature}
                    eyecareFeature={eyecareFeature}
                    setEyecareFeature={setEyecareFeature}
                    waterIntakeFeature={waterIntakeFeature}
                    setWaterIntakeFeature={setWaterIntakeFeature}
                    classifyPic={classifyPic}
                  />
                }
              />
              <Route path="/backcare" element={<BackCare />} />
              <Route path="/eyecare" element={<EyeCare />} />
              <Route path="/waterintake" element={<WaterIntake />} />
            </Routes>
          </BrowserRouter>
        </div>
        {/* <Button onClick={() => classifyPic()}>Check posture</Button> */}
        <Webcam
          ref={camRef}
          screenshotFormat="image/jpeg"
          style={{
            zIndex: "-99",
            borderRadius: "16px",
            width: "40rem",
            height: "30rem",
            display: "block",
            position: "fixed",
            top: "0",
          }}
        />
      </div>
    </>
  );
}

export default App;
