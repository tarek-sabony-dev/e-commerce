import ProductGrid from "@/components/product/products-grid";
import { GetCategories } from "@/app/actions/actions";

export default async function ShopPage() {
  const categories = await GetCategories();
 
  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold text-center mb-8">Shop</h1>
      <ProductGrid categories={categories} />
    </div>
  )
}
