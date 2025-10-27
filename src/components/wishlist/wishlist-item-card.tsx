import { useWishlistStore } from "@/stores/wishlist-store";
import { WishlistItem } from "@/types/whishlist";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Button } from "../ui/button";
import { IconHeartBrokenFilled, IconShoppingCartMinus, IconShoppingCartPlus } from "@tabler/icons-react";
import { formatCents } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { useCartStore } from "@/stores/cart-store";
import { Product } from "@/types/product";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

function WishlistItemCard({ item } : { item: WishlistItem }) {
  const { removeWishlistItem } = useWishlistStore()
  const { addCartItem, removeCartItem, cartItems } = useCartStore()
  const product : Product = item.product as Product
  const isInCart = cartItems.some(i => i.productId === product.id)
  
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
          <div className="flex items-end gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"outline"} size={"icon"} onClick={() => isInCart ? removeCartItem(product.id) : addCartItem(product)} >
                  {!isInCart ? (
                    <IconShoppingCartPlus className="size-5" />
                  ) : (
                    <IconShoppingCartMinus className="size-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{!isInCart ? "Add to Cart" : "Remove from Cart"}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"outline"} size={"icon"} onClick={() => removeWishlistItem(item.productId)}>
                  <IconHeartBrokenFilled className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove from Wishlist</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Badge variant={"outline"}>
          <Image
            src={item.product?.imageUrls[0].url || '/fallback-image.png'}
            alt={item.product?.imageUrls[0].key || "Product image"}
            width={400}
            height={400}
            className="w-full aspect-square hover:scale-105 transition-all"
          />
        </Badge>
      </CardContent>
    </Card>
  )
}

function SkeletonWishlistItemCard() {
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
          <div className="flex items-end gap-3">
            <Button variant={"ghost"} size={"icon"}>
              <Skeleton className="size-9 " />
            </Button>
            <Button variant={"ghost"} size={"icon"} >
              <Skeleton className="size-9 " />
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full aspect-square " />
      </CardContent>
    </Card>
  )
}

export { WishlistItemCard, SkeletonWishlistItemCard }