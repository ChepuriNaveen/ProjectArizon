import { Route, Routes, useLocation } from "react-router-dom";
import { Nav } from "./components";
import {
  CustomerReviews,
  Footer,
  Hero,
  PopularProducts,
  Services,
  SpecialOffer,
  Subscribe,
  SuperQuality,
} from "./sections";
import MiniCart from "./components/MiniCart";
import { CartProvider } from "./context/CartContext";
import ProductListingPage from "./components/ProductListingPage";
import FullCartPage from "./components/FullCartPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation(); 

  return (
    <CartProvider>
      <main className='relative'>
        <Nav />
        
        {location.pathname !== "/cart" && <MiniCart />}
        
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className='xl:padding-l wide:padding-r padding-b'>
                  <Hero />
                </section>
                <section className='padding'>
                  <PopularProducts />
                </section>
                <section className='padding'>
                  <SuperQuality />
                </section>
                <section className='padding-x py-10'>
                  <Services />
                </section>
                <section className='padding'>
                  <SpecialOffer />
                </section>
                <section className='bg-pale-blue padding'>
                  <CustomerReviews />
                </section>
                <section className='padding-x sm:py-32 py-16 w-full'>
                  <Subscribe />
                </section>
              </>
            }
          />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/cart" element={<FullCartPage />} />
        </Routes>

        <section className='bg-black padding-x padding-t pb-8'>
          <Footer />
        </section>

        <ToastContainer position="bottom-right" autoClose={5000} />
      </main>
    </CartProvider>
  );
};

export default App;
