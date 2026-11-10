import Link from 'next/link';
import React from 'react';
import { IProduct } from '@/types';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link href={`/product/${product._id}`} className="block">
        <div className="flex h-64 items-center justify-center bg-gray-50 p-4">
          <img
            src={product.image || '/images/product-placeholder.svg'}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = '/images/product-placeholder.svg';
            }}
          />
        </div>
      </Link>

      <div className="p-4">
        <Link
          href={`/product/${product._id}`}
          className="block truncate text-lg font-semibold text-gray-800 hover:text-blue-600"
        >
          {product.name}
        </Link>
        <div className="my-2 text-sm text-gray-500">
          {product.numReviews} reviews
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </h3>
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
}
