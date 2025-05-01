import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart!"); // This will show a success notification
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain mb-4"
      />
      <h3 className="text-md font-semibold line-clamp-2 mb-2">{product.title}</h3>
      <p className="text-lg font-bold mb-3">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-black text-white w-full py-2 rounded hover:opacity-90"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
