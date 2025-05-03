# Pixel Wall Smart Contract

This folder contains the Ethereum smart contract and Hardhat project for the Pixel Wall dApp.

## Features

- 10x10 pixel wall stored on-chain
- Each address can paint one pixel
- Pixel color and painter are recorded and can be queried

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run tests:**
   ```bash
   npx hardhat test
   ```

3. **Start a local Hardhat node:**
   ```bash
   npx hardhat node
   ```

4. **Deploy the contract locally:**
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

## Deployment to Testnet

- See the [root README](../README.md) for instructions on deploying to Sepolia or other testnets.

## Technologies

- [Solidity](https://soliditylang.org/)
- [Hardhat](https://hardhat.org/)

---

For project-wide instructions, see the [root README](../README.md).
