import './globals.css'
import { Inter } from 'next/font/google'
import appconfig from '../appconfig'
import Provider from './components/Provider'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: appconfig.siteName,
  description: appconfig.siteDescription
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex h-full flex-col'>
        <Provider>
          <Header />
          <div className="grow">{children}</div>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
