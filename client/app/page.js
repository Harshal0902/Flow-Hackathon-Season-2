"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

export default function Page() {

  const [user, setUser] = React.useState();

  return (
    <div>
      {user && user.addr ? (
        <div className="flex items-center justify-center h-[95vh] w-10/12 m-auto lg:w-11/12">
          <div className="grid items-center justify-items-center text-center max-w-3xl">
            <h1 className="text-6xl md:text-5xl sm:text-4xl font-bold text-slate-300">Extra Ordinary</h1>
            <h1 className="text-6xl md:text-5xl sm:text-4xl font-bold text-slate-300"><span>NFTs</span> You&apos;ll Love</h1>
            <p className="text-base md:text-sm text-slate-500 my-5
              ">I Design Your Dreams. I believe you have a unique taste, discover the possibilities of the NFT World. Mint Your NFTs on the top of Ethereum Blockchain. Your dreams is my first priority. So, let&apos;s enjoy this incredible NFTs World.</p>
          </div>
        </div>
      ) :
        (
          <div className='md:mx-28 mx-4 pt-10 pb-12'>
            <div className='md:grid md:grid-cols-2 items-center'>
              <div className=''>
                <h1 className='text-3xl md:text-6xl'>Who we are</h1>
                <p className='text-xl md:text-2xl py-4 tracking-wider'>An gaming NFT Marketplace</p>

                <Link href="/NFTMarket">
                  <button className='bg-secondary py-2 px-8 rounded-md text-xl md:text-2xl text-white'>NFT Marketplace</button>
                </Link>

              </div>
              <div className="grid place-items-center py-4 drop-shadow-3xl shadow-black">
                <Image src="hero.svg" alt="img" width="300" height="300" />
              </div>
            </div>

            <div className='md:grid md:grid-cols-2 pt-12 items-center'>
              <div className="grid place-items-center py-4 drop-shadow-3xl shadow-black">
                <Image src="feat.svg" alt="img" width="300" height="300" />
              </div>
              <div className=''>
                <h1 className='text-3xl md:text-5xl'>What else do we have</h1>
                <p className='text-xl md:text-2xl py-4 tracking-wider'> GameSorcery is a web app where you can:
                </p>
                <ul className="text-xl">
                  <li className="list-disc">Trade your AI Asset</li>
                  <li className="list-disc">Create your own AI Asset</li>
                  <li className="list-disc">Royalty and Commission System</li>
                  <li className="list-disc">Buy and Sell gaming assets as NFT</li>
                </ul>
              </div>
            </div>
          </div>
        )
      }

    </div>
  )
}