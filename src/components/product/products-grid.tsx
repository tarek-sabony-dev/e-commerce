'use client'

import { GetProducts } from "@/app/actions/actions"
import { ProductCard, SkeletonProductCard } from "./product-card"
import { useEffect, useState } from "react"
import { Product } from "@/types/product"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { IconAlertCircle, IconReload } from "@tabler/icons-react"
import { Button } from "../ui/button"
import { LoadingState } from "@/types/general-types"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Separator } from "../ui/separator"
import { Category } from "@/types/category"
import { useSearchParams, useRouter } from "next/navigation"

interface ProductGridProps {
  categories: Category[]
}

export default function ProductGrid({ categories }: ProductGridProps){
  const searchParams = useSearchParams()
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)

  const [state, setState] = useState<LoadingState>('idle')
  const [error, setError] = useState<string | null>(null)

  const currentPage = parseInt(searchParams.get('page') || '1') // Read page from URL, default to 1, validate range
  const categoryId = searchParams.get('category') ? parseInt(searchParams.get('category')!) : null // Read category from URL or null if no category is selected

  useEffect(() => {
    const fetchProducts = async () => {
      setState('loading')
      setError(null)
      
      try {
        const result = await GetProducts(currentPage, 1, categoryId)
        setProducts(result.products)
        setTotalPages(result.totalPages)
        setTotalCount(result.totalCount)
        setState('success')
      } catch (error) {
        console.error('Error fetching products:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch products')
        setState('failed')
      }
    }

    fetchProducts()
  }, [currentPage, categoryId])

  const handleCategoryChange = (selectedCategoryId: number | null) => {
    // Prevent re-selecting the already selected category
    if (selectedCategoryId === categoryId) {
      return
    }
    
    const params = new URLSearchParams(searchParams.toString())
    
    // Remove page param to reset to page 1 when category changes
    params.delete('page')
    
    if (selectedCategoryId === null) {
      // Remove category param if "All" is selected
      params.delete('category')
    } else {
      // Set category param
      params.set('category', selectedCategoryId.toString())
    }
    
    router.push(`/shop?${params.toString()}`)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (newPage === 1) {
      params.delete('page')
    } else {
      params.set('page', newPage.toString())
    }
    router.push(`/shop?${params.toString()}`)
  }

  if (state === 'loading') {
    return (
      <Card>
        <CardHeader className="overflow-x-scroll">
          <div className="flex space-x-4 py-4 ">
            <Button
              key="all"
              variant={categoryId === null ? "default" : "outline"}
              disabled
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={categoryId === category.id ? "default" : "outline"}
                disabled
              >
                {category.name}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
          </div>
        </CardContent>
      </Card>
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
    <Card>
      <CardHeader className="overflow-x-scroll">
        <div className="flex space-x-4 py-4 ">
          <Button
            key="all"
            variant={categoryId === null ? "default" : "outline"}
            onClick={() => handleCategoryChange(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={categoryId === category.id ? "default" : "outline"}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <div>
          {totalCount} products found
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="mb-8" />
        {products.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">No products found.</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
