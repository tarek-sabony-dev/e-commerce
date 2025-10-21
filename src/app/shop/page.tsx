import ProductGrid from "@/components/products-grid";

export default async function ShopPage() {
 
  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold text-center mb-8">Shop</h1>
      <ProductGrid />
    </div>
  )
}
