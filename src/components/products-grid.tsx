"use client"

import ProductCard from "@/components/product-card";
import { Category } from "@/types/category";
import { Product } from "@/types/product";

export default function ShopGrid() {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))} */}
    </div>
  )
}
