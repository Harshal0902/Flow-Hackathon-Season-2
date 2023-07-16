"use client"

import React, { useState, useEffect } from 'react'
import Image from "next/image";


export default function Navbar() {

  return (
    <>
      <header className="border border-l-0 border-r-0 bg-[#1B2129] border-white/10 h-[9vh] flex items-center justify-center fixed top-0 left-0 right-0 opacity-100 z-[2000]">
        <nav className="flex items-center justify-between w-10/12  lg:w-11/12 m-auto">
            <a className="flex items-center"><Image src={`https://raw.githubusercontent.com/thirdweb-dev/typescript-sdk/main/logo.svg`} alt='thirdweb/logo' width={45} height={43} priority decoding="async" objectFit="contain" /> <span className="text-2xl text-slate-300 font-bold ml-2">NFTs</span></a>

        </nav>
      </header>

    </>
  );
};