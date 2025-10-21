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
import { IconMinus, IconPlus, IconShoppingCart, IconTrash } from "@tabler/icons-react"
import { Card, CardContent } from "./ui/card"
import { useCartStore } from "@/stores/cart-store"
import Image from "next/image"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { formatCents } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { AlertCircleIcon } from "lucide-react"

export function CartSheet() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, error } = useCartStore()
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
              {items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Your cart is empty
                </div>
              ) : (
                items.map((item) => (
                  <Card key={item.id} className="py-4 lg:py-6">
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
                ))
              )}
            </div>
            <SheetFooter>
              <div className="flex justify-between w-full">
                <p className="font-semibold">Total cost is: ${totalPrice}</p>
                <p className="font-semibold">For {totalItems} items</p>
              </div>
              <Button type="submit" disabled={items.length === 0}>Checkout</Button>
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
