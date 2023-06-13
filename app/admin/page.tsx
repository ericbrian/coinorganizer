import { Metadata } from "next";
import React from "react";
import { coin as dbCoin, image as dbImage } from "@prisma/client";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Functions",
};

export default async function CoinDetails() {
  return (
    <div className="m-auto mt-4 grid max-w-xl grid-cols-2 gap-6">
      <div>
        <h1 className="text-2xl">Coin Related</h1>
        <ol className="list-disc">
          <li>
            <Link href="/admin/add-coin">Add a Coin</Link>
          </li>
          <li>
            <Link href="/admin/add-images">Add Images to Coins</Link>
          </li>
        </ol>
      </div>
      <div>
        <h1 className="text-2xl">Non-Coin Tables</h1>
        <ul className="list-disc"></ul>
      </div>
    </div>
  );
}
