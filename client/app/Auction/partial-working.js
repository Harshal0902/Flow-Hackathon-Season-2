"use client"

import React, { useState } from 'react';
import { t } from "@onflow/types";
import * as fcl from '@onflow/fcl';
import { create } from 'ipfs-http-client';

// Contract Address for NFTAuction
const contractAddress = '0x631e88ae7f1d7c20';

// IPFS Configuration
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

export default function NFTAuctionComponent() {
  const [ipfsHash, setIpfsHash] = useState('');
  // const [metadata, setMetadata] = useState({});
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
          fcl.arg(metadata, t.Dictionary(t.String, t.String)), // <- This line has been updated
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

  return (
    <div>
      <h1>Create NFT Token</h1>
      {/* <input
                type="text"
                placeholder="IPFS Hash"
                value={ipfsHash}
                onChange={(e) => setIpfsHash(e.target.value)}
            /> */}
      <input type="file" onChange={handleImageUpload} />

      {/* this is printed */}
      {metadata && (
        <input
          type="text"
          placeholder="Metadata"
          value={metadata.dataURL}
          onChange={(e) => setMetadata(e.target.value)}
        />
      )}
      <button onClick={handleCreateToken}>Create Token</button>

      <h1>Create Collection</h1>
      <button onClick={handleCreateCollection}>Create Collection</button>

      <h1>Get Collection</h1>
      <button onClick={handleGetCollection}>Get Collection</button>

      {collection &&
        collection.map((item) => (
          <div key={item.id}>
            <h2>ID: {item.id}</h2>
            <p>Metadata: {JSON.stringify(item.metadata)}</p>
          </div>
        ))}
    </div>
  );
}