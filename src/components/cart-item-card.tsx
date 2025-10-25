'use client'

import { CartItem } from "@/types/cart";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { formatCents } from "@/lib/utils";
import { Button } from "./ui/button";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { Input } from "./ui/input";
import { useCartStore } from "@/stores/cart-store";
import { Skeleton } from "./ui/skeleton";

function CartItemCard({ item } : { item: CartItem }) {
  const { removeItem, updateQuantity } = useCartStore()

  return (
    <Card className="py-4 lg:py-6">
      <CardContent className="px-4 lg:px-6">
        <div className="w-full flex justify-between items-start gap-4">
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <Badge variant={"outline"}>
              <Image
                src={item.product?.imageUrls[0].url || '/fallback-image.png'}
                alt={item.product?.imageUrls[0].key || "Product image"}
                width={100}
                height={100}
              />
            </Badge>
            <div className="w-full flex flex-col justify-between items-start gap-4">
              <div>
                <h1 className="font-semibold">{item.product?.name}</h1>
                <p className="opacity-50"><s>{formatCents(item.product?.price ?? 0)}</s> | {formatCents(item.product?.discountedPrice ?? item.product?.price ?? 0)}</p>
              </div>
              <Badge variant={"outline"}>
                <Button variant={"ghost"} size={"icon"} onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                  <IconMinus />
                </Button>
                <Input
                  className="text-center border-0 bg-transparent dark:bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-transparent"
                  size={2}
                  value={item.quantity}
                  onChange={(e) => {
                  const next = parseInt(e.target.value, 10)
                  updateQuantity(item.productId, Number.isNaN(next) ? 1 : next)
                }} />
                <Button variant={"ghost"} size={"icon"} onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                  <IconPlus />
                </Button>
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <Button variant={"destructive"} size={"icon"} onClick={() => removeItem(item.productId)}>
              <IconTrash />
            </Button>
            <h1 className="font-semibold">{formatCents(((item.product?.discountedPrice ?? item.product?.price ?? 0) * item.quantity))}</h1>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SkeletonCartItemCard() {
  return (
    <Card className="py-4 lg:py-6">
      <CardContent className="px-4 lg:px-6">
        <div className="w-full flex justify-between items-start gap-4">
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <Skeleton className="w-[100px] h-[100px] " />
            <div className="w-full flex flex-col justify-center items-start gap-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-[120px] h-3 " />
                <Skeleton className="w-[160px] h-3 " />
              </div>
              <Badge variant={"outline"}>
                <Button variant={"ghost"} size={"icon"}>
                  <IconMinus />
                </Button>
                <Input
                  className="text-center border-0 bg-transparent dark:bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-transparent"
                  size={2}
                />
                <Button variant={"ghost"} size={"icon"}>
                  <IconPlus />
                </Button>
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <Button variant={"destructive"} size={"icon"}>
              <IconTrash />
            </Button>
            <Skeleton />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { CartItemCard, SkeletonCartItemCard }