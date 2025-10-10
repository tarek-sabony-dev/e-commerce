export interface ImageObject {
  key: string
  url: string
}

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
