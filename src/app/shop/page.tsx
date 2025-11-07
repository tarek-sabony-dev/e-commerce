import ProductGrid from "@/components/product/products-grid";
import { GetCategories, GetProducts } from "@/app/actions/actions";

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { page, category, min, max } = await searchParams
  
  const currentPage = page ? Number(page ?? '1') : 1
  const categoryId = category ? Number(category) : null
  const minPrice = min ? Number(min ?? '0') : 0
  const maxPrice = max ? Number(max ?? '0') : 0
  const limit = 12

  const [categories, productsData] = await Promise.all([
    GetCategories(),
    GetProducts(currentPage, limit, categoryId, minPrice, maxPrice)
  ])

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold text-center mb-8">Shop</h1>
      <ProductGrid 
        categories={categories}
        products={productsData.products}
        totalPages={productsData.totalPages}
        totalCount={productsData.totalCount}
        currentPage={currentPage}
        categoryId={categoryId}
        maxPrice={maxPrice}
        minPrice={minPrice}
      />
    </div>
  )
}
