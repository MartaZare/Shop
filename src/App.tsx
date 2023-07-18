import "./style/App.scss";
import { useState } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";

import { Route, Routes, Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "./components/ShoppingCart";
import SuccessfullPurchase from "./components/SuccessfullPurchase";
import { Product } from "./other/Types";
import UserPage from "./pages/UserPage";
import AddUserForm from "./components/AddUser";
import AddProduct from "./components/AddProduct";

function App() {
  const [checkoutSuccessful, setCheckoutSuccessfull] = useState(false);
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);
  const [currentUser, setCurrentUser] = useState("");
  const [showLogIn, setShowLogIn] = useState(true);

  return (
    <>
      {showLogIn && (
        <AddUserForm
          setShowLogIn={setShowLogIn}
          setCurrentUser={setCurrentUser}
        />
      )}
      {!showLogIn && (
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
              <li className="nav-item">
                <NavLink to="/user" className="nav-link">
                  My page
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
              path="/user"
              element={<UserPage currentUser={currentUser} />}
            />
            <Route
              path="/user/new-product"
              element={<AddProduct currentUser={currentUser} />}
            />

            <Route
              path="*"
              element={
                <div className="page-align">
                  <div className="page">
                    <h1>ERROR 404</h1>
                    <p>
                      In the midst of the digital realm, it appears you have
                      lost your way. Fear not, for there is always a path to be
                      found. Simply click the button below to return to the main
                      page and continue your noble journey.
                    </p>
                    <img
                      src={"images/adventurer.png"}
                      alt="product_service_image"
                    />
                    <Link to="/" className="error-link">
                      Home page
                    </Link>
                  </div>
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
      )}
    </>
  );
}
export default App;
