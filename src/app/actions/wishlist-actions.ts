'use server'

import { db } from "@/db/db"
import { products, wishlist } from "@/db/schema"
import { authOptions } from "@/lib/auth"
import { and, eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

export async function getUserWishlistItems(userId: string) {
  const session = await getServerSession(authOptions)

  // reject if no valid session
  if (!session?.user.id) {
    console.error('expired user sesstion')
    throw new Error('Unauthorized')
  }

  // reject mismatched userId to prevent tampering
  if (userId !== session.user.id) {
    console.error('User id mismatch between session and provided userId')
    throw new Error('Unauthorized')
  }

  try {
    const result = await db.select({
      id: wishlist.id,
      userId: wishlist.userId,
      productId: wishlist.productId,
      createdAt: wishlist.createdAt,
      product: {
        id: products.id,
        name: products.name,
        description: products.description,
        price: products.price,
        discountedPrice: products.discountedPrice,
        imageUrls: products.imageUrls,
        categoryId: products.categoryId,
        stock: products.stock,
        rating: products.rating,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
      }
    })
    .from(wishlist)
    .leftJoin(products, eq(wishlist.productId, products.id))
    .where(eq(wishlist.userId, session.user.id))
    
    return result
  } catch (error) {
    console.error('Error fetching wishlist items:', error)
    throw error
  }
}

export async function addWishlistItem(userId: string, productId: number) {
  const session = await getServerSession(authOptions)
  
  // reject if no valid session
  if (!session?.user.id) {
    console.error('expired user sesstion')
    throw new Error('Unauthorized')
  }

  // reject mismatched userId to prevent tampering
  if (userId !== session.user.id) {
    console.error('User id mismatch between session and provided userId')
    throw new Error('Unauthorized')
  }

  try {
    await db.insert(wishlist).values({
      userId: session.user.id,
      productId
    })
    return { success: true }
  } catch (error) {
    console.error('Error adding wishlist item:', error)
    throw error
  }
}

export async function removeWishlistItem(userId: string, productId: number) {
  const session = await getServerSession(authOptions)
  
  // reject if no valid session
  if (!session?.user.id) {
    console.error('expired user sesstion')
    throw new Error('Unauthorized')
  }

  // reject mismatched userId to prevent tampering
  if (userId !== session.user.id) {
    console.error('User id mismatch between session and provided userId')
    throw new Error('Unauthorized')
  }

  try {
    await db
      .delete(wishlist)
      .where(and(eq(wishlist.userId, session.user.id), eq(wishlist.productId, productId)
      ))
    return { success: true }
  } catch (error) {
    console.error('Error removing wishlist item:', error)
    throw error
  }
}

export async function clearUserWishlist(userId: string) {
  const session = await getServerSession(authOptions)
  
  // reject if no valid session
  if (!session?.user.id) {
    console.error('expired user sesstion')
    throw new Error('Unauthorized')
  }

  // reject mismatched userId to prevent tampering
  if (userId !== session.user.id) {
    console.error('User id mismatch between session and provided userId')
    throw new Error('Unauthorized')
  }

  try {
    await db
      .delete(wishlist)
      .where(eq(wishlist.userId, session.user.id))
    return { success: true }
  } catch (error) {
    console.error('Error clearing wishlist:', error)
    throw error
  }
}