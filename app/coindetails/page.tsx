import type { Metadata } from "next";
import { Coins, Images } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coin Details",
};

async function getCoinById(coinId: number) {
  const endpoint = `${process.env.BASE_URL}/api/getCoinById?id=${coinId}`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default async function CoinDetails(props: {
  searchParams: { id: number };
}) {
  const coinId = props.searchParams.id;
  const coin: Coins = await getCoinById(coinId);

  return (
    <div className="mt-4 grid grid-cols-5 gap-6">
      <div>
        <div className="rounded-3xl bg-teal-200 p-8">
          <p>
            <span className="font-bold">Country:</span>
            <br />
            {coin.Countries?.name}
          </p>
          {coin.Rulers && (
            <p className="mt-2">
              <span className="font-bold">Ruler:</span>
              <br />
              {coin.Rulers.name}
            </p>
          )}
          {coin.Periods && (
            <p className="mt-2">
              <span className="font-bold">Period:</span>
              <br />
              {coin.Periods.name} ({coin.Periods.years})
            </p>
          )}
          <p className="mt-2">
            <span className="font-bold">Year(s):</span>
            <br />
            {coin.yearStart}
            {coin.yearEnd && ` - ${coin.yearEnd}`}
          </p>
          <p className="mt-2">
            <span className="font-bold">Diameter:</span>
            <br />
            {coin.diameterMilimeters?.toString()} mm
          </p>
          <p className="mt-2">
            <span className="font-bold">Weight:</span>
            <br />
            {coin.weightGrams?.toString()} g
          </p>
          {coin.numistaNumber && (
            <p className="mt-2">
              <span className="font-bold">Numista Number:</span>
              <br />
              <Link
                href={`https://en.numista.com/catalogue/pieces${coin.numistaNumber}.html`}
              >
                {coin.numistaNumber}
              </Link>
            </p>
          )}
        </div>
        <p className="mt-3 text-xs">Ref# {coin.id}</p>
      </div>
      <div className="col-span-3">
        <h1 className="mt-4 text-2xl">
          {coin.commonName} ({coin.prettyFaceValue})
        </h1>
        {coin.seriesOrThemeName && (
          <div className="text-xs uppercase">
            Series: {coin.seriesOrThemeName}
          </div>
        )}
        <p className="mt-2">
          <span className="font-bold">Obverse: </span>
          {coin.obverse}
        </p>
        <p className="mt-2">
          <span className="font-bold">Reverse: </span>
          {coin.reverse}
        </p>
        <p className="mt-2">
          <span className="font-bold">Edge: </span>
          {coin.edge}
          {coin.edgeInscription && (
            <span> with inscription: {coin.edgeInscription}</span>
          )}
        </p>
      </div>
      <div>
        {Array.isArray(coin.Images) &&
          coin.Images.length > 0 &&
          coin.Images.map((image: Images) => (
            <Image
              className="mb-2 rounded-3xl"
              key={image.id}
              width={240}
              height={0}
              src={`/images/${image.url}`}
              alt={coin.commonName ?? "Coin image"}
              title={coin.commonName ?? "Coin image"}
            />
          ))}{" "}
      </div>
    </div>
  );
}
