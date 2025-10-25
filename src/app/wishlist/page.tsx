'use client'

import { useWishlistStore } from "@/stores/wishlist-store"

export default function WishlistPage() {
  const { wishlistItems } = useWishlistStore()

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold text-center mb-8">Wishlist</h1>
      {wishlistItems.map((item) => (
        <div key={item.id} className="border-b border-gray-300 py-4">
          <h2 className="text-xl font-semibold">{item.product?.name || 'Product Name'}</h2>
          <p className="text-gray-600">Product ID: {item.productId}</p>
        </div>
      ))}
    </div>
  )
}
