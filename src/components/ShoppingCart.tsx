import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { removeFromCart } from "../reducers/cartSlice";
import Checkout from "./Checkout";
import { Product } from "../other/Types";
import { changeProductBoughtState } from "../Api_calls";

export default function ShoppingCart() {
  const [total, setTotal] = useState(0);
  const [isVisibleCheckoutField, setIsVisibleCheckoutField] = useState(false);
  const [isVisibleCheckoutBtn, setIsVisibleCheckoutBtn] = useState(false);
  const [isVisibleProducts, setIsVisibleProducts] = useState(false);
  const [isVisibleCart, setIsVisibleCart] = useState(false);

  const dispatch = useDispatch();
  const cartProducts = useSelector((state: RootState) => state.products);
  const checkout = useSelector((state: RootState) => state.checkout);

  useEffect(() => {
    cartProducts.map((product) => {
      changeProductBoughtState(product, true);
    });
  }, [checkout]);

  useEffect(() => {
    if (cartProducts.length !== 0) {
      setIsVisibleCheckoutBtn(true);
      setIsVisibleProducts(true);

      let newTotal: number = 0;
      cartProducts.map((product) => {
        newTotal += product.price;
        setTotal(newTotal);
      });
    }

    if (cartProducts.length === 0) {
      setIsVisibleCheckoutBtn(false);
    }
  }, [cartProducts]);

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
    if (checkout === true) {
      setIsVisibleCart(false);
      setIsVisibleCheckoutBtn(false);
      setIsVisibleCheckoutField(false);
      setTotal(0);

      cartProducts.map((soldProduct) => {
        dispatch(removeFromCart(soldProduct));
      });
    }
  }, [checkout]);

  useEffect(() => {
    if (total > 0) {
      setIsVisibleCheckoutBtn(true);
    }
  }, [total]);

  function handleDeleteItem(id: number) {
    let productToDelete: Product | undefined = cartProducts.find(
      (product) => product.id === id
    );

    if (productToDelete) {
      dispatch(removeFromCart(productToDelete));
    }
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
              {cartProducts.map((product) => {
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
              <img src="/images/empty.png" alt="empty-cart" />
              <p>Sorry, your cart is currently empty...</p>
            </>
          )}

          {isVisibleCheckoutField ? (
            <Checkout
              total={total}
              isVisibleCheckoutField={isVisibleCheckoutField}
              setIsVisibleCheckoutField={setIsVisibleCheckoutField}
              setIsVisibleCart={setIsVisibleCart}
            />
          ) : null}
        </div>
      )}
    </>
  );
}
