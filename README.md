
# Pixel Wall DApp

**Author:** Daniela Silvana Tochi 
**Year:** 2025  
**Practice Project for Nucleo Program**

A full-stack decentralized application (dApp) where users can collaboratively paint a pixel on a 10x10 grid, powered by Ethereum smart contracts and a modern React frontend.

## Features

- **10x10 Pixel Wall:** Each user can paint one pixel with their chosen color.
- **Smart Contract Backend:** All pixel data and permissions are managed on-chain.
- **Modern React Frontend:** Responsive, accessible UI for interacting with the pixel wall.
- **Wallet Integration:** Connect with MetaMask or other Ethereum wallets (via wagmi).

## Project Structure

```
pixel-wall-dapp/
├── pixel-wall-frontend/   # React + Vite frontend
└── smart-contract/        # Hardhat smart contract project
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/danielas-tochi/pixel-wall-dapp.git
cd pixel-wall-dapp
```

### 2. Smart Contract: Local Development

**Install dependencies:**
```bash
cd smart-contract
npm install
```

**Start a local Hardhat node:**
```bash
npx hardhat node
```

**Deploy the contract locally:**
```bash
npx hardhat run scripts/deploy.js --network localhost
```
- Note the contract address printed in the output.

### 3. Frontend: Local Development

**Install dependencies:**
```bash
cd ../pixel-wall-frontend
npm install
```

**Configure contract address:**
- Update the frontend code with your local contract address and ABI as needed.

**Start the frontend:**
```bash
npm run dev
```
- Open [http://localhost:5173](http://localhost:5173) in your browser.

## How It Works

- **Connect your wallet** (e.g., MetaMask) to the local Hardhat network (http://127.0.0.1:8545).
- **Pick a color** and **click a pixel** to paint it.
- The frontend sends a transaction to the smart contract, which updates the pixel data on-chain.
- The UI updates to reflect the current state of the wall.

## Deploying to a Testnet (Sepolia)

1. Get a Sepolia RPC URL (from [Alchemy](https://alchemy.com/), [Infura](https://infura.io/), etc.) and a funded wallet private key.
2. Add a `.env` file in `smart-contract/`:
   ```
   SEPOLIA_RPC_URL=your_rpc_url
   PRIVATE_KEY=your_private_key
   ```
3. Update `hardhat.config.cjs` to include Sepolia network config.
4. Deploy:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```
5. Update the frontend with the new contract address and switch MetaMask to Sepolia.

## Accessibility & Responsiveness

- The pixel wall is fully responsive and accessible.
- High-contrast colors and keyboard navigation are supported.

## Technologies

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [wagmi](https://wagmi.sh/)
- [Solidity](https://soliditylang.org/)
- [Hardhat](https://hardhat.org/)

## License

MIT

## Credits
![Project Logo](./logo.png)
- Project by Daniela Silvana Tochi, 2025, for Nucleo Program practice.
- Built with [Hardhat](https://hardhat.org/), [React](https://react.dev/), [Vite](https://vitejs.dev/), and [wagmi](https://wagmi.sh/).
- *This project received assistance from ChatGPT (OpenAI) for code and documentation.*

For more details on each part, see the READMEs in [`pixel-wall-frontend/`](./pixel-wall-frontend/README.md) and [`smart-contract/`](./smart-contract/README.md).

**Happy hacking!**
