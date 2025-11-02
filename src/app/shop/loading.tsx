import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkeletonProductCard } from "@/components/product/product-card";
import { GetCategories } from "@/app/actions/actions";

export default async function ShopLoading() {
  const categories = await GetCategories();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shop</h1>
      <Card>
        <CardHeader className="overflow-x-scroll">
          <div className="flex space-x-4 py-4">
            <Button variant="outline" disabled>All</Button>
            {categories.map((category) => (
              <Button key={category.id} variant="outline" disabled>
                {category.name}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
