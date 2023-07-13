import "./style/App.scss";
import { useState } from "react";
import Home from "./components/Home";
import Products from "./components/Products";
import Services from "./components/Services";

import { Route, Routes, Link, NavLink } from "react-router-dom";
import ServiceData from "./components/ServiceData";
import { ShoppingCart } from "./components/ShoppingCart";
import SuccessfullPurchase from "./components/SuccessfullPurchase";

function App() {
  const [checkoutSuccessful, setCheckoutSuccessfull] = useState(false);
  const [serviceCount, setServiceCount] = useState<number[]>(() => {
    const defaultServiceArray: number[] = [];
    for (let i = 0; i < ServiceData().length; i++) {
      defaultServiceArray.push(0);
    }
    return defaultServiceArray;
  });

  const [productsCount, setProductsCount] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  console.log("IN APPPPP _----------------------");
  console.log(productsCount);
  // const [productsCount, setProductsCount] = useState<number[]>(() => {
  //   const defaultProductArray: number[] = [];
  //   for (let i = 0; i < ProductsData().length; i++) {
  //     defaultProductArray.push(0);
  //   }
  //   console.log("DEFAULT ARRAY");
  //   console.log(defaultProductArray);
  //   return defaultProductArray;
  // });

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
          <li className="nav-item">
            <NavLink to="/services" className="nav-link">
              Services
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
              setProductsCount={setProductsCount}
              productsCount={productsCount}
            />
          }
        />
        <Route
          path="/services"
          element={
            <Services
              setServiceCount={setServiceCount}
              serviceCount={serviceCount}
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
        productsCount={productsCount}
        serviceCount={serviceCount}
        checkoutSuccessful={checkoutSuccessful}
        setCheckoutSuccessfull={setCheckoutSuccessfull}
      />
      <SuccessfullPurchase checkoutSuccessful={checkoutSuccessful} />
    </>
  );
}
export default App;
