'use server'

import { db } from "@/db/db"
import { products, cartItems } from "@/db/schema"
import { authOptions } from "@/lib/auth"
import { and, eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

export async function getUserCartItems(userId: string) {
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
      .where(eq(cartItems.userId, session.user.id))
    
    return result
  } catch (error) {
    console.error('Error fetching user cart items:', error)
    throw error
  }
}

export async function addCartItem(userId: string, productId: number, quantity: number) {
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
    await db.insert(cartItems).values({
      userId: session.user.id,
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
      .delete(cartItems)
      .where(and(eq(cartItems.userId, session.user.id), eq(cartItems.productId, productId)))
    
    return { success: true }
  } catch (error) {
    console.error('Error removing cart item:', error)
    throw error
  }
}

export async function updateCartItemQuantity(userId: string, productId: number, quantity: number) {
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
    .update(cartItems)
    .set({ quantity })
    .where(and(eq(cartItems.userId, session.user.id), eq(cartItems.productId, productId)))
    
    return { success: true }
  } catch (error) {
    console.error('Error updating cart item quantity:', error)
    throw error
  }
}

export async function clearUserCart(userId: string) {
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
    .delete(cartItems)
    .where(eq(cartItems.userId, session.user.id))
    
    return { success: true }
  } catch (error) {
    console.error('Error clearing user cart:', error)
    throw error
  }
}