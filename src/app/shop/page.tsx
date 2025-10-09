import ShopGrid from "@/components/products-grid";
import { Product } from "@/types/product";

const products : Product[] = [
  {
    id: 1,
    name: "Product 1",
    description: "Product 1 description",
    price: 10,
    discountedPrice: 9,
    images: "/red-headphones.png",
    categoryId: 1,
    stoke: 100,
    rating: 4.5,
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Product 2 description",
    price: 100,
    discountedPrice: 90,
    images: "/white-headphones.png",
    categoryId: 1,
    stoke: 100,
    rating: 4.5,
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
]


export default function Shop() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shop</h1>
      <ShopGrid products={products} />
    </div>
  )
}
