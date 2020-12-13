import React, { useEffect, useRef } from "react";

export const TestCanvas = ({ sourceCanvas }) => {
  const canvas = useRef(null);

  useEffect(() => {
    if (!canvas || !canvas.current || !sourceCanvas) return;

    const c = canvas.current;
    const ctx = c.getContext("2d");
    ctx.drawImage(sourceCanvas.canvas, 0, 0);
  }, [sourceCanvas]);

  return (
    <div>
      <h1>TEST CANVAS</h1>
      <canvas ref={canvas} width={400} height={400} />
    </div>
  );
};
