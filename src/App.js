import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as ml5 from "ml5";
import { DrawingCanvas } from "./components/DrawingCanvas";
import { Guesses } from "./components/Guesses";
// import { TestCanvas } from "./TestCanvas";

export default function App() {
  const [doodleClassifier, setDoodleClassifier] = useState(null);
  const [modelReady, setModelReady] = useState(false);
  const [srcCanvas, setSrcCanvas] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!doodleClassifier) {
      setDoodleClassifier(
        ml5.imageClassifier("DoodleNet", () => setModelReady(true))
      );
    }
  }, [doodleClassifier]);

  useEffect(() => {
    if (!modelReady || !doodleClassifier) return;
    if (!srcCanvas || !srcCanvas.canvas) return;

    doodleClassifier.classify(srcCanvas.canvas, gotResults);
  }, [srcCanvas]);

  const gotResults = (error, results) => {
    if (error) {
      console.log("error: ", error);
      return;
    }

    setResults(results);
  };

  const onDrawCanvas = (canvas) => {
    if (!modelReady || !doodleClassifier) return;

    setSrcCanvas({ canvas, timestamp: Date.now() });
  };

  return (
    <Page>
      <CanvasHolder>
        <DrawingCanvas onUpdateCanvas={onDrawCanvas} />
        <Guesses guessList={results} />
      </CanvasHolder>
      {/* <TestCanvas sourceCanvas={srcCanvas} /> */}
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  min-height: 100vh;
`;

const CanvasHolder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
