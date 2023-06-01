import type { Metadata } from "next"
import appconfig from "./appconfig"

export const metadata: Metadata = {
  title: appconfig.siteName,
  description: 'Welcome to Coin Organizer site.'
}

export default function Home() {
  return (
    <main className='m-4 p-4 rounded-md'>
      Home
    </main>
  )
}
