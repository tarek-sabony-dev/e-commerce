"use client"

import ProductCard from "@/components/product-card";
import { selectCategories } from "@/lib/features/categories/categories-slice";
import { selectProducts } from "@/lib/features/products/products-slice";
import { useAppSelector } from "@/lib/hooks";
import { Category } from "@/types/category";
import { Product } from "@/types/product";

export default function ShopGrid() {
  const products: Product[] = useAppSelector(selectProducts)
  const categories : Category[] = useAppSelector(selectCategories)
  console.log(categories)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
