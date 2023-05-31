import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Coin Organizer site.'
}

export default function Home() {
  return (
    <main className='m-12 p-4 rounded-md bg-slate-100'>
      Home
    </main>
  )
}
