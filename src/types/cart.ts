import { Product } from "./product";

export interface CartItem {
  id: number
  userId: string | null
  productId: number
  quantity: number
  product?: Product // Joined product data
}
