'use server'

import { db } from "@/db/db"
import { categories, products } from "@/db/schema"
import { eq, count } from "drizzle-orm"

export async function GetCategories() {
  try {
    const allCategories = await db.select().from(categories)
    return allCategories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export async function GetProductsCount(categoryId: number | null = null) {
  try {
    if (categoryId !== null) {
      const result = await db
        .select({ count: count() })
        .from(products)
        .where(eq(products.categoryId, categoryId))
      return result[0]?.count ?? 0
    } else {
      const result = await db
        .select({ count: count() })
        .from(products)
      return result[0]?.count ?? 0
    }
  } catch (error) {
    console.error('Error fetching products count:', error)
    throw error
  }
}

export async function GetProducts(
  page: number = 1,
  limit: number = 2,
  categoryId: number | null = null
) {
  try {
    const offset = (page - 1) * limit
    
    let allProducts
    if (categoryId !== null) {
      allProducts = await db
        .select()
        .from(products)
        .where(eq(products.categoryId, categoryId))
        .limit(limit)
        .offset(offset)
    } else {
      allProducts = await db
        .select()
        .from(products)
        .limit(limit)
        .offset(offset)
    }
    
    const totalCount = await GetProductsCount(categoryId)
    const totalPages = Math.ceil(totalCount / limit)
    
    return {
      products: allProducts,
      totalCount,
      totalPages
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
