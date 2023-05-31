import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' h-screen'}>
        <h1>My NavBar</h1>
        <h1><Link href='/profile'>Profile</Link></h1>
        {children}
      </body>
    </html>
  )
}
