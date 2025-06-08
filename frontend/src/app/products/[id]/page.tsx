'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/types/product';
import { API_ROUTES } from '@/types/apis';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';

interface ProductPageProps {
  params: {
    id: string;
  };
}

interface ProductResponse {
  status: string;
  data: {
    product: Product;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to view product details');
          router.push('/login');
          return;
        }

        const response = await fetch(`${API_ROUTES.API_BASE_URL}/product/info/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch product');
        }

        const data: ProductResponse = await response.json();
        setProduct(data.data.product);
      } catch (error: any) {
        console.error('Error fetching product:', error);
        setError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, router]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      router.push('/login');
      return;
    }

    try {
      toast.success('Added to cart successfully');
      router.push('/cart');
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600">{error || 'Product not found'}</p>
          <button
            onClick={() => router.push('/products')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-[500px] w-full bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>
          </div>

          <div className="text-3xl font-bold text-indigo-600">
            ${product.price.toFixed(2)}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Availability:</span>
              <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border rounded"
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {product.stock} items available
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full md:w-auto px-8 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>

          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={() => router.push('/products')}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 