'use client'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IconShoppingCart } from "@tabler/icons-react"
import { useCartStore } from "@/stores/cart-store"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { CartItemCard, SkeletonCartItemCard } from "./cart-item-card"

export function CartSheet() {
  const { cartItems, totalPrice, totalItems, error, isLoading } = useCartStore()
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated' && session?.user
  const isMobile = useIsMobile()

  return (
    <Sheet>
      <SheetTrigger asChild>
      <Button variant={"outline"} size={"icon"}>
        <IconShoppingCart className="size-6" />
      </Button>
      </SheetTrigger>
      <SheetContent side={isMobile? "bottom" : "right"} className={isMobile? 'h-[90%] overflow-scroll' : ''}>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {isAuthenticated ? "View your shopping cart and checkout." : "Please log in to view your cart."}
          </SheetDescription>
        </SheetHeader>
        
        {!isAuthenticated ? (
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <p className="text-center text-muted-foreground mb-4">
              You need to be logged in to use the shopping cart.
            </p>
            <div className="flex gap-2">
              <Link href="/auth/signin">
                <Button>Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 px-4 overflow-scroll">
              {isLoading && (
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <SkeletonCartItemCard key={index} />
                  ))}
                </div>
              )}
              {error && (
                <Alert variant={"destructive"}>
                  <AlertCircleIcon />
                  <AlertTitle>
                    {error}
                  </AlertTitle>
                  <AlertDescription>
                    <p>Please check your internet connection and try again.</p>
                  </AlertDescription>
                </Alert>
              )}
              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Your cart is empty
                </div>
              ) : (
                cartItems.map((item) => (
                  <CartItemCard key={item.id} item={item} />
                ))
              )}
            </div>
            <SheetFooter>
              <div className="flex justify-between w-full">
                <p className="font-semibold">Total cost is: ${totalPrice}</p>
                <p className="font-semibold">For {totalItems} items</p>
              </div>
              <Button type="submit" disabled={cartItems.length === 0}>Checkout</Button>
              <SheetClose asChild>
                <Button variant="outline">Continue Shopping</Button>
              </SheetClose>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
