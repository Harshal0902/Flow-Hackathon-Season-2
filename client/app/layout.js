import './globals.css'
import { Montserrat } from 'next/font/google'
import Navbar from './components/Navbar'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'GameSorcery',
  description: 'An gaming asset NFT marketplace.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}