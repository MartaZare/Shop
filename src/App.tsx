import "./style/App.scss";
import { useState } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "./components/ShoppingCart";
import SuccessfullPurchase from "./components/SuccessfullPurchaseProps";
import UserPage from "./pages/UserPage";
import AddUser from "./components/AddUser";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

function App() {
  const [showLogIn, setShowLogIn] = useState(true);

  return (
    <>
      {showLogIn && <AddUser setShowLogIn={setShowLogIn} />}
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
            <Route path="/products" element={<Products />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/new-product" element={<AddProduct />} />
            <Route path="/user/edit-product" element={<EditProduct />} />

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
          <ShoppingCart />
          <SuccessfullPurchase />
        </>
      )}
    </>
  );
}
export default App;
