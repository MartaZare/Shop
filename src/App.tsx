import "./style/App.scss";
import { useState } from "react";
import Home from "./components/Home";
import Products from "./components/Products";

import { Route, Routes, Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "./components/ShoppingCart";
import SuccessfullPurchase from "./components/SuccessfullPurchase";
import { Product } from "./other/Types";

function App() {
  const [checkoutSuccessful, setCheckoutSuccessfull] = useState(false);
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);

  return (
    <>
      <nav className="main-navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products" className="nav-link">
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <Products
              productsInCart={productsInCart}
              setProductsInCart={setProductsInCart}
              checkoutSuccessful={checkoutSuccessful}
            />
          }
        />
        <Route
          path="*"
          element={
            <div>
              <h1>ERROR 404. Page not found</h1>
              <Link to="/">Back to home page.</Link>
            </div>
          }
        />
      </Routes>

      <ShoppingCart
        checkoutSuccessful={checkoutSuccessful}
        setCheckoutSuccessfull={setCheckoutSuccessfull}
        productsInCart={productsInCart}
        setProductsInCart={setProductsInCart}
      />
      <SuccessfullPurchase checkoutSuccessful={checkoutSuccessful} />
    </>
  );
}
export default App;
