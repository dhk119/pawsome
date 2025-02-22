import { useEffect, useState } from "react";
import QuantityInput from "./QuantityInput";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, loginEmailState } from "../utils/RecoilData";
import { Form, Link, useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";

const Cart = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [cartList, setCartList] = useState([]);
  const [checkedArr, setCheckedArr] = useState([]); //선택한 상품 배열
  const [state, setState] = useState(true); //선택상품 삭제했을 때 리스트 랜더링
  const loginState = useRecoilValue(isLoginState);
  useEffect(() => {
    if (!loginState) {
      Swal.fire({
        title: "로그인 필요",
        text: "로그인 후 다시 시도해주세요",
        icon: "warning",
      });
      navigate("/");
    }
    axios
      .get(`${backServer}/cart/cartList/${loginEmail}`)
      .then((res) => {
        console.log(res);
        setCartList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginEmail, state]);

  const [checkCartNo, setCheckCartNo] = useState("");
  let str = "";
  //선택상품 총금액
  const [total, setTotal] = useState(0);
  // 체크 바뀔 때마다 새로 실행
  useEffect(() => {
    getTotalPrice();
  }, [checkedArr]);
  const getTotalPrice = () => {
    let totalPrice = 0;
    checkedArr.map((item) => {
      totalPrice += item.productPrice * item.productCartCount;
    });
    setTotal(totalPrice);
    checkedArr.map((item) => {
      str += item.cartNo + "-";
    });
    str = str.slice(0, -1); //마지막 - 자르기
    setCheckCartNo(str);
  };

  //선택상품 삭제
  const deleteChecked = () => {
    axios
      .delete(`${backServer}/cart/deleteCartList/${checkCartNo}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setState(!state);
  };

  const buyBtn = () => {
    if (checkCartNo != "") {
      navigate(`/market/payment/${checkCartNo}`);
    }
  };

  return (
    <section className="section productList-wrap">
      <div className="productDetail-wrap">
        <div className="line"></div>
        <div className="page-title">장바구니</div>
        <div className="cartMain-wrap">
          <div className="cart-wrap">
            <div className="cart-btn-wrap">
              <div className="cart-btn-wrap-flex">
                <div className="deliveryFee">
                  {total < 30000
                    ? `${(30000 - total).toLocaleString(
                        "ko-KR"
                      )}원 추가 결제 시, 배송비 무료!`
                    : "배송비 무료 혜택이 적용될 예정입니다!"}
                </div>
                <button onClick={deleteChecked}>선택삭제</button>
              </div>
            </div>
            {cartList.map((cart, i) => {
              return (
                <CartItem
                  key={"cart-" + i}
                  cart={cart}
                  setCartList={setCartList}
                  cartList={cartList}
                  checkedArr={checkedArr}
                  setCheckedArr={setCheckedArr}
                  state={state}
                  setState={setState}
                  i={i}
                />
              );
            })}
          </div>
          <div className="cart-pay-wrap">
            <div className="title">결제 예정 금액</div>
            <div className="content">
              <div className="content-price-wrap">
                <div>총 상품금액</div>
                <div>{total.toLocaleString("ko-KR")}원</div>
              </div>
              <div className="content-delivery-wrap">
                <div>
                  배송비 <span>(30,000원 이상 결제 시, 무료)</span>
                </div>
                <div>
                  +{" "}
                  {(total >= 30000 ? 0 : total != 0 ? 3000 : 0).toLocaleString(
                    "ko-KR"
                  )}
                  원
                </div>
              </div>
              <div className="content-total-wrap">
                <div>예상 결제금액</div>
                <div>
                  {(total >= 30000
                    ? total
                    : total != 0
                    ? total + 3000
                    : total
                  ).toLocaleString("ko-KR")}
                  원
                </div>
              </div>
              <div className="pay-btn">
                <button type="button" onClick={buyBtn}>
                  총 {checkedArr.length}건 주문하기 (
                  {(total >= 30000
                    ? total
                    : total != 0
                    ? total + 3000
                    : total
                  ).toLocaleString("ko-KR")}
                  원)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

//장바구니 리스트
const CartItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const cart = props.cart;
  //장바구니 삭제
  const cartList = props.cartList;
  const setCartList = props.setCartList;
  const i = props.i;

  //수량변경
  const stock = 15;
  // 백에서 수량 변경 처리
  const handleClickCounter = (num) => {
    axios
      .patch(
        `${backServer}/cart/productCount/${cart.productNo}/${num}/${loginEmail}`
      )
      .then((res) => {
        cartList[i].productCartCount += num;
        setCartList([...cartList]);
        setCheckedArr([...checkedArr]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeCart = (cartNo) => {
    Swal.fire({
      title: "해당 상품을 삭제하시겠습니까?",
      html: `상품명 : ${cart.productName}</br>상품수량 : ${cart.productCartCount}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ffa518",
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    })
      .then((result) => {
        if (result.isConfirmed) {
          console.log(cartNo);
          axios
            .delete(`${backServer}/cart/deleteCartList/${cartNo}`)
            .then((res) => {
              console.log(res);
              const arr = cartList.filter((cart) => {
                return cartNo !== cart.cartNo;
              });
              setCartList(arr);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //선택
  const checkedArr = props.checkedArr;
  const setCheckedArr = props.setCheckedArr;
  const checkHandler = (e) => {
    console.log(cart.carNo);
    console.log(e);
    if (e.target.checked) {
      setCheckedArr([...checkedArr, cart]);
    } else {
      const doubleCheckdArr = checkedArr.filter((check) => {
        return check.cartNo !== cart.cartNo;
      });
      setCheckedArr(doubleCheckdArr);
    }
  };
  console.log(checkedArr);
  return (
    <div className="product-cart-wrap">
      <div className="product-detail">
        <div className="product-chk-btn">
          <input
            type="checkbox"
            id={cart}
            onChange={(e) => checkHandler(e)}
            style={{ width: "16px", height: "16px" }}
          />
        </div>
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
              quantity={cart.productCartCount}
              onClick={handleClickCounter}
              stock={stock}
            />
            <div className="product-totalprice">
              총 금액 :{" "}
              {(cart.productCartCount * cart.productPrice).toLocaleString(
                "ko-KR"
              )}
              원
            </div>
            <div
              className="cancelBtn"
              onClick={() => {
                removeCart(cart.cartNo);
              }}
            >
              <TiDelete />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
