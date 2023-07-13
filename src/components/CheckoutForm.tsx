import { MouseEventHandler, useState } from "react";

interface CheckoutFormProps {
  total: number;
  checkoutSuccessful: boolean;
  setCheckoutSuccessfull: (arg: boolean) => void;
  setIsVisible: (arg: boolean) => void;
}

export default function CheckoutForm(props: CheckoutFormProps) {
  const [cash, setCash] = useState(false);
  const [card, setCard] = useState(false);
  const [soul, setSoul] = useState(false);
  const [pressedSubmit, setPressedSubmit] = useState(false);
  const [payBtnActive, setPayBtnActive] = useState(false);

  function handleCashClick(event: React.MouseEvent<HTMLInputElement>) {
    paymentChecked(event);
    setCash(true);
    setCard(false);
    setSoul(false);
  }

  function handleCardClick(event: React.MouseEvent<HTMLInputElement>) {
    paymentChecked(event);
    setCash(false);
    setCard(true);
    setSoul(false);
  }

  function handleSoulClick(event: React.MouseEvent<HTMLInputElement>) {
    paymentChecked(event);
    setCash(false);
    setCard(false);
    setSoul(true);
  }

  function paymentChecked(event: React.MouseEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      setPayBtnActive(true);
    } else if (!cash && !card && !soul) {
      setPayBtnActive(false);
    }
  }

  function handlePayBtnClick() {
    setPressedSubmit(true);
  }

  function isCheckoutSuccessful(event: React.FormEvent) {
    event.preventDefault();
    props.setCheckoutSuccessfull(true);
    setTimeout(() => {
      props.setCheckoutSuccessfull(false);
      props.setIsVisible(false);
    }, 4000);
  }

  return (
    <>
      <form id="checkout-form" onSubmit={isCheckoutSuccessful}>
        <label>Personal</label>
        <>
          <div className="input-flex">
            <input type="text" placeholder="First name" required />
            <input type="text" placeholder="Last name" required />
          </div>
          <div className="input-flex">
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Phone number" required />
          </div>
        </>
        <label>Shipping</label>
        <>
          <input type="text" placeholder="Street address" required />
          <div className="input-flex">
            <input type="text" placeholder="Postal code" required />
            <input type="text" placeholder="Country" required />
          </div>
        </>

        <h2>Payment method</h2>
        {!payBtnActive && pressedSubmit && (
          <h3>Please choose one of payment methods:</h3>
        )}

        <div className="payments-checkbox">
          <label
            className="payment"
            style={{
              backgroundColor: cash ? "#f8e779" : "",
              boxShadow: cash ? "0px 0px 15px 5px #f3d74b" : "",
            }}
          >
            <input
              type="radio"
              name="payment"
              value="cash"
              onClick={handleCashClick}
              required
            />
            <img src="/images/banknotes.png" alt="Cash" />
          </label>

          <label
            className="payment"
            style={{
              backgroundColor: card ? "#f8e779" : "",
              boxShadow: card ? "0px 0px 15px 5px #f3d74b" : "",
            }}
          >
            <input
              type="radio"
              name="payment"
              value="card"
              onClick={handleCardClick}
            />
            <img src="/images/credit.png" alt="Card" />
          </label>

          <label
            className="payment"
            style={{
              backgroundColor: soul ? "#f8e779" : "",
              boxShadow: soul ? "0px 0px 15px 5px #f3d74b" : "",
            }}
          >
            <input
              type="radio"
              name="payment"
              value="soul"
              onClick={handleSoulClick}
            />
            <img src="/images/soul.png" alt="Soul" />
          </label>
        </div>
      </form>

      <button type="submit" form="checkout-form" onClick={handlePayBtnClick}>
        Pay: {props.total} €{" "}
      </button>
    </>
  );
}
