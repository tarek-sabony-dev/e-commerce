import { Product } from "./product";

export interface WishlistItem {
  id: number
  userId: string | null
  productId: number
  product?: Product // Joined product data
}
