"use client";

import appconfig from "@/appconfig";
import Image from "next/image";
import React from "react";
import allImages from "./images.json";

type AddImageCoins = {
  common_name: string;
  pretty_face_value: string;
  id: number;
  year_start: string;
  year_end: string;
  country_name: string;
};

const filterImages = (
  imagesAlreadyUsed: { url: string }[],
  imagePool: string[]
) => {
  let hold = imagePool.filter((r) => !r.endsWith(".mov"));
  const imagesNamesAlreadyUsed = imagesAlreadyUsed.map((r) => r.url);
  imagesNamesAlreadyUsed.forEach((image) => {
    const locatedAt = hold.indexOf(image);
    if (locatedAt > -1) {
      hold.splice(locatedAt, 1);
    }
  });
  return hold;
};

async function getCoinsWithoutImages() {
  const endpoint = `${appconfig.envs.dev.clientBaseUrl}/api/coins/withoutimages`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    return [];
  }
}

async function getImagesNames() {
  const endpoint = `${appconfig.envs.dev.clientBaseUrl}/api/images/namesonly`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    return [];
  }
}

const saveImageToCoinRecord = (payload: any) => {};

export default async function AddImagesToCoins() {
  const coins: AddImageCoins[] = await getCoinsWithoutImages();
  const images: { url: string }[] = await getImagesNames();

  images.sort((a, b) => (a < b ? 0 : 1));
  const filteredImages = filterImages(images, allImages);

  const allowDrop = (e: any) => e.preventDefault();
  const drag = (e: any) => e.dataTransfer.setData("text", e.target.id);
  const drop = (e: any) => {
    e.preventDefault();
    const coinId = e.target.id.split("-")[1];
    const data = e.dataTransfer.getData("text");
    const payload = { coin_id: +coinId, url: data, is_preferred: false };
    if (coinId && data) {
      e.target.appendChild(document.getElementById(data));
      saveImageToCoinRecord(payload);
    } else {
      console.error(JSON.stringify(payload));
    }
  };

  return (
    <div className="mt-4 grid grid-cols-2 gap-6">
      <div>
        {Array.isArray(filteredImages) &&
          filteredImages.length > 0 &&
          filteredImages.map((name) => (
            <div
              key={name}
              className="max-w-40 inline-block h-40 max-h-40 w-40"
            >
              <Image
                style={{ display: "inline-block" }}
                id={name}
                src={"/images/" + name}
                draggable="true"
                onDragStart={(e) => drag(e)}
                width="0"
                height="0"
                sizes="100vw"
                className="h-auto w-full"
                alt={name}
              />
            </div>
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
              className="max-w-40 drag-target-container inline-block h-40 max-h-40 w-40"
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