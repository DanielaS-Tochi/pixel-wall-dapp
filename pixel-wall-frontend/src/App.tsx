import { useState } from "react";
import "./App.css";
import PixelWall from "./components/PixelWall";

const WIDTH = 10;
const HEIGHT = 10;

type Pixel = { color: string };

function App() {
  const [pixels, setPixels] = useState<Pixel[][]>(
    Array.from({ length: HEIGHT }, () =>
      Array.from({ length: WIDTH }, () => ({ color: "#fff" }))
    )
  );
  const [selectedColor, setSelectedColor] = useState("#ff0000");

  const handlePixelClick = (x: number, y: number) => {
    setPixels((prev) =>
      prev.map((row, rowIdx) =>
        row.map((pixel, colIdx) =>
          rowIdx === y && colIdx === x ? { color: selectedColor } : pixel
        )
      )
    );
  };

  return (
    <div style={{ padding: 20, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ margin: 0 }}>Pixel Wall</h1>
        
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
        <img
    src="/painting.png" 
    alt="Imagen"
    style={{ width: 150, height: 150, objectFit: "contain" }}
        />
        </div>
        <div>
        <label>
          Pick a color:{" "}
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
        </label>
      </div>
      <PixelWall pixels={pixels} onPixelClick={handlePixelClick} />
    </div>
  );
}

export default App;

