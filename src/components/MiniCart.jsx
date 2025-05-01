// src/components/MiniCart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const MiniCart = () => {
  const { cartItems, isMiniCartOpen, toggleMiniCart, calculateSubtotal, removeFromCart } = useCart();

  return (
    isMiniCartOpen && (
      <div className="absolute top-16 right-4 bg-white w-72 rounded-lg shadow-lg z-50">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">Cart</h3>
          <button onClick={toggleMiniCart} className="text-xl font-semibold text-gray-500">X</button>
        </div>
        <div className="p-4 max-h-80 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-sm font-semibold">${item.price * item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-lg">Remove</button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="p-4 border-t">
            <p className="text-lg font-semibold">Subtotal: ${calculateSubtotal().toFixed(2)}</p>
            <div className="flex justify-between items-center mt-4">
              <Link to="/cart" onClick={toggleMiniCart} className="w-full text-center py-2 px-4 bg-black text-white rounded-md">View Cart</Link>
              <button disabled={cartItems.length === 0} className={`w-full py-2 mt-2 rounded-md text-white ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500'}`}>Checkout</button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default MiniCart;
