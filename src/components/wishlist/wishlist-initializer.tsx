'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useWishlistStore } from '@/stores/wishlist-store'

export function WishlistInitializer() {
  const { data: session, status } = useSession()
  const { setUserId, loadWishlist, setError } = useWishlistStore()

  useEffect(() => {
    if (status === 'loading') {
      // Still loading, do nothing
      return
    }

    if (status === 'authenticated' && session?.user?.id) {
      // User is logged in, set user ID and load their cart
      setUserId(session.user.id)
      loadWishlist(session.user.id)
    } else {
      // User is not logged in, clear cart and user ID
      setUserId(null)
    }
  }, [session, status, setUserId, loadWishlist])

  // This component doesn't render anything
  return null
}
