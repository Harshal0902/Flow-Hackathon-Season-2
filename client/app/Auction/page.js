"use client"

import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

const projectId = process.env.PROJECT_ID;
const projectSecret = process.env.PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfsClient = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export default function ImageUploader() {
  const [uploadedImageHash, setUploadedImageHash] = useState('');
  const [uploadedImageURL, setUploadedImageURL] = useState('');

  const [collection, setCollection] = useState(null);
  const [metadata, setMetadata] = useState(null);


  const handleCreateToken = async () => {
    try {
      const added = await ipfsClient.add(JSON.stringify(metadata));
      const hash = added.path;

      const transactionId = await fcl.send([
        fcl.transaction`
          import NFTAuction from ${contractAddress}
  
          transaction(ipfsHash: String, metadata: {String: String}) {
            prepare(acct: AuthAccount) {
              let collection <- acct.borrow<&NFTAuction.Collection>(from: /storage/Collection)
                ?? panic("Collection doesn't exist")
  
              let token <- NFTAuction.createToken(ipfsHash: ipfsHash, metadata: metadata)
              collection.deposit(token: <-token)
            }
          }
        `,
        fcl.args([
          fcl.arg(hash, t.String),
          fcl.arg(metadata, t.Dictionary(t.String, t.String)), // Modify this line
        ]),
        fcl.proposer(fcl.currentUser().authorization),
        fcl.payer(fcl.currentUser().authorization),
        fcl.authorizations([fcl.currentUser().authorization]),
        fcl.limit(9999),
      ]).then(fcl.decode);

      console.log('Transaction ID:', transactionId);
    } catch (error) {
      console.error('Error creating token:', error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const dataURL = reader.result;

      const imageMetadata = {
        dataURL: dataURL,
      };

      setMetadata(imageMetadata);
    };

    reader.readAsDataURL(file);
  };

  const handleCreateCollection = async () => {
    try {
      const transactionId = await fcl.send([
        fcl.transaction`
          import NFTAuction from ${contractAddress}

          transaction {
            prepare(acct: AuthAccount) {
              if !acct.borrow<&NFTAuction.Collection>(from: /storage/Collection).check() {
                let collection <- NFTAuction.createEmptyCollection()
                acct.save(<-collection, to: /storage/Collection)
                acct.link<&NFTAuction.Collection{NFTAuction.CollectionPublic}>(
                  /public/Collection,
                  target: /storage/Collection
                )
              }
            }
          }
        `,
        fcl.proposer(fcl.currentUser().authorization),
        fcl.payer(fcl.currentUser().authorization),
        fcl.authorizations([fcl.currentUser().authorization]),
        fcl.limit(9999),
      ]).then(fcl.decode);

      console.log('Transaction ID:', transactionId);
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  const handleGetCollection = async () => {
    try {
      const response = await fcl.send([
        fcl.script`
          import NFTAuction from ${contractAddress}

          pub fun getNFTs(): [UInt64] {
            let collection = getAccount(0xYourAccount).getCapability<&NFTAuction.Collection{NFTAuction.CollectionPublic}>(
              /public/Collection
            )?.borrow()

            return collection?.getIDs() ?? []
          }

          pub fun getNFTMetadata(id: UInt64): {String: String}? {
            let collection = getAccount(0xYourAccount).getCapability<&NFTAuction.Collection{NFTAuction.CollectionPublic}>(
              /public/Collection
            )?.borrow()

            let nft = collection?.borrowNFT(id: id)
            return nft?.metadata
          }

          pub fun main(): [{String: String}] {
            let ids = getNFTs()
            var metadata: [{String: String}] = []

            for id in ids {
              let item: {String: String} = {
                "id": id.toString(),
                "metadata": getNFTMetadata(id: id) ?? {}
              }
              metadata.append(item)
            }

            return metadata
          }
        `,
      ]).then(fcl.decode);

      console.log('Collection:', response);
      setCollection(response);
    } catch (error) {
      console.error('Error getting collection:', error);
    }
  };

  const handleImageRetrieve = () => {
    const imageURL = `https://ipfs.io/ipfs/${uploadedImageHash}`;

    setUploadedImageURL(imageURL);
  };


  return (
    <div>
      <div className='grid place-items-center py-16'>
        <div className="relative z-10 w-full max-w-2xl mt-20 lg:mt-0 lg:w-5/12">
          <div className="relative z-10 flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl">
            <h4 className="w-full text-4xl font-medium leading-snug text-center">Auction your NFT</h4>
            <div className="relative w-full mt-6 space-y-8">
              <div className="relative">
                <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">NFT Name(optional)</label>
                <input
                  type="text"
                  className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                  placeholder="NFT Name"
                />
              </div>

              <div className="relative">
                <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Bidding start date</label>
                <input
                  required
                  type="date"
                  className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                />
              </div>

              <div className="relative">
                <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Bidding end date</label>
                <input
                  required
                  type="date"
                  className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                />
              </div>

              <div className="relative">
                <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Minimum Bidding Amount(in Flow)</label>
                <input
                  required
                  type="number"
                  className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                  placeholder="0.8"
                />
              </div>

              <div className="relative">
                <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Upload File</label>
                <input
                  required
                  type="file"
                  onChange={handleImageUpload}
                  className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                  placeholder="Doe"
                />
              </div>

              {uploadedImageHash && (
                <div>
                  <p>Image Hash: {uploadedImageHash}</p>
                  <button className='bg-blue-500 text-xl px-2 py-1 rounded-lg mt-4 text-white' onClick={handleImageRetrieve}>Retrieve Image</button>
                </div>
              )}

              {uploadedImageURL && (
                <div>
                  <h2>Uploaded Image:</h2>
                  <img className='rounded-xl' src={uploadedImageURL} alt="Uploaded" />
                </div>
              )}

              <div className="relative">
                <button
                  className="inline-block w-full px-5 py-4 text-xl font-medium text-center rounded-lg bg-blue-600 text-white">
                  Put NFT for Auction
                </button>
              </div>
            </div>
          </div>
          <svg className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-gray-200 fill-current" viewBox="0 0 91 91" xmlns="http://www.w3.org/2000/svg">
            <g stroke="none" strokeWidth="1" fillRule="evenodd">
              <g fillRule="nonzero">
                <g>
                  <g>
                    <circle cx="3.261" cy="3.445" r="2.72"></circle>
                    <circle cx="15.296" cy="3.445" r="2.719"></circle>
                    <circle cx="27.333" cy="3.445" r="2.72"></circle>
                    <circle cx="39.369" cy="3.445" r="2.72"></circle>
                    <circle cx="51.405" cy="3.445" r="2.72"></circle>
                    <circle cx="63.441" cy="3.445" r="2.72"></circle>
                    <circle cx="75.479" cy="3.445" r="2.72"></circle>
                    <circle cx="87.514" cy="3.445" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 12)">
                    <circle cx="3.261" cy="3.525" r="2.72"></circle>
                    <circle cx="15.296" cy="3.525" r="2.719"></circle>
                    <circle cx="27.333" cy="3.525" r="2.72"></circle>
                    <circle cx="39.369" cy="3.525" r="2.72"></circle>
                    <circle cx="51.405" cy="3.525" r="2.72"></circle>
                    <circle cx="63.441" cy="3.525" r="2.72"></circle>
                    <circle cx="75.479" cy="3.525" r="2.72"></circle>
                    <circle cx="87.514" cy="3.525" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 24)">
                    <circle cx="3.261" cy="3.605" r="2.72"></circle>
                    <circle cx="15.296" cy="3.605" r="2.719"></circle>
                    <circle cx="27.333" cy="3.605" r="2.72"></circle>
                    <circle cx="39.369" cy="3.605" r="2.72"></circle>
                    <circle cx="51.405" cy="3.605" r="2.72"></circle>
                    <circle cx="63.441" cy="3.605" r="2.72"></circle>
                    <circle cx="75.479" cy="3.605" r="2.72"></circle>
                    <circle cx="87.514" cy="3.605" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 36)">
                    <circle cx="3.261" cy="3.686" r="2.72"></circle>
                    <circle cx="15.296" cy="3.686" r="2.719"></circle>
                    <circle cx="27.333" cy="3.686" r="2.72"></circle>
                    <circle cx="39.369" cy="3.686" r="2.72"></circle>
                    <circle cx="51.405" cy="3.686" r="2.72"></circle>
                    <circle cx="63.441" cy="3.686" r="2.72"></circle>
                    <circle cx="75.479" cy="3.686" r="2.72"></circle>
                    <circle cx="87.514" cy="3.686" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 49)">
                    <circle cx="3.261" cy="2.767" r="2.72"></circle>
                    <circle cx="15.296" cy="2.767" r="2.719"></circle>
                    <circle cx="27.333" cy="2.767" r="2.72"></circle>
                    <circle cx="39.369" cy="2.767" r="2.72"></circle>
                    <circle cx="51.405" cy="2.767" r="2.72"></circle>
                    <circle cx="63.441" cy="2.767" r="2.72"></circle>
                    <circle cx="75.479" cy="2.767" r="2.72"></circle>
                    <circle cx="87.514" cy="2.767" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 61)">
                    <circle cx="3.261" cy="2.846" r="2.72"></circle>
                    <circle cx="15.296" cy="2.846" r="2.719"></circle>
                    <circle cx="27.333" cy="2.846" r="2.72"></circle>
                    <circle cx="39.369" cy="2.846" r="2.72"></circle>
                    <circle cx="51.405" cy="2.846" r="2.72"></circle>
                    <circle cx="63.441" cy="2.846" r="2.72"></circle>
                    <circle cx="75.479" cy="2.846" r="2.72"></circle>
                    <circle cx="87.514" cy="2.846" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 73)">
                    <circle cx="3.261" cy="2.926" r="2.72"></circle>
                    <circle cx="15.296" cy="2.926" r="2.719"></circle>
                    <circle cx="27.333" cy="2.926" r="2.72"></circle>
                    <circle cx="39.369" cy="2.926" r="2.72"></circle>
                    <circle cx="51.405" cy="2.926" r="2.72"></circle>
                    <circle cx="63.441" cy="2.926" r="2.72"></circle>
                    <circle cx="75.479" cy="2.926" r="2.72"></circle>
                    <circle cx="87.514" cy="2.926" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 85)">
                    <circle cx="3.261" cy="3.006" r="2.72"></circle>
                    <circle cx="15.296" cy="3.006" r="2.719"></circle>
                    <circle cx="27.333" cy="3.006" r="2.72"></circle>
                    <circle cx="39.369" cy="3.006" r="2.72"></circle>
                    <circle cx="51.405" cy="3.006" r="2.72"></circle>
                    <circle cx="63.441" cy="3.006" r="2.72"></circle>
                    <circle cx="75.479" cy="3.006" r="2.72"></circle>
                    <circle cx="87.514" cy="3.006" r="2.719"></circle>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <svg className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-blue-600 fill-current" viewBox="0 0 91 91" xmlns="http://www.w3.org/2000/svg">
            <g stroke="none" strokeWidth="1" fillRule="evenodd">
              <g fillRule="nonzero">
                <g>
                  <g>
                    <circle cx="3.261" cy="3.445" r="2.72"></circle>
                    <circle cx="15.296" cy="3.445" r="2.719"></circle>
                    <circle cx="27.333" cy="3.445" r="2.72"></circle>
                    <circle cx="39.369" cy="3.445" r="2.72"></circle>
                    <circle cx="51.405" cy="3.445" r="2.72"></circle>
                    <circle cx="63.441" cy="3.445" r="2.72"></circle>
                    <circle cx="75.479" cy="3.445" r="2.72"></circle>
                    <circle cx="87.514" cy="3.445" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 12)">
                    <circle cx="3.261" cy="3.525" r="2.72"></circle>
                    <circle cx="15.296" cy="3.525" r="2.719"></circle>
                    <circle cx="27.333" cy="3.525" r="2.72"></circle>
                    <circle cx="39.369" cy="3.525" r="2.72"></circle>
                    <circle cx="51.405" cy="3.525" r="2.72"></circle>
                    <circle cx="63.441" cy="3.525" r="2.72"></circle>
                    <circle cx="75.479" cy="3.525" r="2.72"></circle>
                    <circle cx="87.514" cy="3.525" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 24)">
                    <circle cx="3.261" cy="3.605" r="2.72"></circle>
                    <circle cx="15.296" cy="3.605" r="2.719"></circle>
                    <circle cx="27.333" cy="3.605" r="2.72"></circle>
                    <circle cx="39.369" cy="3.605" r="2.72"></circle>
                    <circle cx="51.405" cy="3.605" r="2.72"></circle>
                    <circle cx="63.441" cy="3.605" r="2.72"></circle>
                    <circle cx="75.479" cy="3.605" r="2.72"></circle>
                    <circle cx="87.514" cy="3.605" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 36)">
                    <circle cx="3.261" cy="3.686" r="2.72"></circle>
                    <circle cx="15.296" cy="3.686" r="2.719"></circle>
                    <circle cx="27.333" cy="3.686" r="2.72"></circle>
                    <circle cx="39.369" cy="3.686" r="2.72"></circle>
                    <circle cx="51.405" cy="3.686" r="2.72"></circle>
                    <circle cx="63.441" cy="3.686" r="2.72"></circle>
                    <circle cx="75.479" cy="3.686" r="2.72"></circle>
                    <circle cx="87.514" cy="3.686" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 49)">
                    <circle cx="3.261" cy="2.767" r="2.72"></circle>
                    <circle cx="15.296" cy="2.767" r="2.719"></circle>
                    <circle cx="27.333" cy="2.767" r="2.72"></circle>
                    <circle cx="39.369" cy="2.767" r="2.72"></circle>
                    <circle cx="51.405" cy="2.767" r="2.72"></circle>
                    <circle cx="63.441" cy="2.767" r="2.72"></circle>
                    <circle cx="75.479" cy="2.767" r="2.72"></circle>
                    <circle cx="87.514" cy="2.767" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 61)">
                    <circle cx="3.261" cy="2.846" r="2.72"></circle>
                    <circle cx="15.296" cy="2.846" r="2.719"></circle>
                    <circle cx="27.333" cy="2.846" r="2.72"></circle>
                    <circle cx="39.369" cy="2.846" r="2.72"></circle>
                    <circle cx="51.405" cy="2.846" r="2.72"></circle>
                    <circle cx="63.441" cy="2.846" r="2.72"></circle>
                    <circle cx="75.479" cy="2.846" r="2.72"></circle>
                    <circle cx="87.514" cy="2.846" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 73)">
                    <circle cx="3.261" cy="2.926" r="2.72"></circle>
                    <circle cx="15.296" cy="2.926" r="2.719"></circle>
                    <circle cx="27.333" cy="2.926" r="2.72"></circle>
                    <circle cx="39.369" cy="2.926" r="2.72"></circle>
                    <circle cx="51.405" cy="2.926" r="2.72"></circle>
                    <circle cx="63.441" cy="2.926" r="2.72"></circle>
                    <circle cx="75.479" cy="2.926" r="2.72"></circle>
                    <circle cx="87.514" cy="2.926" r="2.719"></circle>
                  </g>
                  <g transform="translate(0 85)">
                    <circle cx="3.261" cy="3.006" r="2.72"></circle>
                    <circle cx="15.296" cy="3.006" r="2.719"></circle>
                    <circle cx="27.333" cy="3.006" r="2.72"></circle>
                    <circle cx="39.369" cy="3.006" r="2.72"></circle>
                    <circle cx="51.405" cy="3.006" r="2.72"></circle>
                    <circle cx="63.441" cy="3.006" r="2.72"></circle>
                    <circle cx="75.479" cy="3.006" r="2.72"></circle>
                    <circle cx="87.514" cy="3.006" r="2.719"></circle>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>

      </div>
    </div>
  );
}
