import './App.css';
import Webcam from 'react-webcam';
import { useRef } from 'react';
function App() {
  const webcamRef = useRef(null);

  return (
    <div className="App">
      Dev-Delight
      <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              // onUserMediaError={showError}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                borderRadius: "20px",
                zindex: 9,
                width: 640,
                height: 480,
                display: "block",
              }}
            />
    </div>
  );
}

export default App;
