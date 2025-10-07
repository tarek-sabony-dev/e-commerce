import { createSlice, createSelector } from '@reduxjs/toolkit'
import { Product } from '@/types/product'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'

const initialState : Product[] = [
  {
    id: 1,
    name: "kza",
    description: "mza",
    images: "/white-headphones.png",
    categoryId: 1,
    price: 5,
    discountedPrice: 4.9,
    stoke: 150,
    rating: 4.5,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
  {
    id: 2,
    name: "kza",
    description: "mza",
    images: "/red-headphones.png",
    categoryId: 1,
    price: 5,
    discountedPrice: 4.9,
    stoke: 150,
    rating: 4.5,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
  {
    id: 3,
    name: "kza",
    description: "mza",
    images: "/gloves.png",
    categoryId: 1,
    price: 5,
    discountedPrice: 4.9,
    stoke: 150,
    rating: 4.5,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  }
]

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    
  }
})

// Action creators are generated for each case reducer function
export const {  } = productsSlice.actions

export default productsSlice.reducer

// Selectors
export const selectProducts = (state: RootState) => state.products
