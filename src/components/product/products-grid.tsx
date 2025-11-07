'use client'

import { ProductCard } from "./product-card"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Separator } from "../ui/separator"
import { Category } from "@/types/category"
import { Product } from "@/types/product"
import { useSearchParams, useRouter } from "next/navigation"
import { Slider } from "../ui/slider"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { IconFilter2 } from "@tabler/icons-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { formatCents } from "@/lib/utils"

interface ProductGridProps {
  categories: Category[]
  products: Product[]
  totalPages: number
  totalCount: number
  currentPage: number
  categoryId: number | null
  minPrice: number | null
  maxPrice: number | null 
}

export default function ProductGrid({ categories, products, totalPages, totalCount, currentPage, categoryId, minPrice, maxPrice }: ProductGridProps){
  const [priceRange, setPriceRange] = useState([minPrice || 0, maxPrice || 1000])
  const searchParams = useSearchParams()
  const router = useRouter()
  const isMobile = useIsMobile()

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

  const handlePriceChange = (price: number[]) => {
    const params = new URLSearchParams(searchParams.toString())

    if (price[0] === 0) {
      params.delete('min')
    }  else {
      params.set('min', price[0].toString())
    }

    if (price[1] === 1000) {
      params.delete('max')
    } else {
      params.set('max', price[1].toString())
    }

    router.push(`/shop?${params.toString()}`)

  }

  return(
    <Card>
      <CardHeader className="flex justify-between items-center gap-6 flex-wrap">
        {!isMobile ?
          <>
            <div className="flex space-x-4 py-4 overflow-x-scroll ">
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
            <div className="w-1/4 min-w-3xs flex flex-col gap-2 relative">
              <Slider value={priceRange} onValueChange={setPriceRange} onPointerUp={() => handlePriceChange(priceRange)} min={0} max={1000} step={1} className="w-full" onDragLeave={() => console.log("up")} />
              <span className="absolute top-4 left-0">
                {formatCents(priceRange[0])}
              </span>
              <span className="absolute top-4 right-0">
                {formatCents(priceRange[1])}
              </span>
            </div>
          </>
          :
          <>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="justify-self-end" variant={"secondary"}>
                  <IconFilter2 />
                  filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                  <SheetDescription>
                    Add filters for an easier shopping experience.
                  </SheetDescription>
                  <Separator className="mt-4" />
                </SheetHeader>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2 px-4 relative">
                    <span>Price</span>
                    <Slider value={priceRange} onValueChange={setPriceRange} onPointerUp={() => handlePriceChange(priceRange)} min={0} max={1000} step={1} className="w-full"/>
                    <span className="absolute top-12 left-4">
                      ${priceRange[0]}
                    </span>
                    <span className="absolute top-12 right-4">
                      ${priceRange[1]}
                    </span>
                    <Separator className="mt-12" />
                  </div>
                  <div>
                    <div className="flex flex-col justify-start items-start gap-2 px-4 overflow-y-scroll ">
                      <span>Category</span>
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
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </>
        }
      </CardHeader>
      <CardContent>
        <Separator className="mb-8 md:mt-8" />
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
