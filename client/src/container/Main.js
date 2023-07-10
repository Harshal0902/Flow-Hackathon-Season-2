import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import NFTMarket from '../pages/NFTMarket';
import AIArt from '../pages/AIArt';

function Main() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/NFTMarket" element={<NFTMarket />} />
                <Route path="/AIArt" element={<AIArt />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Main;