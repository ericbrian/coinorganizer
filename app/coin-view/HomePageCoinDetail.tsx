import { coin as dbCoin } from "@prisma/client";
import React from "react";
import CoinImage from "./CoinImage";
import Link from "next/link";

export default function HomePageCoinDetail(props: { coin: dbCoin }) {
  const coin = props.coin;

  return (
    <div className="mt-4 flex">
      <div className="w-36 flex-none">
        <CoinImage images={coin.image} />
      </div>
      <div className="grow">
        <Link href={`/coin-details?id=${coin.id}`}>
          <p className="text-xl">
            {coin.common_name} ({coin.pretty_face_value})
          </p>
          {coin.series_or_theme_name && (
            <p className="text-xs">
              <span className="font-bold">Series:</span>{" "}
              <span className="uppercase">{coin.series_or_theme_name}</span>
            </p>
          )}
          <p className="mt-2 line-clamp-2">
            <span className="font-bold">Obversee:</span> {coin.obverse}
          </p>
          <p className="line-clamp-2">
            <span className="font-bold">Reverse:</span> {coin.reverse}
          </p>
          <p className="pt-2 text-xs">Ref#: {coin.id}</p>
        </Link>
      </div>
    </div>
  );
}
