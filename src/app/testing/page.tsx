'use client'

import { useCartStore } from "@/stores/cart-store"

export default function CategoriesPage() {
  const { items } = useCartStore()
  return (
    <>
      {items.map((item) => (
        <div key={item.id}>
          <h1>{item.product?.name}</h1>
          <p>{item.product?.price}</p>
        </div>
      ))}
    </>
  )
}
