import { useEffect, useState } from "react";
import QuantityInput from "./QuantityInput";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";

const Cart = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [cartList, setCartList] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/payment/cartList/${loginEmail}`)
      .then((res) => {
        console.log(res);
        setCartList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="section productList-wrap">
      <div className="productDetail-wrap">
        <div className="line"></div>
        <div className="page-title">장바구니</div>
        <div className="cartMain-wrap">
          <div className="cart-wrap">
            <div className="cart-btn-wrap">
              <button type="button">전체선택</button>
              <button type="button">선택삭제</button>
            </div>
            {cartList.map((cart, i) => {
              return <CartItem key={"cart-" + i} cart={cart} />;
            })}
          </div>
          <div className="cart-pay-wrap">
            <div className="title">예상 결제 금액</div>
            <div className="content"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CartItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const cart = props.cart;
  const [quantity, setQuantity] = useState(cart.productCartCount);
  const [total, setTotal] = useState(cart.productCartCount * cart.productPrice);
  const stock = 15; //수량 제한 기준
  const handleClickCounter = (num) => {
    setQuantity(quantity + num);
    setTotal(cart.productPrice * (quantity + num));
    axios
      .patch(
        `${backServer}/payment/productCount/${cart.productNo}/${num}/${loginEmail}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();
  return (
    <div className="product-cart-wrap">
      <div className="product-detail">
        <div className="product-chk-btn">선택</div>
        <div className="product-thumb">
          <img
            src={
              cart.productThumb
                ? `${backServer}/product/thumb/${cart.productThumb}`
                : "/image/basicimage.png"
            }
          />
        </div>
        <div className="product-cart-info">
          <div className="product-name">{cart.productName}</div>
          <div className="product-count">
            <QuantityInput
              quantity={quantity}
              onClick={handleClickCounter}
              stock={stock}
            />
            <div className="product-totalprice">
              총 금액 : {total.toLocaleString("ko-KR")}원
            </div>
            <div className="delete">
              <TiDelete />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
