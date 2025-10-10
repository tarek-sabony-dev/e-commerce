'use server'

import { db } from "@/db/db"
import { cartItems, categories, products, users, wishlist } from "@/db/schema"

export async function GetCategories() {
  const allCategories = await db.select().from(categories)
  return allCategories
}

export async function GetProducts() {
  const allProducts = await db.select().from(products)
  return allProducts
}