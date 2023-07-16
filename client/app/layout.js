"use client"
import './globals.css'
import * as fcl from "@onflow/fcl";
import { Montserrat } from 'next/font/google'
import React, {useEffect } from 'react'
import Navbar from "./components/Nav"
import Connect from './components/connect'
import Page from './page';
import ConnWallet from './components/ConnWallet';

const inter = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'GameSorceryFLOW',
  description: 'An gaming asset NFT marketplace.',
}

export default function RootLayout() {
  const [user, setUser] = React.useState();
  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
    fcl.config()
      .put('challenge.handshake', 'https://fcl-discovery.vercel.app/api/fcl/authn')
      .put('env', 'testnet')
      .put('accessNode.api', 'https://access-testnet.onflow.org')
      .put('0xProfile', '0xPROFILE_CONTRACT_ADDRESS')
      .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")
      .put("discovery.authn.endpoint", "https://fcl-discovery.onflow.org/api/testnet/authn")
      .put("app.detail.title", "GameSorceryFLOW")
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <ConnWallet/>
        <Connect/>
      </body>
    </html>
  )
}
