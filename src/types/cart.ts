import { Product } from "./product";

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  userId: string | null
}

export interface CartItem {
  id: number
  userId: string | null
  productId: number
  quantity: number
  product?: Product // Joined product data
}
