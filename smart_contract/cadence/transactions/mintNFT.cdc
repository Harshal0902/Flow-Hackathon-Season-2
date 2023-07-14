export const mintNFT = `
import MyNFT from 0x1c3253f9b277f35a

transaction(ipfsHash: String, name: String) {

  prepare(acct: AuthAccount) {
    let collection = acct.borrow<&MyNFT.Collection>(from: /storage/MyNFTCollection)
                        ?? panic("This collection does not exist here")

    let nft <- MyNFT.createToken(ipfsHash: ipfsHash, metadata: {"name": name})

    collection.deposit(token: <- nft)
  }

  execute {
    log("A user minted an NFT into their account")
  }
}
`