import React from "react"
import Link from "next/link"
import Image from "next/image"

export default function Page() {

  return (
    <div className='md:mx-28 mx-4 text-white pt-10 pb-12'>

      <div className='md:grid md:grid-cols-2 items-center'>
        <div className=''>
          <h1 className='text-3xl md:text-6xl'>Who we are</h1>
          <p className='text-xl md:text-2xl py-4 tracking-wider'>An gaming NFT Marketplace</p>

          <Link href="/NFTMarket">
            <button className='bg-secondary py-2 px-8 rounded-md text-xl md:text-2xl'>NFT Marketplace</button>
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
          <p className='text-xl md:text-2xl py-4 tracking-wider'> APP NAME is a web app where you can:
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