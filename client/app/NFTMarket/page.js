"use client"

import React, { useState } from 'react'
import AllNFT from '../components/AllNFT'
import MintNFT from '../components/MintNFT'
import MyNFT from '../components/MyNFT'

export default function page() {

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div className="grid place-items-center">
                <h1 className="text-6xl text-white text-center">NFT Marketplace</h1>
                <div className="bg-secondary w-96 h-1 my-2 rounded-md"></div>


                <div className="flex mt-8 space-x-16 bg-[#585369] rounded-lg px-16 py-2">
                    <button
                        className={`py-2 px-4 rounded-lg ${activeTab === 1 ? 'bg-secondary text-white' : 'bg-[#2a2835] text-white'
                            }`}
                        onClick={() => handleTabClick(1)}
                    >
                        All NFT's
                    </button>
                    <button
                        className={`py-2 px-4 rounded-lg ${activeTab === 2 ? 'bg-secondary text-white' : 'bg-[#33313F] text-white'
                            }`}
                        onClick={() => handleTabClick(2)}
                    >
                        Mint NFT
                    </button>
                    <button
                        className={`py-2 px-4 rounded-lg ${activeTab === 3 ? 'bg-secondary text-white' : 'bg-[#33313F] text-white'
                            }`}
                        onClick={() => handleTabClick(3)}
                    >
                        My NFT's
                    </button>
                </div>

                <div className="mt-4 p-4 w-full px-36">
                    {activeTab === 1 && <div><AllNFT /></div>}
                    {activeTab === 2 && <div><MintNFT /></div>}
                    {activeTab === 3 && <div><MyNFT /></div>}
                </div>

            </div>


        </div>

    )
}
