import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkeletonProductCard } from "@/components/product/product-card";
import { IconFilter2, IconSearch } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default async function ShopLoading() {
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shop</h1>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center gap-6 flex-wrap">
            <div className="flex gap-2">
              <Input placeholder="Search products" />
              <Button variant={"secondary"}>
                <IconSearch />
                <span className="hidden lg:block">Search</span>
              </Button>
            </div>
            <Button variant={"secondary"}>
              <IconFilter2 />
              filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="mb-8" />
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
