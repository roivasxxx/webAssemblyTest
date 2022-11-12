import React, { useRef, useEffect, useState } from "react";
import { alphabet } from "../utils";

export default function MyCanvas({ wrapperHeight, wrapperWidth }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [lastChar, setLastChar] = useState(0);
  const width = window.innerWidth / 2;
  const height = window.innerHeight / 2;
  useEffect(() => {
    const canv = canvasRef.current;

    canv.width = wrapperWidth / 2;
    canv.height = wrapperHeight / 2;
    canv.style.width = `${wrapperWidth}px`;
    canv.style.height = `${wrapperHeight}px`;

    const context = canv.getContext("2d");
    context.scale(1 / 2, 1 / 2);
    context.strokeStyle = "black";
    context.lineWidth = 3;
    contextRef.current = context;
  }, []);

  const onClick = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = contextRef.current;
    const radius = 15;
    console.debug("clicked", offsetX, offsetY, nativeEvent);
    ctx.moveTo(offsetX, offsetY);
    ctx.beginPath();
    ctx.arc(offsetX, offsetY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.font = `${24}px Arial`;

    ctx.fillText(
      alphabet().charAt(lastChar),
      offsetX - radius / 2,
      offsetY + radius / 2
    );
    setLastChar((lastChar) => lastChar + 1);
  };

  return (
    <div
      style={{
        width: wrapperWidth,
        height: wrapperHeight,
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 5,
      }}
    >
      <canvas ref={canvasRef} onMouseDown={onClick} />
    </div>
  );
}
