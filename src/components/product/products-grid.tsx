'use client'

import { ProductCard } from "./product-card"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Separator } from "../ui/separator"
import { Category } from "@/types/category"
import { Product } from "@/types/product"
import { useSearchParams, useRouter } from "next/navigation"

interface ProductGridProps {
  categories: Category[]
  initialProducts: Product[]
  initialTotalPages: number
  initialTotalCount: number
  currentPage: number
  categoryId: number | null
}

export default function ProductGrid({ 
  categories,
  initialProducts,
  initialTotalPages,
  initialTotalCount,
  currentPage,
  categoryId
}: ProductGridProps){
  const searchParams = useSearchParams()
  const router = useRouter()

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
          {initialTotalCount} products found
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="mb-8" />
        {initialProducts.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">No products found.</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {initialProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {initialTotalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {initialTotalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= initialTotalPages}
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
