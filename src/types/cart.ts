import { Product } from "./product";

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export interface CartItem {
  id: number
  userId: number
  productId: number
  quantity: number
  product?: Product // Joined product data
}
