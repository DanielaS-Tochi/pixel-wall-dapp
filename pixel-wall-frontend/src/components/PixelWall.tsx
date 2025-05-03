import React from "react";

type Pixel = {
  color: string;
};

interface PixelWallProps {
  pixels: Pixel[][];
  onPixelClick: (x: number, y: number) => void;
}

const PixelWall: React.FC<PixelWallProps> = ({ pixels, onPixelClick }) => (
  <div style={{ display: "inline-block", border: "2px solid #333" }}>
    {pixels.map((row, y) => (
      <div key={y} style={{ display: "flex" }}>
        {row.map((pixel, x) => (
          <div
            key={x}
            onClick={() => onPixelClick(x, y)}
            style={{
              width: 30,
              height: 30,
              background: pixel.color || "#fff",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
            title={`(${x},${y})`}
          />
        ))}
      </div>
    ))}
  </div>
);

export default PixelWall;