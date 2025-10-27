'use client'

import { useWishlistStore } from "@/stores/wishlist-store"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { IconAlertCircle, IconReload } from "@tabler/icons-react"
import { SkeletonWishlistItemCard, WishlistItemCard } from "./wishlist-item-card"

export default function WishlistGrid() {
  const { wishlistItems, error, isLoading } = useWishlistStore()
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated' && session?.user

  if (status === "loading" || isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonWishlistItemCard key={index} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="flex flex-col justify-start items-center">
        <AlertTitle className="flex items-center justify-center gap-2">
          <IconAlertCircle />
          Connection failed.
        </AlertTitle>
        <AlertDescription>
          <p>Check your network connection and try again.</p>
        </AlertDescription>
        <Button onClick={() => window.location.reload()} variant={"secondary"}>
          <IconReload />
        </Button>
      </Alert>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <p className="text-center text-muted-foreground mb-4">
          You need to be logged in to use the wishlist.
        </p>
        <div className="flex gap-2">
          <Link href="/auth/signin">
            <Button>Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {wishlistItems.map((item) => (
        <WishlistItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}