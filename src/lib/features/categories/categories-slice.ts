import { RootState } from "@/lib/store";
import { Category } from "@/types/category";
import { createSlice } from "@reduxjs/toolkit";

const initialState : Category[] = [
  {
    id: 1,
    name: "Sports",
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString()
  }
]

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    
  }
})

// Action creators are generated for each case reducer function
export const {  } = categoriesSlice.actions

export default categoriesSlice.reducer

// Selectors
export const selectCategories = (state: RootState) => state.categories
