'use client'

import { API_ROUTES } from '@/types/apis'
import { useState } from 'react'

interface AddToCartButtonProps {
  productId: string
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const addToCart = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_ROUTES.API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to add to cart')
      }

      // You might want to show a success message or update the cart count
    } catch (error) {
      console.error('Error adding to cart:', error)
      // Handle error (show error message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={addToCart}
      disabled={isLoading}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  )
} 