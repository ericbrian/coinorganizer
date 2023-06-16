import { Metadata } from "next";
import React from "react";

type AddImageCoins = {
  common_name: string;
  pretty_face_value: string;
  id: number;
  year_start: string;
  year_end: string;
  country_name: string;
};

export const metadata: Metadata = {
  title: "Coin Details",
};

async function getCoinsWithoutImages() {
  const endpoint = `${process.env.BASE_URL}/api/getCoinsWithoutImages`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function AddImagesToCoins() {
  const coins: AddImageCoins[] = await getCoinsWithoutImages();

  const allowDrop = (e: any) => e.preventDefault();

  const drag = (e: any) => e.dataTransfer.setData("text", e.target.id);

  const drop = (e: any) => {
    e.preventDefault();
    const coinId = e.target.id.split("-")[1];
    const data = e.dataTransfer.getData("text");
    const payload = { coin_id: +coinId, url: data, is_preferred: false };
    if (coinId && data) {
      e.target.appendChild(document.getElementById(data));
      // createImage(payload);
    } else {
      console.error(JSON.stringify(payload));
    }
  };

  return (
    <div className="mt-4 grid grid-cols-2 gap-6">
      <div>
        {" "}
        {[].map((name, i) => (
          <img
            style={{ display: "inline-block" }}
            id={name}
            src={"/images/" + name}
            draggable="true"
            onDragStart={(e) => drag(e)}
            width="100"
            height="100"
            alt="*"
            key={i}
          />
        ))}
      </div>
      <div>
        {!Array.isArray(coins) || (coins.length === 0 && <div>no coins</div>)}
        {Array.isArray(coins) &&
          coins.length > 0 &&
          coins.map((coin) => (
            <div
              key={coin.id}
              id={"coin-" + coin.id}
              className="drag-target-container"
              onDrop={(e) => drop(e)}
              onDragOver={(e) => allowDrop(e)}
            >
              {coin.country_name}
              <br />
              {coin.common_name}, {coin.year_start}-{coin.year_end} (
              {coin.pretty_face_value}) (#{coin.id})
            </div>
          ))}
      </div>
    </div>
  );
}
