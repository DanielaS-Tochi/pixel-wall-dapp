import { useCallback } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../contractInfo";

export function usePixelWall() {
  // Get the contract instance
  const getContract = () => {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  };

  // Read a pixel
  const getPixel = useCallback(async (x: number, y: number) => {
    const contract = getContract();
    return await contract.getPixel(x, y);
  }, []);

  // Paint a pixel
  const paintPixel = useCallback(async (x: number, y: number, color: string) => {
    const contract = getContract();
    const tx = await contract.paintPixel(x, y, color);
    await tx.wait();
  }, []);

  return { getPixel, paintPixel };
}
// import { useCallback } from "react";
// import { useAccount } from "wagmi";
// import { ethers } from "ethers";
// import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../contractInfo";

// export function usePixelWall() {
//   const { address } = useAccount();

//   // Get the contract instance
//   const getContract = useCallback(() => {
//     if (!window.ethereum) throw new Error("No crypto wallet found");
    
//     // Usar directamente ethers.js con window.ethereum
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
    
//     return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
//   }, []);

//   // Read a pixel
//   const getPixel = useCallback(async (x: number, y: number) => {
//     // Para lecturas podemos usar el provider (no requiere firma)
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
//     return await contract.getPixel(x, y);
//   }, []);

//   // Paint a pixel
//   const paintPixel = useCallback(async (x: number, y: number, color: string) => {
//     if (!address) throw new Error("No wallet connected");
//     const contract = getContract();
//     console.log("Enviando transacción paintPixel con:", { x, y, color, from: address });
//     const tx = await contract.paintPixel(x, y, color);
//     console.log("Transacción enviada:", tx.hash);
//     await tx.wait();
//     console.log("Transacción confirmada");
//   }, [getContract, address]);

//   return { getPixel, paintPixel };
// }