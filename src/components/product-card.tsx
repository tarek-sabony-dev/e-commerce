'use client'

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { IconHeart, IconStar, IconStarFilled, IconStarHalfFilled } from "@tabler/icons-react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { formatCents } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Product } from "@/types/product";
import { useCartStore } from "@/stores/cart-store";
import { Skeleton } from "./ui/skeleton";
import { useSession } from "next-auth/react";
import Link from "next/link";

function ProductCard({ product } : { product: Product }) {
  const { addItem, removeItem, items } = useCartStore()
  const { data: session, status } = useSession()
  const isInCart = items.some(item => item.productId === product.id)
  const thumdnailImage = product.imageUrls?.[0]
  const isAuthenticated = status === 'authenticated' && session?.user

  return (
    <>
      <Card className="w-full h-full rounded-2xl">
        <CardHeader>
          <CardAction>
            <Button variant={"ghost"} size={"icon"}>
              <IconHeart className="size-6" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Separator/>
          <Image
            width={400}
            height={400}
            src={thumdnailImage?.url ?? "/smartphone.png"}
            alt={thumdnailImage?.key ?? product.name}
            className="w-full hover:scale-105 transition-all"
          />
          <Separator/>
        </CardContent>
        <CardFooter className="flex flex-col justify-center items-start gap-4 ">
          <div className="flex flex-col justify-center items-start gap-1">
            <h1 className="font-semibold">{product.name}</h1>
            <p className="opacity-50">{product.description}</p>
          </div>
          <div className="flex items-center gap-1">
            <IconStarFilled size={16} />
            <IconStarFilled size={16} />
            <IconStarFilled size={16} />
            <IconStarHalfFilled size={16} />
            <IconStar size={16} />
            <Badge variant={"outline"}>
              {product.rating}
            </Badge>
          </div>
          <div className="w-full flex justify-between">
            {isAuthenticated ? (
              <Button onClick={() => isInCart ? removeItem(product.id) : addItem(product)}>
                <span>{isInCart ? "Remove from Cart" : "Add to Cart"}</span>
              </Button>
            ) : (
              <Link href="/auth/signin">
                <Button>
                  <span>Add to Cart</span>
                </Button>
              </Link>
            )}
            <Badge variant={"outline"} className="flex gap-2">
              <span>
                <s>{formatCents(product.price)}</s>
              </span>
              <Separator orientation="vertical" />
              <span>
                {formatCents(product.discountedPrice ?? product.price)}
              </span>
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

function SkeletonProductCard(){
  return (
    <Card className="w-full h-full rounded-2xl">
      <CardHeader>
        <CardAction>
          <Button variant={"ghost"} size={"icon"}>
            <IconHeart className="size-6" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Separator/>
        <Skeleton className="w-full aspect-square rounded-3xl" />
        <Separator/>
      </CardContent>
      <CardFooter className="flex flex-col justify-center items-start gap-4 ">
        <div className="w-full flex flex-col justify-center items-start gap-1">
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-[75%] h-4" />
        </div>
        <div className="w-full flex items-center gap-1">
          <Skeleton className="w-1/2 h-4" />
        </div>
        <div className="w-full flex justify-between">
          <Skeleton />
          <Badge variant={"outline"} className="flex gap-2">
            <Skeleton className="size-4" />
            <Separator orientation="vertical" />
            <Skeleton className="size-4" />
          </Badge>
        </div>
      </CardFooter>
    </Card>
  )
}

export { ProductCard, SkeletonProductCard }