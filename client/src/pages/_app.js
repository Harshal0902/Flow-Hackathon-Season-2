import '../styles/miniglobals.css'
import { Footer, Navbar } from '../components/componentsindex';



const App = ({ Component, pageProps }) => (
    <div>
        <Navbar/>
        <Component {...pageProps} />
        <Footer/>
    </div>
)

export default App;