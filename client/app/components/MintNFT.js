"use client"

import React, { useState } from 'react'
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { mintNFT } from '../transactions/mintNFT';
import { create } from 'ipfs-http-client';

const projectId = process.env.PROJECT_ID;
const projectSecret = process.env.PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth
    }
});
export default function MinyNFT() {
    const [nameOfNFT, setNameOfNFT] = useState('');
    const [file, setFile] = useState();
    const [isFileSelected, setIsFileSelected] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setIsFileSelected(!!selectedFile);
    };

    const mint = async () => {
        try {
            const added = await client.add(file);
            const hash = added.path;

            const transactionId = await fcl.send([
                fcl.transaction(mintNFT),
                fcl.args([
                    fcl.arg(hash, t.String),
                    fcl.arg(nameOfNFT, t.String)
                ]),
                fcl.payer(fcl.authz),
                fcl.proposer(fcl.authz),
                fcl.authorizations([fcl.authz]),
                fcl.limit(9999)
            ]).then(fcl.decode);

            console.log("Transaction ID: " + transactionId);
            return fcl.tx(transactionId).onceSealed();
        } catch (error) {
            console.log('Error uploading file: ', error);
        }
    };

    return (
        <div className='grid place-items-center py-16'>
            <div className="relative z-10 w-full max-w-2xl mt-20 lg:mt-0 lg:w-5/12">
                <div className="relative z-10 flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl">
                    <h4 className="w-full text-4xl font-medium leading-snug">Mint your NFT</h4>
                    <div className="relative w-full mt-6 space-y-8">
                        <div className="relative">
                            <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">NFT Name(optional)</label>
                            <input
                                type="text"
                                onChange={(e) => setNameOfNFT(e.target.value)}
                                className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                placeholder="John"
                            />
                        </div>
                        <div className="relative">
                            <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Upload NFT</label>
                            <input
                                required
                                type="file"
                                onChange={handleFileChange}
                                className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                                placeholder="Doe"
                            />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => mint()}
                                disabled={!isFileSelected}
                                className={`inline-block w-full px-5 py-4 text-xl font-medium text-center rounded-lg ${isFileSelected ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                                    }`}
                            >
                                Mint NFT
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
    )
}