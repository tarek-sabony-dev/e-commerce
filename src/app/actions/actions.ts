'use server'

import { db } from "@/db/db"
import { categoriesTable } from "@/db/schema"

export async function GetCategories() {
  const allCategories = await db.select().from(categoriesTable)
  return JSON.stringify(allCategories)
}