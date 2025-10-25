'use server'

import { db } from "@/db/db"
import { categories, products } from "@/db/schema"

export async function GetCategories() {
  try {
    const allCategories = await db.select().from(categories)
    return allCategories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export async function GetProducts() {
  try {
    const allProducts = await db.select().from(products)
    return allProducts
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
