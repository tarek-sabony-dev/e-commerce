import { addWishlistItem, getUserWishlistItems, removeWishlistItem } from "@/app/actions/wishlist-actions"
import { Product } from "@/types/product"
import { WishlistItem } from "@/types/whishlist"
import { create } from "zustand"

interface WishlistStore {
  // state
  wishlistItems: WishlistItem[]
  totalItems: number
  userId: string | null
  isLoading: boolean
  error: string | null

  // crud actions
  addWishlistItem: (product: Product) => void
  removeWishlistItem: (productId: number) => void
  clearWishlist: () => void

  // computing functions
  calculateTotals: () => void

  // data syncing actions
  loadWishlist: (userId: string) => Promise<void>
  setUserId: (userId: string | null) => void

  // loading and error states
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
}

export const useWishlistStore = create<WishlistStore>()((set, get) => ({
  // initial state
  wishlistItems: [],
  totalItems: 0,
  userId: null,
  isLoading: false,
  error: null,

  loadWishlist: async (userId: string) => {
    set({ isLoading: true, error: null })

    try {
      const items = await getUserWishlistItems(userId)
      const wishlistItems: WishlistItem[] = items.map(item => ({
        id: item.id,
        userId: item.userId,
        productId: item.productId,
        product: item.product || undefined
      }))

      set({ wishlistItems, isLoading: false })
      get().calculateTotals()
    } catch (error) {
      set({ 
        error: 'Failed to load cart items', 
        isLoading: false 
      })
      console.error('Error loading cart:', error)
    }
  },

  addWishlistItem: (product: Product) => {
    const { wishlistItems, userId } = get()
    const previousItems = [...wishlistItems]

    if (!userId) {
      set({ error: 'You must be logged in to add items to cart' })
      return
    }
    
    const newItem: WishlistItem = {
      id: Date.now(), // Temporary ID for optimistic update
      userId: userId,
      productId: product.id,
      product
    }
    set({ wishlistItems: [...wishlistItems, newItem] })

    // Recalculate totals
    get().calculateTotals()

    // Sync to database (optimistic update)
    addWishlistItem(userId, product.id).catch(error => {
      console.error('Error adding wishlist item:', error)
      // Revert state on failure
      set({ wishlistItems: previousItems })
      get().calculateTotals()
    })
  },
  
  removeWishlistItem: (productId: number) => {
    const { userId } = get()

    if (!userId) {
      set({ error: 'You must be logged in to remove items from cart' })
      return
    }

    const previousItems = [...get().wishlistItems]
    set(state => ({
      wishlistItems: state.wishlistItems.filter(item => item.productId !== productId)
    }))

    // Recalculate totals
    get().calculateTotals()

    // Sync to database (optimistic update)
    removeWishlistItem(userId, productId).catch(error => {
      console.error('Error removing wishlist item:', error)
      // Revert state on failure
      set({ wishlistItems: previousItems })
      get().calculateTotals()
    })
  },

  clearWishlist: () => {},

  calculateTotals: () => {
    const items = get().wishlistItems
    const totalItems = items.length

    set({ totalItems })
  },

  setUserId: (userId: string | null) => {
    set({ userId })
    if (!userId) {
      // Clear cart when user logs out
      set({ wishlistItems: [], totalItems: 0, error: null })
    }
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  setError: (error: string | null) => set({ error })
}))