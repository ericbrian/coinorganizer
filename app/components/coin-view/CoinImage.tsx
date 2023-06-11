import React from "react";
import { image as Images } from "@prisma/client";
import Image from "next/image";

export default function CoinImage(props: { images: Images[] }) {
  const images = props.images;

  if (!images || images.length === 0) return <div>none</div>;

  let preferredImage = images.filter((image: Images) => image.is_preferred)[0];
  if (!preferredImage) {
    preferredImage = images[0];
  }

  return (
    <Image
      width={120}
      height={0}
      src={`/images/${preferredImage.url}`}
      alt="coin image"
    />
  );
}
