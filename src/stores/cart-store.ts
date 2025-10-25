import { create } from 'zustand'
import { CartItem } from '@/types/cart'
import { Product } from '@/types/product'
import { 
  getUserCartItems, 
  addCartItem, 
  removeCartItem, 
  updateCartItemQuantity, 
  clearUserCart 
} from '@/app/actions/actions'

interface CartStore {
  // state
  items: CartItem[]
  totalItems: number
  totalPrice: number
  userId: string | null
  isLoading: boolean
  error: string | null

  // crud actions
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void

  // computing functions
  calculateTotals: () => void

  // data syncing actions
  loadCart: (userId: string) => Promise<void>
  setUserId: (userId: string | null) => void

  // loading and error states
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
}

export const useCartStore = create<CartStore>()((set, get) => ({
  // initial state
  items: [],
  totalItems: 0,
  totalPrice: 0,
  userId: null,
  isLoading: false,
  error: null,

  loadCart: async (userId: string) => {
    set({ isLoading: true, error: null })
    
    try {
      const cartItems = await getUserCartItems(userId)
      const items: CartItem[] = cartItems.map(item => ({
        id: item.id,
        userId: item.userId,
        productId: item.productId,
        quantity: item.quantity,
        product: item.product || undefined
      }))

      set({ items, isLoading: false })
      get().calculateTotals()
    } catch (error) {
      set({ 
        error: 'Failed to load cart items', 
        isLoading: false 
      })
      console.error('Error loading cart:', error)
    }
  },

  addItem: (product: Product, quantity = 1) => {
    const { items, userId } = get()
    const previousItems = [...items]
    
    if (!userId) {
      set({ error: 'You must be logged in to add items to cart' })
      return
    }
    
    const newItem: CartItem = {
      id: Date.now(), // Temporary ID for optimistic update
      userId: userId,
      productId: product.id,
      quantity,
      product
    }
    set({ items: [...items, newItem] })
    
    // Recalculate totals
    get().calculateTotals()
    
    // Sync to database (optimistic update)
    addCartItem(userId, product.id, quantity).catch((error) => {
      console.error('Error syncing to database:', error)
      // Revert on error
      set({ items: previousItems })
      set({ error: 'Failed to add item to cart' })
      get().calculateTotals()
    })
  },

  removeItem: (productId: number) => {
    const { userId } = get()
    
    if (!userId) {
      set({ error: 'You must be logged in to remove items from cart' })
      return
    }

    const previousItems = [...get().items]
    set(state => ({
      items: state.items.filter(item => item.productId !== productId)
    }))
    
    // Recalculate totals
    get().calculateTotals()
    
    // Sync to database (optimistic update)
    removeCartItem(userId, productId).catch((error) => {
      console.error('Error syncing to database:', error)
      // Revert on error
      set({ items: previousItems })
      set({ error: 'Failed to remove item from cart' })
      get().calculateTotals()
    })
  },

  updateQuantity: (productId: number, quantity: number) => {
    const { userId } = get()
    
    if (!userId) {
      set({ error: 'You must be logged in to update cart items' })
      return
    }

    if (quantity <= 0) {
      get().updateQuantity(productId, 1)
      return
    }
    
    const previousItems = [...get().items]
    set(state => ({
      items: state.items.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    }))
    
    // Recalculate totals
    get().calculateTotals()
    
    // Sync to database (optimistic update)
    updateCartItemQuantity(userId, productId, quantity).catch((error) => {
      console.error('Error syncing to database:', error)
      // Revert on error
      set({ items: previousItems })
      set({ error: 'Failed to update item quantity' })
      get().calculateTotals()
    })
  },

  clearCart: () => {
    const { userId } = get()
    
    if (!userId) {
      set({ error: 'You must be logged in to clear cart' })
      return
    }

    const previousItems = [...get().items]
    set({ items: [], totalItems: 0, totalPrice: 0 })
    
    // Sync to database (optimistic update)
    clearUserCart(userId).catch((error) => {
      console.error('Error syncing to database:', error)
      // Revert on error
      set({ items: previousItems })
      set({ error: 'Failed to clear cart' })
      get().calculateTotals()
    })
  },

  calculateTotals: () => {
    const { items } = get()
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => {
      const priceCents = item.product?.discountedPrice ?? item.product?.price ?? 0
      return sum + (priceCents * item.quantity)
    }, 0)
    
    set({ totalItems, totalPrice })
  },

  setUserId: (userId: string | null) => {
    set({ userId })
    if (!userId) {
      // Clear cart when user logs out
      set({ items: [], totalItems: 0, totalPrice: 0, error: null })
    }
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  setError: (error: string | null) => set({ error })
}))
