import { unstable_cache } from "next/cache";
import { GetCategories } from "./actions/actions";

interface ShopPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
}

const getCachedUser = unstable_cache(
  async () => {
    const categories = await GetCategories();
    return categories;
  },
  [],
  {
    tags: ["categories"],
    revalidate: 60,
  }
)

export default async function CategoriesPage() {
  // const categories = await GetCategories();

  const categories = await getCachedUser();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.id}>{category.name}</div>
        ))}
      </div>
    </div>
  )
}
