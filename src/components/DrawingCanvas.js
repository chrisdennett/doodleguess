import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export const DrawingCanvas = ({ onUpdateCanvas }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [point, setPoint] = useState(null);
  const [isSetup, setIsSetUp] = useState(false);

  const canvas = useRef(null);

  useEffect(() => {
    if (!canvas || !canvas.current) return;
    if (isSetup) return;
    setupCanvas();
    setIsSetUp(true);

    // eslint-disable-next-line
  }, [canvas, isSetup]);

  const setupCanvas = () => {
    if (isSetup) return;
    clearCanvas();
  };

  const onMouseDown = (e) => {
    setIsDrawing(true);
    setupCanvas();
    const newPt = getPointFromMouseEvent(e);
    setPoint(newPt);
  };

  const clearCanvas = () => {
    const c = canvas.current;
    const ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
  };

  const onMouseMove = (e) => {
    if (!isDrawing) return;

    const newPt = { ...getPointFromMouseEvent(e), lineDrawn: true };
    const from = point ? point : newPt;
    const to = newPt;

    drawLine(from, to);
    setPoint(newPt);
  };

  const getPointFromMouseEvent = (e) => {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.

    return { x, y, lineDrawn: false };
  };

  const onMouseUp = () => {
    setPoint((prev) => {
      drawLine(prev, prev);
      return null;
    });
    setIsDrawing(false);
    onUpdateCanvas(canvas.current);
  };

  const drawLine = (from, to) => {
    if (!canvas || !canvas.current) return;
    if (!from || !to) return;

    const c = canvas.current;
    const ctx = c.getContext("2d");
    ctx.beginPath();

    ctx.strokeStyle = "0";
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 18;
    ctx.stroke();
  };

  return (
    <Outer>
      <canvas
        ref={canvas}
        onTouchStart={onMouseDown}
        onTouchMove={onMouseMove}
        onTouchEnd={onMouseUp}
        onTouchCancel={onMouseUp}
        width={282}
        height={282}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseUp}
        onMouseUp={onMouseUp}
      />
      <button onClick={clearCanvas}>CLEAR</button>
    </Outer>
  );
};

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  canvas {
    width: 286px;
    height: 286px;
    background-color: red;
  }

  button {
    padding: 10px;
    margin-top: 15px;
    border: none;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    width: 100%;
  }
`;
