import { useEffect, useState } from "react";
import QuantityInput from "./QuantityInput";
import axios from "axios";

const Cart = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const stock = 15; //수량 제한 기준
  const handleClickCounter = (num) => {
    setQuantity(quantity + num);
    setTotal(product.productPrice * (quantity + num));
  };
  /* useEffect로 cart 정보 먼저 불러오기 */
  useEffect(() => {
    axios
      .get(`${backServer}/product/productDetail/${product.productNo}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
        setTotal(res.data.productPrice);
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
        <div className="cart-wrap">
          <div className="cart-btn-wrap">
            <button type="button">전체선택</button>
            <button type="button">선택삭제</button>
          </div>
          <div className="product-wrap">
            <div className="product-detail">
              <div className="product-chk-btn">선택</div>
              <div className="product-thumb">썸네일</div>
              <div className="product-info">
                <div className="product-name">구매상품명</div>
                <div className="product-">
                  <QuantityInput
                    quantity={quantity}
                    onClick={handleClickCounter}
                    stock={stock}
                  />
                </div>
                <div className="product-totalprice">
                  Total | {total.toLocaleString("ko-KR")}원
                </div>
              </div>
            </div>
            <div className="product-total">총금액</div>
            <div className="product-btn">
              <button type="button">삭제</button>
              <button type="button">결제하기</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
