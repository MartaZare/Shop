import CheckoutForm from "./CheckoutForm";

interface CheckoutProps {
  total: number;
  checkoutSuccessful: boolean;
  setCheckoutSuccessfull: (arg: boolean) => void;
  isVisibleCheckoutField: boolean;
  setIsVisibleCheckoutField: (arg: boolean) => void;
  setIsVisible: (arg: boolean) => void;
}

export default function Checkout(props: CheckoutProps) {
  function closeCheckout() {
    props.setIsVisibleCheckoutField(false);
  }

  return (
    <>
      {props.isVisibleCheckoutField && (
        <div className="cart">
          <img
            src="images/close.png"
            alt="product "
            className="close-cart-button"
            onClick={closeCheckout}
          />

          <h1>Order details</h1>
          <div className="personal-info">
            <CheckoutForm
              total={props.total}
              checkoutSuccessful={props.checkoutSuccessful}
              setCheckoutSuccessfull={props.setCheckoutSuccessfull}
              setIsVisible={props.setIsVisible}
            />
          </div>
        </div>
      )}
    </>
  );
}
