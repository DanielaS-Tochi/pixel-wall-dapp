// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const PixelWall = await hre.ethers.getContractFactory("PixelWall");
  const pixelWall = await PixelWall.deploy();
  await pixelWall.waitForDeployment();

  console.log("PixelWall deployed to:", await pixelWall.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
