'use client'

import { ProductCard } from "./product-card"
import { Button } from "../ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"
import { Category } from "@/types/category"
import { Product } from "@/types/product"
import { useSearchParams, useRouter } from "next/navigation"
import { Slider } from "../ui/slider"
import { useState } from "react"
import { IconFilter2, IconSearch } from "@tabler/icons-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { formatCents } from "@/lib/utils"
import { Input } from "../ui/input"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError } from "../ui/field"

interface ProductGridProps {
  categories: Category[]
  products: Product[]
  totalPages: number
  totalCount: number
  currentPage: number
  categoryId: number | null
  minPrice: number | null
  maxPrice: number | null
  searchQuery: string
}

const formSchema = z.object({
  query: z.string().max(255, "Long search quey.")
})

export default function ProductGrid({ categories, products, totalPages, totalCount, currentPage, categoryId, minPrice, maxPrice, searchQuery }: ProductGridProps){
  const [priceRange, setPriceRange] = useState([minPrice || 0, maxPrice || 100000])
  const searchParams = useSearchParams()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: searchQuery
    },
  })

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

    if (price[1] === 100000) {
      params.delete('max')
    } else {
      params.set('max', price[1].toString())
    }

    router.push(`/shop?${params.toString()}`)
  }

  // for searching products
  function onSubmit(data: z.infer<typeof formSchema>) {
    const params = new URLSearchParams(searchParams.toString())
    const q = data.query

    if (!q || q.trim().length === 0) {
      params.delete('q')
    } else {
      params.set('q', q)
    }

    router.push(`/shop?${params.toString()}`)
  }

  return(
    <Card>
      <CardHeader className="flex justify-between items-center gap-6 flex-wrap">
        <div className="flex gap-2">
          <form id="search-query-form" onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <Controller
              name="query"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="search-query"
                    aria-invalid={fieldState.invalid}
                    placeholder="Search products"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  
                </Field>
              )}
            />
            <Button variant={"secondary"} type="submit" form="search-query-form">
              <IconSearch />
              <span className="hidden lg:block">Search</span>
            </Button>
          </form>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"secondary"}>
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
            </SheetHeader>
            <div className="flex flex-col gap-4 px-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <span>Price</span>
                  </CardTitle>
                  <CardDescription>
                    <span>Filter products to fit your price range.</span>
                  </CardDescription>
                  <CardAction>
                    <Button variant={"outline"} 
                      onClick={() => {
                        setPriceRange([0, 100000])
                        handlePriceChange([0, 100000])
                      }}>
                      Reset
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-8" />
                  <div className="flex flex-col gap-4">
                    <Slider value={priceRange} onValueChange={setPriceRange} onPointerUp={() => handlePriceChange(priceRange)} min={0} max={100000} step={1} className="w-full"/>
                    <div className="flex justify-between">
                      <span className="">
                        {formatCents(priceRange[0])}
                      </span>
                      <span className="">
                        {formatCents(priceRange[1])}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <span>Category</span>
                  </CardTitle>
                  <CardDescription>
                    <span>Filter products by category.</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-start items-start gap-2 flex-wrap ">
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
                </CardContent>
              </Card>
            </div>
          </SheetContent>
        </Sheet>          
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
