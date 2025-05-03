import React from "react";

type Pixel = {
    color: string;
  };
  
  interface PixelWallProps {
    pixels: Pixel[][];
    onPixelClick: (x: number, y: number) => void;
  }
  
  const PixelWall: React.FC<PixelWallProps> = ({ pixels, onPixelClick }) => {
    const gridSize = pixels.length;
    const pixelSize = `clamp(18px, calc(90vw / ${gridSize}), 48px)`;
  
    return (
      <div
        style={{
          display: "inline-block",
          border: "2px solid #222",
          borderRadius: 10,
          background: "#f4f4f7", // Light grey grid background
          padding: 10,
          boxShadow: "0 2px 16px #000a",
          maxWidth: "98vw",
          overflowX: "auto",
        }}
      >
        {pixels.map((row, y) => (
          <div key={y} style={{ display: "flex" }}>
            {row.map((pixel, x) => (
              <div
                key={x}
                onClick={() => onPixelClick(x, y)}
                style={{
                  width: pixelSize,
                  height: pixelSize,
                  background: pixel.color === "#fff" ? "#f9f5f7" : pixel.color, // Slightly off-white for default
                  border: "1px solid #bbb",
                  cursor: "pointer",
                  borderRadius: 4,
                  transition: "box-shadow 0.15s, border 0.15s",
                  boxShadow: "0 1px 4px #0002",
                }}
                title={`(${x},${y})`}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") onPixelClick(x, y);
                }}
                aria-label={`Pixel at (${x},${y})`}
                className="pixel"
              />
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  export default PixelWall;