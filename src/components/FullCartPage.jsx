import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const FullCartPage = () => {
  const { cartItems, removeFromCart, deleteFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <Link to="/products">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
            Shop Now
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="padding">
      <h2 className="text-2xl font-semibold">Your Shopping Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b py-4">
            <div className="flex items-center">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-gray-200 p-1 rounded-full"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-gray-200 p-1 rounded-full"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-semibold">${item.price * item.quantity}</span>
              <button
                onClick={() => deleteFromCart(item.id)}
                className="text-red-500 hover:text-red-700 mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-lg font-semibold">Subtotal: </div>
        <div className="text-lg font-semibold">
          ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default FullCartPage;
