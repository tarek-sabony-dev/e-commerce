import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WishlistGrid from "@/components/wishlist/wishlist-grid";

export default function WishlistPage() {

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-4 py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl">Wishlist</CardTitle>
        </CardHeader>
        <CardContent>
          <WishlistGrid />
        </CardContent>
      </Card>
    </div>
  )
}
