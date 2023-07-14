import React from 'react'
import Image from 'next/image'

export default function AllNFT() {
  return (
    <div>
      <div className="grid place-items-center">
        <h1 className="text-4xl text-white text-center">All NFTs</h1>
        <div className="bg-secondary w-32 h-1 my-2 rounded-md"></div>
      </div>

      <div className='text-white text-center'>(Below are some sample images for UI)</div>

      <div className="flex flex-wrap items-center justify-around space-x-4 space-y-4">
        <div className="bg-white w-72 p-6 rounded-lg shadow-lg translate-y-2">
          <Image
            src="/creatorbackground-2.jpeg"
            alt="opportunity1"
            className="w-full h-50 object-cover rounded-lg"
            width="200"
            height="200"
          />
          <h1 className="text-2xl font-bold text-gray-800 py-2">
            A lake in the mountains
          </h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Buy this NFT</button>
        </div>

        <div className="bg-white w-72 p-6 rounded-lg shadow-lg translate-y-2">
          <Image
            src="/creatorbackground-2.jpeg"
            alt="opportunity1"
            className="w-full h-50 object-cover rounded-lg"
            width="200"
            height="200"
          />
          <h1 className="text-2xl font-bold text-gray-800 py-2">
            A lake in the mountains
          </h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Buy this NFT</button>
        </div>

        <div className="bg-white w-72 p-6 rounded-lg shadow-lg translate-y-2">
          <Image
            src="/creatorbackground-2.jpeg"
            alt="opportunity1"
            className="w-full h-50 object-cover rounded-lg"
            width="200"
            height="200"
          />
          <h1 className="text-2xl font-bold text-gray-800 py-2">
            A lake in the mountains
          </h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Buy this NFT</button>
        </div>

        <div className="bg-white w-72 p-6 rounded-lg shadow-lg translate-y-2">
          <Image
            src="/creatorbackground-2.jpeg"
            alt="opportunity1"
            className="w-full h-50 object-cover rounded-lg"
            width="200"
            height="200"
          />
          <h1 className="text-2xl font-bold text-gray-800 py-2">
            A lake in the mountains
          </h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Buy this NFT</button>
        </div>
      </div>

    </div>
  )
}
