'use client'

import { formatCents } from "@/lib/utils"
import { useCartStore } from "@/stores/cart-store"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

export default function CheckoutForm() {
  const { totalItems, totalPrice } = useCartStore()

  return (
    <div className="flex flex-col gap-4">
      <Label>
        Discout code
      </Label>
      <Input />
      <Separator />
      <div>Total items: {totalItems}</div>
      <div>Discount: $0</div>
      <div>Total price: {formatCents(totalPrice)}</div>
      <Separator />
      <Button className="w-full">
        Continue to payment
      </Button>
    </div>
  )
}