import { Product } from "./product";

export interface Wishlist {
  items: WishlistItem[]
  totalItems: number
}

export interface WishlistItem {
  id: number
  userId: number
  productId: number
  product?: Product // Joined product data
}
