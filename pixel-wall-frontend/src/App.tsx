import { useEffect, useState } from "react";
import "./App.css";
import PixelWall from "./components/PixelWall";
import { usePixelWall } from "./hooks/usePixelWall";

const WIDTH = 10;
const HEIGHT = 10;

type Pixel = { color: string; painter?: string };

function App() {
  const [pixels, setPixels] = useState<Pixel[][]>(
    Array.from({ length: HEIGHT }, () =>
      Array.from({ length: WIDTH }, () => ({ color: "#fff" }))
    )
  );
  const [selectedColor, setSelectedColor] = useState("#ff0000");
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const { getPixel, paintPixel } = usePixelWall();

  // Conectar wallet solo cuando el usuario pulsa el botón
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Cuentas conectadas:", accounts);
        setAccount(accounts[0]);
      } catch (err) {
        console.error("Error al conectar wallet:", err);
        alert("Wallet connection rejected.");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Traer el estado del muro desde el contrato
  const fetchWall = async () => {
    if (!account) return;
    setLoading(true);
    try {
      const wall: Pixel[][] = [];
      for (let y = 0; y < HEIGHT; y++) {
        const row: Pixel[] = [];
        for (let x = 0; x < WIDTH; x++) {
          try {
            const [color, painter] = await getPixel(x, y);
            row.push({ color: color || "#fff", painter });
          } catch {
            row.push({ color: "#fff" });
          }
        }
        wall.push(row);
      }
      setPixels(wall);
      console.log("Estado del muro actualizado:", wall);
    } finally {
      setLoading(false);
    }
  };

  // Cuando cambia la cuenta, traer el muro
  useEffect(() => {
    if (account) {
      fetchWall();
    }
    // Escuchar cambios de cuenta y red en MetaMask
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
    // eslint-disable-next-line
  }, [account]);

  // Pintar un pixel y refrescar el muro
  const handlePixelClick = async (x: number, y: number) => {
    if (!account) {
      alert("Connect your wallet first!");
      return;
    }
    setLoading(true);
    console.log("Intentando pintar:", { x, y, color: selectedColor, account });
    try {
      await paintPixel(x, y, selectedColor);
      console.log("Transacción enviada para pintar pixel:", { x, y, color: selectedColor, account });
      await fetchWall();
    } catch (err: unknown) {
      console.error("Error al pintar:", err);
      if (err && typeof err === "object" && "reason" in err) {
        alert((err as { reason?: string }).reason || "Transaction failed");
      } else if (err && typeof err === "object" && "message" in err) {
        alert((err as { message?: string }).message || "Transaction failed");
      } else {
        alert("Transaction failed");
      }
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
          />
        </label>
      </div>
      {/* BOTÓN DE CONEXIÓN */}
      {!account && (
        <button onClick={connectWallet} style={{ margin: "1rem 0" }}>
          Connect Wallet
        </button>
      )}
      {/* INFO DE CUENTA Y BOTÓN DE DESCONECTAR */}
      {account && (
        <div style={{ margin: "1rem 0", color: "#888", display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button
            onClick={() => setAccount(null)}
            style={{
              padding: "0.3rem 0.8rem",
              fontSize: "0.95rem",
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Disconnect
          </button>
        </div>
      )}
      {loading && <div>Loading...</div>}
      <PixelWall pixels={pixels} onPixelClick={handlePixelClick} />
    </div>
  );
}

export default App;
