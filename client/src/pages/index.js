import React from 'react'
import Style from '../styles/index.module.css';
import { BigNFTSilder, HeroSection, NFTCard,Service,Subscribe,Title} from '../components/componentsindex';
const Home1 = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection/>
      <Service/>
      <BigNFTSilder/>
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <NFTCard/>
      <Subscribe/>
    </div>
  )
}

export default Home1