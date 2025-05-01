import { Link } from "react-router-dom";
import { headerLogo } from "../assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash, faPlus, faMinus, faBars } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const Nav = () => {
  const { cartItems, addToCart, removeFromCart, deleteFromCart } = useCart();
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <header className="padding-x py-4 absolute z-10 w-full bg-white shadow-md">
      <nav className="flex justify-between items-center max-container">
        <Link to="/">
          <img src={headerLogo} alt="logo" width={129} height={29} />
        </Link>

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="lg:hidden text-2xl text-gray-800"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <ul className="flex-1 flex justify-center items-center gap-16 hidden lg:flex">
          <Link to="/"><li>Home</li></Link>
          <Link to="/products"><li>Products</li></Link>
        </ul>

        <div className="relative flex items-center gap-4 text-lg font-medium font-montserrat max-lg:hidden">
          <Link to="/signin">Sign in</Link>
          <span>/</span>
          <Link to="/explore">Explore now</Link>
          <button onClick={() => setShowMiniCart(!showMiniCart)} className="ml-4 relative">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartQuantity}
              </span>
            )}
          </button>
        </div>

        <div className="relative lg:hidden">
          <button onClick={() => setShowMiniCart(!showMiniCart)} className="ml-4 relative">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartQuantity}
              </span>
            )}
          </button>
        </div>
      </nav>

      {showMenu && (
        <div className="lg:hidden flex flex-col items-center mt-4 space-y-4">
          <Link to="/" className="text-lg">Home</Link>
          <Link to="/products" className="text-lg">Products</Link>
          <div className="flex items-center gap-2 text-lg">
            <Link to="/signin">Sign in</Link>
            <span>/</span>
            <Link to="/explore">Explore now</Link>
          </div>
        </div>
      )}

      {showMiniCart && (
        <div className="absolute right-0 top-12 w-96 bg-white shadow-xl rounded-lg p-4 z-50">
          <h3 className="text-xl font-semibold mb-4">Shopping Cart</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-3">
                  <img src={item.image} alt={item.title} className="w-14 h-14 rounded" />
                  <div className="flex-1 px-3">
                    <h4 className="text-sm font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <>
              <div className="mt-4 flex justify-between text-sm font-semibold">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="mt-4 flex justify-between">
                <Link
                  to="/cart"
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                  View Cart
                </Link>
                <button
                  disabled
                  className="px-4 py-2 bg-blue-500 text-white rounded opacity-50 cursor-not-allowed"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Nav;
