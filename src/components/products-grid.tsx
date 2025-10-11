'use client'

import { GetProducts } from "@/app/actions/actions"
import { ProductCard, SkeletonProductCard } from "./product-card"
import { useEffect, useState } from "react"
import { Product } from "@/types/product"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { IconAlertCircle, IconReload } from "@tabler/icons-react"
import { Button } from "./ui/button"

type LoadingState = 'idle' | 'loading' | 'success' | 'failed'

export default function ProductGrid(){
  const [products, setProducts] = useState<Product[]>([])
  const [state, setState] = useState<LoadingState>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setState('loading')
      setError(null)
      
      try {
        const data = await GetProducts()
        setProducts(data)
        setState('success')
      } catch (error) {
        console.error('Error fetching products:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch products')
        setState('failed')
      }
    }

    fetchProducts()
  }, [])

  if (state === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonProductCard key={index} />
        ))}
      </div>
    )
  }

  if (state === 'failed') {
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

  if (state === 'idle') {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Initializing...</div>
      </div>
    )
  }

  return(
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
