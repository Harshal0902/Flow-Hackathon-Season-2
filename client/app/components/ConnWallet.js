"use client"
import * as fcl from "@onflow/fcl";
import React, { useState, useEffect } from 'react'
import Image from "next/image";

export default function ConnWallet() {
    const [user, setUser] = React.useState();

    const handleWalletLogin = async () => {
      try {
        await fcl.authenticate(); // Replace '/page' with the correct URL or route to the "Page.js" page
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };

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
    <>
      <header className="border border-l-0 border-r-0 bg-[#1B2129] border-white/10 h-[9vh] flex items-center justify-center fixed top-0 left-0 right-0 opacity-100 z-[2000]">
        <nav className="flex items-center justify-between w-10/12  lg:w-11/12 m-auto">
            <a className="flex items-center"><Image src={`https://raw.githubusercontent.com/thirdweb-dev/typescript-sdk/main/logo.svg`} alt='thirdweb/logo' width={45} height={43} priority decoding="async" objectFit="contain" /> <span className="text-2xl text-slate-300 font-bold ml-2">NFTs</span></a>

            {user && user.addr ? (
              <ul className="flex items-center">
                <button type="button" className="text-lg text-blue-500 ring-2 ring-blue-600 rounded-lg px-5 py-1.5 hover:bg-blue-600 hover:text-slate-300 transition-all active:scale-90 shadow-lg hover:shadow-blue-600 md:text-sm md:px-4 md:py-1">Address: {user.addr}</button>
                <button type="button" className="text-lg text-blue-500 ring-2 ring-blue-600 rounded-lg px-5 py-1.5 hover:bg-blue-600 hover:text-slate-300 transition-all active:scale-90 shadow-lg hover:shadow-blue-600 md:text-sm md:px-4 md:py-1" onClick={() => fcl.unauthenticate()}>Log Out</button>
              </ul>
            ) : (
              <ul className="group relative">
                <button type="button" className="text-lg text-blue-500 ring-2 ring-blue-600 rounded-lg px-5 py-1.5 hover:bg-blue-600 hover:text-slate-300 transition-all active:scale-90 shadow-lg hover:shadow-blue-600 md:text-sm md:px-4 md:py-1" onClick={() => handleWalletLogin()}>Log In</button>
              </ul>
            )}
        </nav>
      </header>

    </>
  );
};