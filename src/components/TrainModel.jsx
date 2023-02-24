import React, { useState } from "react";
import Webcam from "react-webcam";
import { useRef } from "react";
import { Button, Text, Spinner } from "@chakra-ui/react";
import * as mobilenetModule from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";

const classifier = knnClassifier.create();
const convertDatasetToObject = async (modeldataset) => {
  const result = await Promise.all(
    Object.entries(modeldataset).map(async ([postureType, value]) => {
      const data = await value.data();

      return {
        label: postureType,
        data: Array.from(data),
        shape: value.shape,
      };
    })
  );

  return result;
};
const TrainModel = () => {
  const camRef = useRef(null);
  const [goodPostureCount, setGoodPostureCount] = useState(0);
  const [badPostureCount, setBadPostureCount] = useState(0);
  const [savingPosture, setSavingPosture] = useState({
    loadingState: false,
    posture: "",
  });
  const [savingModel, setSavingModel] = useState(false);
  const [trainCompleted, setTrainCompleted] = useState(false);
  const [postureStatus, setPostureStatus] = useState(null);
  const trainPosture = async (postureType) => {
    setSavingPosture({ loadingState: true, posture: postureType });
    let img = camRef.current.video;
    console.log("hellllo")
    // Notification
    let mobilenet = await mobilenetModule.load();
    console.log(mobilenet)
    console.log("hiiiii")
    let activation = mobilenet.infer(img, true);
    classifier.addExample(activation, postureType);
    setSavingPosture({ loadingState: false, posture: "" });
    if (postureType === "good") {
      setGoodPostureCount((prev) => prev + 1);
    } else if (postureType === "bad") {
      setBadPostureCount((prev) => prev + 1);
    }
  };
  const saveModel = async () => {
    setSavingModel(true);
    let dataset = classifier.getClassifierDataset();

    let dataInObject = await convertDatasetToObject(dataset);
    console.log(dataInObject);
    let jsonInStr = JSON.stringify(dataInObject);
    localStorage.setItem("postureDataset", jsonInStr);
    setSavingModel(false);
    setTrainCompleted(true);
  };
  const classifyPic = async () => {
    setPostureStatus("finding if your posture is correct");
    let net = await mobilenetModule.load();
    const img = camRef.current.video;
    // Get the activation from mobilenet from the webcam.
    const activation = net.infer(img, true);
    const result = await classifier.predictClass(activation);

    setPostureStatus(result.label);
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10rem",
      }}
    >
      <Webcam
        ref={camRef}
        screenshotFormat="image/jpeg"
        style={{
          borderRadius: "16px",
          width: "40rem",
          height: "30rem",
          display: "block",
        }}
      />
      {trainCompleted ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6rem",
          }}
        >
          <Button onClick={classifyPic}>Test Now</Button>
          <Text>{postureStatus}</Text>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <Text fontSize="xl" as="b">
              Take Pictures
            </Text>
            <div
              style={{
                display: "flex",
                gap: "2rem",
              }}
            >
              <Button onClick={() => trainPosture("good")} color="teal" gap="1rem">
                Good Posture
                {savingPosture.posture === "good" &&
                  savingPosture.loadingState && <Spinner colorScheme="teal" />}
              </Button>
              <Button onClick={() => trainPosture("bad")} color="teal" gap="1rem">
                Bad Posture
                {savingPosture.posture === "bad" &&
                  savingPosture.loadingState && <Spinner />}
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text>Total Posture Count</Text>
              <Text>Good Posture: {goodPostureCount}</Text>
              <Text>Bad Posture: {badPostureCount}</Text>
            </div>
          </div>
          <Button
          onClick={saveModel}
            colorScheme="teal"
            isDisabled={
              goodPostureCount >= 2 && badPostureCount >= 2 ? false : true
            }
            size="lg"
          >
            Save Model
            {savingModel && <Spinner />}
          </Button>
        </div>
      )}
    </div>
  );
};

export { TrainModel };
