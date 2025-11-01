import { ImageObject } from "./general-types"

export interface Category {
  id: number
  name: string
  imageUrl: ImageObject
  createdAt: Date
  updatedAt: Date
}