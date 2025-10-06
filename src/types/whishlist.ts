import { Product } from "./product";

export interface Wishlist {
  items: WishlistItem[]
  id: number
  userId: number
}

export interface WishlistItem {
  id: number
  useId: number
  productId: number
  product?: Product // Joined product data
}
