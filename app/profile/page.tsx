"use client";

import { getUserCollectionItems } from "@/http/collection";
import { IconButton } from "@mui/material";
import { collection as collectionDb } from "@prisma/client";
import { useEffect, useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { IconButtonProps } from "@mui/material/IconButton";
import Image from "next/image";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Profile() {
  const [collection, setCollection] = useState<collectionDb[]>([]);

  useEffect(() => {
    getUserCollectionItems()
      .then((res) => {
        setCollection(res);
      })
      .catch(console.log);
  }, []);

  return (
    <>
      <h1 className="text-2xl">Profile</h1>
      <div>
        {collection &&
          Array.isArray(collection) &&
          collection.length > 0 &&
          collection.map((item) => (
            <div
              key={item.id}
              className="flex flex-row rounded-lg p-2 shadow-md"
            >
              <div className="basis-1/5 rounded-md bg-green-500 p-4">
                {/* <div>{JSON.stringify(item)}</div> */}

                <div className="text-lg">Features</div>
                <div className="text-sm">
                  <div>Country: {item.coin.country.name}</div>
                  {item.coin.period && (
                    <div>
                      Period: {item.coin.period.name} ({item.coin.period.years})
                    </div>
                  )}
                  <div>
                    Years: {item.coin.year_start}
                    {item.coin.year_end && ` - ${item.coin.year_end}`}
                  </div>
                  {item.coin.currency && (
                    <div>Currency: {item.coin.currency.name}</div>
                  )}
                  <div>Composition: {item.coin.composition}</div>
                  <div>Weight: {item.coin.weight_grams}</div>
                  <div>Diameter: {item.coin.diameter_milimeters}</div>
                  {item.coin.shape && <div>Shape: {item.coin.shape.name}</div>}
                  {item.coin.numista_number && (
                    <div>Numista Number: {item.coin.numista_number}</div>
                  )}
                  {item.coin.currency?.demonitized_date && (
                    <div className="mt-2 font-bold">Demonitized</div>
                  )}
                </div>
              </div>
              <div className="basis-3/5 p-4">
                <div>
                  <span className="text-xl">
                    {item.year} {item.coin.common_name},{" "}
                    {item.coin.pretty_face_value}
                  </span>
                </div>
                {item.coin.series_or_theme_name && (
                  <div className="text-sm uppercase">
                    {item.coin.series_or_theme_name}
                  </div>
                )}
                <div className="mt-3">
                  <span className="font-bold">Obverse</span>:{" "}
                  {item.coin.obverse}
                </div>
                <div className="mt-2">
                  <span className="font-bold">Reverse</span>:{" "}
                  {item.coin.reverse}
                </div>
                <div className="mt-2">
                  <span className="font-bold">Edge</span>: {item.coin.edge}
                  {item.coin.edge_inscription && (
                    <span>
                      . <span className="font-bold">Inscription</span>:{" "}
                      {item.coin.edge_inscription}
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  <span className="font-bold">Engravers/Designers:</span>
                </div>
                <div className="mt-2">
                  <span className="font-bold">Mint</span>:{" "}
                  {item.mint && item.mint.mint},{" "}
                  {item.mint && item.mint.mark_description}
                  {item.mint && item.mint.mark && (
                    <span> ({item.mint.mark})</span>
                  )}
                </div>
                <div className="mt-2">
                  <span className="font-bold">Source Info</span>:{" "}
                  {item.currency.short_name}
                  {item.paid_amount}, {item.sourced_from} on{" "}
                  {item.sourced_when &&
                    new Date(item.sourced_when).toLocaleDateString()}
                </div>
              </div>
              <div className="basis-1/5">
                {item.coin.image[0]?.url && (
                  <Image
                    src={"/images/" + item.coin.image[0]?.url}
                    alt={item.coin.common_name}
                    className="w-60 rounded-full"
                    style={{ height: "auto" }}
                    width={120}
                    height={0}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
