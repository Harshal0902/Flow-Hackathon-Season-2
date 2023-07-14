// NFT Auction Contract

import FlowFees from 0xFLOW0xSTORAGE

pub contract NFTAuction {

    // NFT struct
    pub struct NFT {
        pub let id: UInt64
        pub let owner: Address
        pub var currentBid: UFix64
        pub var highestBidder: Address
    }

    // Public NFT collection
    pub var nfts: [UInt64: NFT]

    // Event emitted when an NFT is listed for auction
    pub event NFTListed(
        id: UInt64,
        owner: Address,
        startingBid: UFix64
    )

    // Event emitted when a bid is placed on an NFT
    pub event BidPlaced(
        id: UInt64,
        bidder: Address,
        bidAmount: UFix64
    )

    // Event emitted when an auction ends
    pub event AuctionEnded(
        id: UInt64,
        winner: Address,
        winningBid: UFix64
    )

    // Function to list an NFT for auction
    pub fun listNFTForAuction(id: UInt64, startingBid: UFix64) {
        let owner = getAccountAddress()

        // Create a new NFT and add it to the collection
        let newNFT = NFT(
            id: id,
            owner: owner,
            currentBid: startingBid,
            highestBidder: owner
        )

        self.nfts[id] = newNFT

        // Emit the NFTListed event
        emit NFTListed(id: id, owner: owner, startingBid: startingBid)
    }

    // Function to place a bid on an NFT auction
    pub fun placeBid(id: UInt64, bidAmount: UFix64) {
        let bidder = getAccountAddress()

        // Get the NFT from the collection
        let nft = self.nfts[id]

        // Validate the bid amount
        if bidAmount <= nft.currentBid {
            panic("Bid amount must be higher than the current bid")
        }

        // Transfer the previous highest bid amount back to the previous bidder
        if nft.highestBidder != nft.owner {
            FlowFees.deposit(from: account.address(to: nft.highestBidder), amount: nft.currentBid)
        }

        // Update the current bid and highest bidder
        nft.currentBid = bidAmount
        nft.highestBidder = bidder

        // Update the NFT in the collection
        self.nfts[id] = nft

        // Emit the BidPlaced event
        emit BidPlaced(id: id, bidder: bidder, bidAmount: bidAmount)
    }

    // Function to end an NFT auction and transfer the NFT to the highest bidder
    pub fun endAuction(id: UInt64) {
        let nft = self.nfts[id]

        // Transfer the NFT to the highest bidder
        let highestBidder = nft.highestBidder
        let owner = nft.owner

        // Transfer the NFT ownership
        owner.save(<-highestBidder.load("nfts"), to: /storage/nfts)
        highestBidder.save(id, to: /storage/nfts)

        // Transfer the bid amount to the NFT owner
        FlowFees.deposit(from: account.address(to: highestBidder), amount: nft.currentBid)

        // Remove the NFT from the collection
        self.nfts.remove(key: id)

        // Emit the AuctionEnded event
        emit AuctionEnded(id: id, winner: highestBidder, winningBid: nft.currentBid)
    }

    // Function to get the account address of the current transaction
    pub fun getAccountAddress(): Address {
        let address = getTransaction{ 
            getAccount(addrs: AuthAccount.address).address 
        }
        return address
    }
}
