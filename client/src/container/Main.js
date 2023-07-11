import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import AIArt from '../pages/AIArt';
import App from '../pages/_app';

function Main() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/NFTMarket" element={<App />} />
                <Route path="/AIArt" element={<AIArt />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Main;