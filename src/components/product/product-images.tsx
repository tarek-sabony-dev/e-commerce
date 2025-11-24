'use client'

import { ImageObject } from "@/types/general-types"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { useState } from "react"
import { Spinner } from "../ui/spinner"

export default function ProductImages ({ imageUrls } : { imageUrls: ImageObject[] }) {
  const [thumdnailImage, setThumdnailImage] = useState(imageUrls?.[0])
  const [loading, setLoding] = useState(true)

  return (
    <>
      <Badge variant={"outline"}>
        <Image
          width={400}
          height={400}
          src={thumdnailImage.url}
          alt={thumdnailImage.key}
          className="w-full aspect-square hover:scale-105 transition-all"
        />
      </Badge>
      <div className="flex gap-2 flex-wrap">
        {imageUrls.filter(img => img !== thumdnailImage).map((img) => (
          <Badge variant={"outline"} key={img.key} onClick={() => setThumdnailImage(img)}>
            <Image
              width={50}
              height={400}
              src={img.url}
              alt={img.key}
              onLoadingComplete={() => setLoding(false)}
              className="w-full aspect-square hover:scale-105 transition-all"
              />
              {loading && (
                <Spinner className="absolute size-12" />
              )}
          </Badge>
        ))}
      </div>
    </>
  )
}
