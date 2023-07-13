import { useState } from "react";

interface CounterProps {
  countHere: number[];
  setCountHere: (arg: number[]) => void;
  index: number;
}

export default function Counter(props: CounterProps) {
  const [isVisibleCounter, setIsVisibleCounter] = useState(false);
  const [isVisibleAdd, setIsVisibleAdd] = useState(true);

  function addBtnClick() {
    setIsVisibleCounter(true);
    setIsVisibleAdd(false);
    const myArray = [...props.countHere];
    myArray[props.index] = props.countHere[props.index] + 1;
    props.setCountHere(myArray);
  }

  function handleMinus() {
    if (props.countHere[props.index] > 0) {
      const myArray = [...props.countHere];
      myArray[props.index] = props.countHere[props.index] - 1;
      props.setCountHere(myArray);
    }
  }

  function handlePlus() {
    const myArray = [...props.countHere];
    myArray[props.index] = props.countHere[props.index] + 1;
    props.setCountHere(myArray);
  }

  return (
    <>
      {isVisibleAdd && (
        <button className="add-product-btn" onClick={addBtnClick}>
          Add
        </button>
      )}

      {isVisibleCounter && (
        <div className="counter">
          <button onClick={handleMinus}>-</button>
          <h1>{props.countHere[props.index]}</h1>
          <button onClick={handlePlus}>+</button>
        </div>
      )}
    </>
  );
}
