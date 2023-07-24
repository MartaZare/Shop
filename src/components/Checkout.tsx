import CheckoutForm from "./CheckoutForm";

interface CheckoutProps {
  total: number;
  isVisibleCheckoutField: boolean;
  setIsVisibleCheckoutField: (arg: boolean) => void;
  setIsVisibleCart: (arg: boolean) => void;
}

export default function Checkout(props: CheckoutProps) {
  const {
    total,
    isVisibleCheckoutField,
    setIsVisibleCheckoutField,
    setIsVisibleCart,
  } = props;

  function closeCheckout() {
    setIsVisibleCheckoutField(false);
  }

  return (
    <>
      {isVisibleCheckoutField && (
        <div className="cart">
          <img
            src="images/close.png"
            alt="product "
            className="close-cart-button"
            onClick={closeCheckout}
          />

          <h1>Order details</h1>
          <div className="personal-info">
            <CheckoutForm total={total} setIsVisibleCart={setIsVisibleCart} />
          </div>
        </div>
      )}
    </>
  );
}
