import { create } from 'zustand'
import { Cart, CartItem } from '@/types/cart'
import { Product } from '@/types/product'

interface CartStore extends Cart {
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  calculateTotals: () => void
}

export const useCartStore = create<CartStore>()((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  addItem: (product: Product, quantity = 1) => {
    const { items } = get()
    const existingItem = items.find(item => item.productId === product.id)
    
    if (existingItem) {
      set(state => ({
        items: state.items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }))
    } else {
      const newItem: CartItem = {
        id: Date.now(), // Simple ID generation
        userId: 1, // You might want to get this from auth context
        productId: product.id,
        quantity,
        product
      }
      set(state => ({
        items: [...state.items, newItem]
      }))
    }        
    // Recalculate totals
    get().calculateTotals()
  },

  removeItem: (productId: number) => {
    set(state => ({
      items: state.items.filter(item => item.productId !== productId)
    }))
    // Recalculate totals
    get().calculateTotals()
  },

  updateQuantity: (productId: number, quantity: number) => {
    if (quantity <= 0) {
      get().updateQuantity(productId, 1)
      return
    }
    
    set(state => ({
      items: state.items.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    }))
    // Recalculate totals
    get().calculateTotals()
  },

  clearCart: () => {
    set({ items: [], totalItems: 0, totalPrice: 0 })
  },

  calculateTotals: () => {
    const { items } = get()
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => {
      const priceCents = item.product?.discountedPrice ?? item.product?.price ?? 0
      return sum + (priceCents * item.quantity)
    }, 0)
    
    set({ totalItems, totalPrice })
  }
}))
