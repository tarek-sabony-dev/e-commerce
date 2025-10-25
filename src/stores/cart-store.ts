import { create } from 'zustand'
import { CartItem } from '@/types/cart'
import { Product } from '@/types/product'
import { 
  getUserCartItems, 
  addCartItem, 
  removeCartItem, 
  updateCartItemQuantity, 
  clearUserCart 
} from '@/app/actions/cart-actions'

interface CartStore {
  // state
  cartItems: CartItem[]
  totalItems: number
  totalPrice: number
  userId: string | null
  isLoading: boolean
  error: string | null

  // crud actions
  addCartItem: (product: Product, quantity?: number) => void
  removeCartItem: (productId: number) => void
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
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  userId: null,
  isLoading: false,
  error: null,

  loadCart: async (userId: string) => {
    set({ isLoading: true, error: null })
    
    try {
      const items = await getUserCartItems(userId)
      const cartItems: CartItem[] = items.map(item => ({
        id: item.id,
        userId: item.userId,
        productId: item.productId,
        quantity: item.quantity,
        product: item.product || undefined
      }))

      set({ cartItems, isLoading: false })
      get().calculateTotals()
    } catch (error) {
      set({ 
        error: 'Failed to load cart items', 
        isLoading: false 
      })
      console.error('Error loading cart:', error)
    }
  },

  addCartItem: (product: Product, quantity = 1) => {
    const { cartItems, userId } = get()
    const previousItems = [...cartItems]
    
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
    set({ cartItems: [...cartItems, newItem] })
    
    // Recalculate totals
    get().calculateTotals()
    
    // Sync to database (optimistic update)
    addCartItem(userId, product.id, quantity).catch((error) => {
      console.error('Error syncing to database:', error)
      // Revert on error
      set({ cartItems: previousItems })
      set({ error: 'Failed to add item to cart' })
      get().calculateTotals()
    })
  },

  removeCartItem: (productId: number) => {
    const { userId } = get()
    
    if (!userId) {
      set({ error: 'You must be logged in to remove items from cart' })
      return
    }

    const previousItems = [...get().cartItems]
    set(state => ({
      cartItems: state.cartItems.filter(item => item.productId !== productId)
    }))
    
    // Recalculate totals
    get().calculateTotals()
    
    // Sync to database (optimistic update)
    removeCartItem(userId, productId).catch((error) => {
      console.error('Error syncing to database:', error)
      // Revert on error
      set({ cartItems: previousItems })
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
    
    const previousItems = [...get().cartItems]
    set(state => ({
      cartItems: state.cartItems.map(item =>
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
      set({ cartItems: previousItems })
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

    const previousItems = [...get().cartItems]
    set({ cartItems: [], totalItems: 0, totalPrice: 0 })
    
    // Sync to database (optimistic update)
    clearUserCart(userId).catch((error) => {
      console.error('Error syncing to database:', error)
      // Revert on error
      set({ cartItems: previousItems })
      set({ error: 'Failed to clear cart' })
      get().calculateTotals()
    })
  },

  calculateTotals: () => {
    const { cartItems } = get()
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cartItems.reduce((sum, item) => {
      const priceCents = item.product?.discountedPrice ?? item.product?.price ?? 0
      return sum + (priceCents * item.quantity)
    }, 0)
    
    set({ totalItems, totalPrice })
  },

  setUserId: (userId: string | null) => {
    set({ userId })
    if (!userId) {
      // Clear cart when user logs out
      set({ cartItems: [], totalItems: 0, totalPrice: 0, error: null })
    }
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  setError: (error: string | null) => set({ error })
}))
