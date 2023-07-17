"use client"

import { useState, useEffect } from 'react';
import { AiOutlineReload } from "react-icons/ai";
import Image from 'next/image'
import { getSaleNFTsScript } from "../scripts/getSaleNFTsScript";
import { purchaseTx } from "../transactions/purchase.js";


export default function AllNFT() {

  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    getUserSaleNFTs();
  }, [])

  const getUserSaleNFTs = async () => {
      const result = await fcl.send([
          fcl.script(getSaleNFTsScript),
          fcl.args([
              fcl.arg(props.address, t.Address)
          ])
      ]).then(fcl.decode);

      console.log(result);
      setNFTs(result);
  }

  const purchase = async (id) => {
    const transactionId = await fcl.send([
        fcl.transaction(purchaseTx),
        fcl.args([
          fcl.arg(props.address, t.Address),
          fcl.arg(parseInt(id), t.UInt64)
        ]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999)
      ]).then(fcl.decode);
  
      console.log(transactionId);
      return fcl.tx(transactionId).onceSealed();
  }

  return (
    <div>
      <div className="grid place-items-center">
        <h1 className="text-4xl text-center">All NFTs</h1>
        <div className="bg-secondary w-32 h-1 my-2 rounded-md"></div>
      </div>

      <div className='relative'>
        <AiOutlineReload className="w-6 h-6 absolute right-0 cursor-pointer font-[900]" />
      </div>

      <div className="flex flex-wrap items-center justify-around pt-8 pb-12 space-x-4 space-y-4">

        {Object.keys(nfts).map(nftID => (
          <div className="bg-white w-72 p-6 rounded-lg shadow-lg translate-y-2">
            <Image
              src={`https://flowww.infura-ipfs.io/ipfs/${nfts[nftID].nftRef.ipfsHash}`}
              alt="opportunity1"
              className="w-full h-50 object-cover rounded-lg"
              width="200"
              height="200"
            />
            <h1 className="text-2xl font-bold text-gray-800 py-2">
              {nft.title}
            </h1> <br />
            <h1 className="text-2xl font-bold text-gray-800 py-2">
            {nfts[nftID].price}
            </h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">Buy this NFT</button>
          </div>
        ))}


      </div>

    </div>
  )
}
