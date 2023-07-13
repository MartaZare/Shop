import { useEffect, useState } from "react";
import ServiceData from "./ServiceData";
import React from "react";
import ProductsData from "./ProductsData";
import Checkout from "./Checkout";

interface ShoppingCartProps {
  productsCount: number[];
  serviceCount: number[];
  checkoutSuccessful: boolean;
  setCheckoutSuccessfull: (arg: boolean) => void;
}

export function ShoppingCart(props: ShoppingCartProps) {
  const [isVisibleCart, setIsVisibleCart] = useState(false);
  const [total, setTotal] = useState(0);
  const [isVisibleCheckoutField, setIsVisibleCheckoutField] = useState(false);
  const [isVisibleCheckoutBtn, setIsVisibleCheckoutBtn] = useState(false);

  function openCart() {
    setIsVisibleCart(true);
  }

  function closeCart() {
    setIsVisibleCart(false);
  }

  function handleCheckoutClick() {
    setIsVisibleCheckoutField(true);
  }

  useEffect(() => {
    let newTotal = 0;
    for (let i = 0; i < ProductsData().length; i++) {
      if (i < ServiceData().length) {
        newTotal +=
          ServiceData()[i].price * props.serviceCount[i] +
          ProductsData()[i].price * props.productsCount[i];
      } else if (i < ProductsData().length) {
        newTotal += ProductsData()[i].price * props.productsCount[i];
      }
    }
    setTotal(newTotal);
  }, [props.productsCount, props.serviceCount]);

  useEffect(() => {
    if (total > 0) {
      setIsVisibleCheckoutBtn(true);
    }
  }, [total]);

  return (
    <>
      <img
        src="images/bag.png"
        alt="cart_image"
        className="open-cart-button"
        onClick={openCart}
      />

      {isVisibleCart && (
        <div className="cart">
          <img
            src="images/close.png"
            alt="product "
            className="close-cart-button"
            onClick={closeCart}
          />
          <h1>Shopping Cart</h1>
          {props.productsCount.map((item, i) => {
            if (item !== 0) {
              let productsArray = ProductsData();
              return (
                <>
                  <React.Fragment key={i}>
                    <div className="cart-item">
                      <div className="cart-product">
                        <img src={productsArray[i].image} alt="product"></img>
                        <div>
                          <p>{productsArray[i].name}</p>
                          <p>x{item}</p>
                        </div>
                      </div>
                      <p className="cart-product-price">
                        {Number((productsArray[i].price * item).toFixed(2))}
                      </p>
                    </div>
                  </React.Fragment>
                </>
              );
            }
          })}

          {props.serviceCount.map((item, i) => {
            if (item !== 0) {
              let servicesArray = ServiceData();
              return (
                <>
                  <React.Fragment key={i}>
                    <div className="cart-item">
                      <div className="cart-product">
                        <img src={servicesArray[i].image} alt="product"></img>
                        <div>
                          <p>{servicesArray[i].name}</p>
                          <p>x{item}</p>
                        </div>
                      </div>
                      <p className="cart-product-price">
                        {Number((servicesArray[i].price * item).toFixed(2))}
                      </p>
                    </div>
                  </React.Fragment>
                </>
              );
            }
          })}
          {isVisibleCheckoutBtn ? (
            <button
              type="submit"
              form="checkout-form"
              onClick={handleCheckoutClick}
            >
              Pay: {Number(total.toFixed(2))} €
            </button>
          ) : (
            <>
              <img src="/images/unicorn.png" alt="empty-cart" />
              <p>Sorry, your cart is currently empty...</p>
            </>
          )}
          {isVisibleCheckoutField ? (
            <Checkout
              total={total}
              checkoutSuccessful={props.checkoutSuccessful}
              setCheckoutSuccessfull={props.setCheckoutSuccessfull}
              isVisibleCheckoutField={isVisibleCheckoutField}
              setIsVisibleCheckoutField={setIsVisibleCheckoutField}
              setIsVisible={setIsVisibleCart}
            />
          ) : null}
        </div>
        // </div>
      )}
    </>
  );
}
