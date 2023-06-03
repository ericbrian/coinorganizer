import type { Metadata } from "next"
import appconfig from "../appconfig"

export const metadata: Metadata = {
  title: appconfig.siteName,
  description: 'Welcome to Coin Organizer site.'
}

type Api = {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: string;
  Cors: boolean;
  Link: string;
  Category: string;
}

const getApis = async (): Promise<Api[]> => {
  const res = await fetch(`http://127.0.0.1:8080/api-list.json`);
  if (!res.ok) {
    throw new Error('failed to fetch');
  }
  const data = await res.json();
  return data.entries;
}

export default async function Home() {
  const apis = await getApis();
  console.log(apis)
  return (
    <main className='m-4 p-4 rounded-md'>
      Home
    </main>
  )
}
