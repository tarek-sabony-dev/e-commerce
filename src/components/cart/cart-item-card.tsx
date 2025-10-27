'use client'

import { CartItem } from "@/types/cart";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { formatCents } from "@/lib/utils";
import { Button } from "../ui/button";
import { IconMinus, IconPlus, IconShoppingCartMinus, IconShoppingCartPlus, IconTrash } from "@tabler/icons-react";
import { Input } from "../ui/input";
import { useCartStore } from "@/stores/cart-store";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

function CartItemCard({ item } : { item: CartItem }) {
  const { removeCartItem, updateQuantity } = useCartStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="text-xl font-semibold">{item.product?.name}</h1>
        </CardTitle>
        <CardDescription>
          <p><s>{formatCents(item.product?.price ?? 0)}</s> | {formatCents(item.product?.discountedPrice ?? item.product?.price ?? 0)}</p>
        </CardDescription>
        <CardAction>
          <div className="flex flex-col items-end gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"outline"} size={"icon"} onClick={() => removeCartItem(item.productId)}>
                  <IconShoppingCartMinus className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove from Cart</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row justify-between gap-4 ">
        <Badge variant={"outline"}>
          <Image
            src={item.product?.imageUrls[0].url || '/fallback-image.png'}
            alt={item.product?.imageUrls[0].key || "Product image"}
            width={120}
            height={120}
          />
        </Badge>
        <div className="flex flex-col justify-end items-end gap-4">
          <h1 className="text-xl font-semibold">{formatCents(((item.product?.discountedPrice ?? item.product?.price ?? 0) * item.quantity))}</h1>
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
      </CardContent>
    </Card>
  )
}

function SkeletonCartItemCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-32 h-4 " />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-12 h-4 " />
        </CardDescription>
        <CardAction>
          <div className="flex flex-col items-end gap-4">
            <Button variant={"ghost"} size={"icon"}>
              <Skeleton className="size-9" />
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent  className="flex flex-col lg:flex-row justify-between gap-4 ">
        <Skeleton className="w-[120px] h-[120px] " />
        <div className="flex flex-col justify-end items-end gap-4">
          <Skeleton className="w-12 h-4 " />
          <Skeleton className="w-40 h-11 " />
        </div>
      </CardContent>
    </Card>
  )
}

export { CartItemCard, SkeletonCartItemCard }