import { useEffect, useState } from "react";
import React from "react";
import Checkout from "./Checkout";
import { Product } from "../other/Types";
import { API_URL } from "../other/Constants";

interface ShoppingCartProps {
  checkoutSuccessful: boolean;
  setCheckoutSuccessfull: (arg: boolean) => void;
  productsInCart: Product[];
  setProductsInCart: (arg: Product[]) => void;
}

export function ShoppingCart(props: ShoppingCartProps) {
  const {
    checkoutSuccessful,
    setCheckoutSuccessfull,
    productsInCart,
    setProductsInCart,
  } = props;

  const [isVisibleCart, setIsVisibleCart] = useState(false);
  const [total, setTotal] = useState(0);
  const [isVisibleCheckoutField, setIsVisibleCheckoutField] = useState(false);
  const [isVisibleCheckoutBtn, setIsVisibleCheckoutBtn] = useState(false);
  const [isVisibleProducts, setisVisibleProducts] = useState(false);

  useEffect(() => {
    productsInCart.map((product) => {
      fetch(`${API_URL}/products/${product.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          bought: true,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    });
  }, [checkoutSuccessful]);

  useEffect(() => {
    if (productsInCart.length !== 0) {
      setIsVisibleCheckoutBtn(true);
      setTotal(0);
      setisVisibleProducts(true);

      let newTotal: number = 0;
      productsInCart.map((product) => {
        newTotal += product.price;
        setTotal(newTotal);
      });
    }
  }, [productsInCart, total]);

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
    if (checkoutSuccessful) {
      setIsVisibleCart(false);
      setIsVisibleCheckoutBtn(false);
      setIsVisibleCheckoutField(false);
      setTotal(0);
      setProductsInCart([]);
      console.log("CHECKOUT SUCCESSFUL");
      console.log(productsInCart);
    }
  }, [checkoutSuccessful]);

  useEffect(() => {
    if (total > 0) {
      setIsVisibleCheckoutBtn(true);
    }
  }, [total]);

  function handleDeleteItem(id: number) {
    const newProductsInCart = productsInCart.filter(
      (product) => product.id !== id
    );

    setProductsInCart(newProductsInCart);
  }

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
          {isVisibleProducts && (
            <div className="items">
              {productsInCart.map((product) => {
                if (product) {
                  return (
                    <>
                      <React.Fragment key={product.id}>
                        <div className="cart-item">
                          <div className="cart-product">
                            <img src={product.image} alt="product" />
                            <div>
                              <p>{product.name}</p>
                            </div>
                          </div>
                          <p className="cart-product-price">
                            {Number(product.price.toFixed(2))}
                          </p>
                          <button
                            className="delete-btn"
                            onClick={() => {
                              handleDeleteItem(product.id);
                            }}
                          >
                            x
                          </button>
                        </div>
                      </React.Fragment>
                    </>
                  );
                }
              })}
            </div>
          )}

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
              checkoutSuccessful={checkoutSuccessful}
              setCheckoutSuccessfull={setCheckoutSuccessfull}
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
