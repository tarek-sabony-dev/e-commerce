'use client'

import { useCartStore } from "@/stores/cart-store"
import { useSession } from "next-auth/react"
import { CartItemCard, SkeletonCartItemCard } from "./cart-item-card"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { IconAlertCircle, IconReload } from "@tabler/icons-react"
import { Button } from "./ui/button"
import Link from "next/link"

export default function CartGrid() {
  const { items, error, isLoading } = useCartStore()
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated' && session?.user

  if (status === "loading" || isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCartItemCard key={index} />
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

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <p className="text-center text-muted-foreground mb-4">
              You need to be logged in to use the shopping cart.
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
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 px-4 overflow-scroll">
            {items.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )
      }
    </div>
  )
}
