import ProductGrid from "@/components/product/products-grid";
import { GetCategories, GetProducts } from "@/app/actions/actions";

interface ShopPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const categories = await GetCategories();
  const currentPage = parseInt(params.page || '1');
  const categoryId = params.category ? parseInt(params.category) : null;
  const limit = 12;
  
  const productsData = await GetProducts(currentPage, limit, categoryId);
 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shop</h1>
      <ProductGrid 
        categories={categories}
        initialProducts={productsData.products}
        initialTotalPages={productsData.totalPages}
        initialTotalCount={productsData.totalCount}
        currentPage={currentPage}
        categoryId={categoryId}
      />
    </div>
  )
}
