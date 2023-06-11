import type { Metadata } from "next";
import { coin as dbCoin, image as dbImage } from "@prisma/client";
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
  const coin: dbCoin = await getCoinById(coinId);

  return (
    <div className="mt-4 grid grid-cols-5 gap-6">
      <div>
        <div className="rounded-3xl bg-teal-200 p-8">
          <p>
            <span className="font-bold">Country:</span>
            <br />
            {coin.country?.name}
          </p>
          {coin.ruler && (
            <p className="mt-2">
              <span className="font-bold">Ruler:</span>
              <br />
              {coin.ruler.name}
            </p>
          )}
          {coin.period && (
            <p className="mt-2">
              <span className="font-bold">Period:</span>
              <br />
              {coin.period.name} ({coin.period.years})
            </p>
          )}
          <p className="mt-2">
            <span className="font-bold">Year(s):</span>
            <br />
            {coin.year_start}
            {coin.year_end && ` - ${coin.year_end}`}
          </p>
          <p className="mt-2">
            <span className="font-bold">Diameter:</span>
            <br />
            {coin.diameter_milimeters?.toString()} mm
          </p>
          <p className="mt-2">
            <span className="font-bold">Weight:</span>
            <br />
            {coin.weight_grams?.toString()} g
          </p>
          {coin.numista_number && (
            <p className="mt-2">
              <span className="font-bold">Numista Number:</span>
              <br />
              <Link
                href={`https://en.numista.com/catalogue/pieces${coin.numista_number}.html`}
              >
                {coin.numista_number}
              </Link>
            </p>
          )}
        </div>
        <p className="mt-3 text-xs">Ref# {coin.id}</p>
      </div>
      <div className="col-span-3">
        <h1 className="mt-4 text-2xl">
          {coin.common_name} ({coin.pretty_face_value})
        </h1>
        {coin.series_or_theme_name && (
          <div className="text-xs uppercase">
            Series: {coin.series_or_theme_name}
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
          {coin.edge_inscription && (
            <span> with inscription: {coin.edge_inscription}</span>
          )}
        </p>
      </div>
      <div>
        {Array.isArray(coin.image) &&
          coin.image.length > 0 &&
          coin.image.map((image: dbImage) => (
            <Image
              className="mb-2 rounded-3xl"
              key={image.id}
              width={240}
              height={0}
              src={`/images/${image.url}`}
              alt={coin.common_name ?? "Coin image"}
              title={coin.common_name ?? "Coin image"}
            />
          ))}{" "}
      </div>
    </div>
  );
}