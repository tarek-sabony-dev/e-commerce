import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './features/categories/categories-slice'
import productsReducer from './features/products/products-slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      categories: categoriesReducer,
      products: productsReducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']