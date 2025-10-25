'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useCartStore } from '@/stores/cart-store'

export function CartInitializer() {
  const { data: session, status } = useSession()
  const { setUserId, loadCart, setError } = useCartStore()

  useEffect(() => {
    if (status === 'loading') {
      // Still loading, do nothing
      return
    }

    if (status === 'authenticated' && session?.user?.id) {
      // User is logged in, set user ID and load their cart
      setUserId(session.user.id)
      loadCart(session.user.id)
    } else {
      // User is not logged in, clear cart and user ID
      setUserId(null)
    }
  }, [session, status, setUserId, loadCart])

  // This component doesn't render anything
  return null
}
