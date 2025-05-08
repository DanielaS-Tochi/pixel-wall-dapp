// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { hardhat } from 'wagmi/chains'
import { publicProvider } from '@wagmi/core/providers/public'
import { InjectedConnector } from '@wagmi/core/connectors/injected'

// Configurar chains y providers
const { chains, publicClient } = configureChains(
  [hardhat],
  [publicProvider()]
)

// Crear la configuración de wagmi
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains }),
  ],
  publicClient,
})

// Renderizar la app con WagmiConfig
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
)
