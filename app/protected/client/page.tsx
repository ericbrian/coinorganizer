'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function ClientProtectedPage() {
  const { data: session } = useSession({
    required: true,
    // onUnauthenticated() {
    //   redirect(`/signin?callbackUrl=${process.env.NEXTAUTH_URL}`)
    // }
  })
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-2xl font-bold">
          This is a <span>client-side</span> protected page.
        </h1>
        <h2 className="mt-4 font-medium">You are logged in as:</h2>
        <p className="mt-4">{session?.user?.name}</p>
      </div>
    </section>
  )
}
