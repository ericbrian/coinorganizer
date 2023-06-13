import type { Metadata } from "next";
import appconfig from "../appconfig";
import HomePageCoinDetail from "./components/coin-view/HomePageCoinDetail";
import { coin as dbCoin } from "@prisma/client";

export const metadata: Metadata = {
  title: appconfig.siteName,
  description: "Welcome to Coin Organizer site.",
};

const MAX_COINS = 5;

async function getCoins() {
  const endpoint = `${process.env.BASE_URL}/api/coins/latest?max=${MAX_COINS}`;
  const res = await fetch(endpoint, { next: { revalidate: 600 } });

  if (!res.ok) {
    console.log(res);
  }
  return await res.json();
}

export default async function Home() {
  const coins: dbCoin[] = await getCoins();
  return (
    <>
      <h1 className="text-2xl font-bold">Latest Coins Added to Database</h1>
      {Array.isArray(coins) &&
        coins.length > 0 &&
        coins.map((coin: dbCoin) => (
          <HomePageCoinDetail key={coin.id} coin={coin} />
        ))}
    </>
  );
}
