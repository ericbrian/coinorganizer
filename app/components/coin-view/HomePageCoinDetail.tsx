import { Coins } from "@prisma/client";
import React from "react";
import CoinImage from "./CoinImage";
import Link from "next/link";

export default function HomePageCoinDetail(props: { coin: Coins }) {
  const coin = props.coin;

  return (
    <div className="mt-4 flex">
      <div className="w-36 flex-none">
        <CoinImage images={coin.Images} />
      </div>
      <div className="grow">
        <Link href={`/coindetails?id=${coin.id}`}>
          <p className="text-xl">
            {coin.commonName} ({coin.prettyFaceValue})
          </p>
          {coin.seriesOrThemeName && (
            <p className="text-xs">
              <span className="font-bold">Series:</span>{" "}
              <span className="uppercase">{coin.seriesOrThemeName}</span>
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
