import { useWishlistStore } from "@/stores/wishlist-store";
import { WishlistItem } from "@/types/whishlist";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Button } from "../ui/button";
import { IconTrash } from "@tabler/icons-react";
import { formatCents } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { useCartStore } from "@/stores/cart-store";
import { Product } from "@/types/product";

function WishlistItemCard({ item } : { item: WishlistItem }) {
  const { removeWishlistItem } = useWishlistStore()
  const { addCartItem, removeCartItem, cartItems } = useCartStore()
  const product : Product = item.product as Product
  const isInCart = cartItems.some(i => i.productId === product.id)
  
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
            <div className="w-full flex flex-col justify-center items-start gap-4">
              <div>
                <h1 className="font-semibold">{item.product?.name}</h1>
                <p className="opacity-50"><s>{formatCents(item.product?.price ?? 0)}</s> | {formatCents(item.product?.discountedPrice ?? item.product?.price ?? 0)}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <Button variant={"destructive"} size={"icon"} onClick={() => removeWishlistItem(item.productId)}>
              <IconTrash />
            </Button>
            <Button onClick={() => isInCart ? removeCartItem(product.id) : addCartItem(product)} >
              <span>{isInCart ? "Remove from Cart" : "Add to Cart"}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SkeletonWishlistItemCard() {
  return (
    <Card className="py-4 lg:py-6">
      <CardContent className="px-4 lg:px-6">
        <div className="w-full flex justify-between items-start gap-4">
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <Skeleton className="w-[100px] h-[100px] aspect-square " />
            <div className="w-full flex flex-col justify-center items-start gap-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-[120px] h-3 " />
                <Skeleton className="w-[160px] h-3 " />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <Skeleton className="size-9 " />
            <Skeleton className="w-24 h-9 " />
            <Skeleton />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { WishlistItemCard, SkeletonWishlistItemCard }