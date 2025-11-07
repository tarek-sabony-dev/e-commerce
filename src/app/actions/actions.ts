'use server'

import { db } from "@/db/db"
import { categories, products } from "@/db/schema"
import { eq, count, and, between, gte, lte } from "drizzle-orm"

export async function GetCategories() {
  try {
    const allCategories = await db.select().from(categories)
    return allCategories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export async function GetProductsCount(
  categoryId: number | null = null,
  minPrice: number = 0,
  maxPrice: number = 0
) {
  try {
    const conditions = []

    if (categoryId !== null) {
      conditions.push(eq(products.categoryId, categoryId))
    }

    if (minPrice > 0 && maxPrice > 0) {
      conditions.push(between(products.price, minPrice, maxPrice))
    } else if (minPrice > 0) {
      conditions.push(gte(products.price, minPrice))
    } else if (maxPrice > 0) {
      conditions.push(lte(products.price, maxPrice))
    }

    const query = db.select({ count: count() }).from(products)
    const result = conditions.length > 0
      ? await query.where(and(...conditions))
      : await query

    return result[0]?.count ?? 0
  } catch (error) {
    console.error('Error fetching products count:', error)
    throw error
  }
}

export async function GetProducts(
  page: number = 1,
  limit: number = 12,
  categoryId: number | null = null,
  minPrice: number = 0,
  maxPrice: number = 0
) {
  try {
    const offset = (page - 1) * limit
    const conditions = []

    if (categoryId !== null) {
      conditions.push(eq(products.categoryId, categoryId))
    }

    if (minPrice > 0 && maxPrice > 0) {
      conditions.push(between(products.price, minPrice, maxPrice))
    } else if (minPrice > 0) {
      conditions.push(gte(products.price, minPrice))
    } else if (maxPrice > 0) {
      conditions.push(lte(products.price, maxPrice))
    }

    const query = db
      .select()
      .from(products)
      .limit(limit)
      .offset(offset)

    const allProducts = conditions.length > 0
      ? await query.where(and(...conditions))
      : await query
    
    const totalCount = await GetProductsCount(categoryId, minPrice, maxPrice)
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
