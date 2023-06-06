import type { Metadata } from "next"
import appconfig from "../appconfig"
import HomePageCoinDetail from "./components/coin-view/HomePageCoinDetail";
import { Coins } from "@prisma/client";

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

const MAX_COINS = 5;

async function getCoins() {
  const endpoint = `${process.env.BASE_URL}/api/getLatestCoins?max=${MAX_COINS}`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default async function Home() {
  const coins: Coins[] = await getCoins();
  return (
    <main className='m-4 p-4 rounded-md'>
      <h1 className="text-2xl font-bold">Latest Coins Added to Database</h1>
      {
        Array.isArray(coins) &&
        coins.length > 0 &&
        coins.map(
          (coin: Coins) => <HomePageCoinDetail key={coin.id} coin={coin} />
        )
      }
    </main>
  )
}
