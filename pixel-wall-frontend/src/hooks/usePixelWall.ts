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