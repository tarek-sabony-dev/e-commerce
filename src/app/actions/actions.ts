'use server'

import { db } from "@/db/db"
import { categories, products, cartItems } from "@/db/schema"
import { eq, and } from "drizzle-orm"

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

export async function getUserCartItems(userId: string) {
  try {
    const result = await db.select({
        id: cartItems.id,
        userId: cartItems.userId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        createdAt: cartItems.createdAt,
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
      .from(cartItems)
      .leftJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId))
    
    return result
  } catch (error) {
    console.error('Error fetching user cart items:', error)
    throw error
  }
}

export async function addCartItem(userId: string, productId: number, quantity: number) {
  try {
    await db.insert(cartItems).values({
      userId,
      productId,
      quantity
    })
    
    return { success: true }
  } catch (error) {
    console.error('Error adding cart item:', error)
    throw error
  }
}

export async function removeCartItem(userId: string, productId: number) {
  try {
    await db
      .delete(cartItems)
      .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)))
    
    return { success: true }
  } catch (error) {
    console.error('Error removing cart item:', error)
    throw error
  }
}

export async function updateCartItemQuantity(userId: string, productId: number, quantity: number) {
  try {
    await db
      .update(cartItems)
      .set({ quantity })
      .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)))
    
    return { success: true }
  } catch (error) {
    console.error('Error updating cart item quantity:', error)
    throw error
  }
}

export async function clearUserCart(userId: string) {
  try {
    await db
      .delete(cartItems)
      .where(eq(cartItems.userId, userId))
    
    return { success: true }
  } catch (error) {
    console.error('Error clearing user cart:', error)
    throw error
  }
}