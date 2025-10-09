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

export function CartSheet() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore()
  return (
    <Sheet>
      <SheetTrigger asChild>
      <Button variant={"outline"} size={"icon"}>
        <IconShoppingCart className="size-6" />
      </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            View your shopping cart and checkout.
          </SheetDescription>
        </SheetHeader>
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Badge variant={"outline"}>
                    <Image src={item.product?.images || ""} alt={item.product?.name || ""} width={100} height={100} />
                  </Badge>
                  <div className="flex flex-col gap-2">
                    <div>
                      <h1 className="font-semibold">{item.product?.name}</h1>
                      <p className="opacity-50"><s>${item.product?.price}</s> | ${item.product?.discountedPrice}</p>
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
                <div className="flex flex-col gap-4">
                  <h1 className="font-semibold">${(item.product?.discountedPrice || 0) * item.quantity}</h1>
                  <Button variant={"destructive"} onClick={() => removeItem(item.productId)}>
                    <IconTrash />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <SheetFooter>
          <div className="flex justify-between w-full">
            <p className="font-semibold">Total cost is: ${totalPrice}</p>
            <p className="font-semibold">For {totalItems} items</p>
          </div>
          <Button type="submit">Checkout</Button>
          <SheetClose asChild>
            <Button variant="outline">Continue Shopping</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
