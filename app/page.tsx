import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Coin Organizer site.'
}

export default function Home() {
  return (
    <main className='m-4 p-4 rounded-md'>
      Home
    </main>
  )
}
