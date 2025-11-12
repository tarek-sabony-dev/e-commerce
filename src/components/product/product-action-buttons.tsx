'use client'

import Link from "next/link"
import { Button } from "../ui/button"
import { useSession } from "next-auth/react"
import { useCartStore } from "@/stores/cart-store"
import { Product } from "@/types/product"
import { IconHeart, IconHeartFilled } from "@tabler/icons-react"
import { useWishlistStore } from "@/stores/wishlist-store"

function AddToCartButton ({ product } : { product: Product }) {
  const { addCartItem, removeCartItem, cartItems } = useCartStore()

  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated' && session?.user

  const isInCart = cartItems.some(item => item.productId === product.id)

  return (
    <>
      {isAuthenticated ? (
        <Button onClick={() => isInCart ? removeCartItem(product.id) : addCartItem(product)}>
          <span>{isInCart ? "Remove from Cart" : "Add to Cart"}</span>
        </Button>
      ) : (
        <Link href="/auth/signin">
          <Button>
            <span>Add to Cart</span>
          </Button>
        </Link>
      )}
    </>
  )
}

function AddToWishlistButton ({ product } : { product: Product }) {
  const { addWishlistItem, removeWishlistItem, wishlistItems } = useWishlistStore()
  const isInWishlist = wishlistItems.some(item => item.productId === product.id)
  

  return (
    <>
      <Button variant={"ghost"} size={"icon"} onClick={() => isInWishlist ? removeWishlistItem(product.id) : addWishlistItem(product)}>
        {!isInWishlist ? (
          <IconHeart className="size-6" />
        ) : (
          <IconHeartFilled className="size-6" />
        )
        }
      </Button>
    </>
  )
}

export {
  AddToCartButton,
  AddToWishlistButton
}