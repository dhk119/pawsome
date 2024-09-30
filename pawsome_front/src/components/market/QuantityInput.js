import { useState } from "react";
import "./quantityInput.css";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

const QuantityInput = (props) => {
  const quantity = props.quantity;
  const onClick = props.onClick;
  const stock = props.stock;
  return (
    <div>
      <button
        type="button"
        className="decrease quantity"
        disabled={quantity === 1} //최소수량일 경우 비활성화
        onClick={() => onClick(-1)}
      >
        <FaMinus />
      </button>
      <label>
        <input
          className="amount"
          type="text"
          min={1}
          value={quantity}
          max={stock}
          readOnly
        />
      </label>
      <button
        type="button"
        className="increase quantity"
        disabled={quantity === stock} //최대수량일 경우 비활성화
        onClick={() => onClick(1)}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default QuantityInput;
