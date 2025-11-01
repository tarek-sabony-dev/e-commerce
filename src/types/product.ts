import { ImageObject } from "./general-types"

export interface Product {
  id: number
  name: string
  description: string
  price: number // cents
  discountedPrice: number | null // cents
  imageUrls: ImageObject[]
  categoryId: number
  stock: number
  rating: string
  createdAt: Date
  updatedAt: Date
}
