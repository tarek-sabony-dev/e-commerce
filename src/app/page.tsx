'use client'

import { useCartStore } from "@/stores/cart-store"
import Image from "next/image"

export default function CategoriesPage() {
  const { items } = useCartStore()
  return (
    <>
      <h1>Cart</h1>
      {items.map((item) => (
        <div key={item.id}>
          <h1>{item.product?.name}</h1>
          <p>{item.product?.price}</p>
          <Image src={item.product?.images || ""} alt={item.product?.name || ""} width={100} height={100} />
        </div>
      ))}
    </>
  )
}
