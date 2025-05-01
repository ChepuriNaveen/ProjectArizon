import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-lg font-medium">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500 font-medium">{error}</p>;
  }

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center mt-11">Product Listing</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
