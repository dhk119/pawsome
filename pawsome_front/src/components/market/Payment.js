import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, loginEmailState } from "../utils/RecoilData";
import { useNavigate, useParams } from "react-router-dom";
import { length } from "./../../../node_modules/stylis/src/Tokenizer";
import { charat, replace } from "./../../../node_modules/stylis/src/Utility";
import Swal from "sweetalert2";

const Payment = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberData, setMemberData] = useState({});
  const [payer, setPayer] = useState({
    memberEmail: "",
    payPhone: "",
    payAddr1: "",
    payAddr2: "",
    payAddr3: "",
    payName: "",
  });
  const [cartList, setCartList] = useState([]);
  const params = useParams();
  const checkCartNo = params.str;
  const [totalPrice, setTotalPrice] = useState(0); //총금액
  let paymentTotal = 0; //총금액 더하기위한 옹달샘
  const [payPrice, setPayPrice] = useState(); //결제금액
  const phoneRequried = useRef();
  const addrRequired = useRef();
  const postRequired = useRef();
  const nameRequired = useRef();
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
      .get(`${backServer}/pay/payer/${loginEmail}`)
      .then((res) => {
        setMemberData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${backServer}/pay/payList/${checkCartNo}`)
      .then((res) => {
        setCartList(res.data);
        const result = res.data.map((cart) => {
          paymentTotal += cart.productCartCount * cart.productPrice;
        });
        setTotalPrice(paymentTotal);
        if (paymentTotal >= 30000) {
          setPayPrice(paymentTotal);
        } else {
          setPayPrice(paymentTotal + 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //주소
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  //결제
  useEffect(() => {
    // 외부 스크립트 로드 함수
    const loadScript = (src, callback) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.onload = callback;
      document.head.appendChild(script);
    };
    // 스크립트 로드 후 실행
    loadScript("https://code.jquery.com/jquery-1.12.4.min.js", () => {
      loadScript("https://cdn.iamport.kr/js/iamport.payment-1.2.0.js", () => {
        const IMP = window.IMP;
        // 가맹점 식별코드
        IMP.init("imp08702631");
      });
    });
    // 컴포넌트가 언마운트될 때 스크립트를 제거하기 위한 정리 함수
    return () => {
      const scripts = document.querySelectorAll('script[src^="https://"]');
      scripts.forEach((script) => script.remove());
    };
  }, []);

  //전화번호 변경
  const phoneNum = (e) => {
    phoneRequried.current.classList.remove("required");
    let input = e.target.value;
    input = input.replace(/[^0-9]/g, "");
    if (input.length > 3 && input.charAt(3) !== "-") {
      input = input.slice(0, 3) + "-" + input.slice(3);
    }
    if (input.length > 8 && input.charAt(8) !== "-") {
      input = input.slice(0, 8) + "-" + input.slice(8);
    }
    if (input.length == 13) {
      phoneRequried.current.classList.add("required");
    }
    if (input.length > 13) {
      phoneRequried.current.classList.add("required");
      return;
    }
    setPayer((prevPayer) => ({
      ...prevPayer,
      payPhone: input,
    }));
  };
  //이름 변경
  const changeName = (e) => {
    let input = e.target.value;
    setPayer((prevPayer) => ({
      ...prevPayer,
      payName: input,
    }));
    if (input == "") {
      nameRequired.current.classList.remove("required");
    }
    if (input != "") {
      nameRequired.current.classList.add("required");
    }
  };

  //베송지변경
  const changeAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr =
          data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
        setPayer((prevPayer) => ({
          ...prevPayer,
          payAddr1: data.zonecode,
          payAddr2: addr,
          payAddr3: "",
        }));
        document.querySelector("input[name='memberAddr3']").focus();
      },
    }).open();
  };
  const changeDetailAddr = (e) => {
    let input = e.target.value;
    setPayer((prevPayer) => ({
      ...prevPayer,
      payAddr3: input,
    }));
    if (input == "") {
      addrRequired.current.classList.remove("required");
    }
    if (input != "") {
      if (payer.payAddr2 != "") {
        addrRequired.current.classList.add("required");
      }
    }
  };

  //배송지 관리
  const [isAddrBtnDisabled, setIsAddrBtnDisabled] = useState(false);
  const radioType = (e) => {
    const value = e.target.value;
    if (value == 2) {
      setIsAddrBtnDisabled(true);
      setPayer((prevPayer) => ({
        ...prevPayer,
        memberEmail: memberData.memberEmail,
        payName: memberData.memberName,
        payAddr1: memberData.memberAddr1,
        payAddr2: memberData.memberAddr2,
        payAddr3: memberData.memberAddr3,
      }));
      nameRequired.current.classList.add("required");
      addrRequired.current.classList.add("required");
    }
    if (value == 1) {
      setIsAddrBtnDisabled(false);
      setPayer((prevPayer) => ({
        ...prevPayer,
        memberEmail: "",
        payName: "",
        payAddr1: "",
        payAddr2: "",
        payAddr3: "",
      }));
      nameRequired.current.classList.remove("required");
      addrRequired.current.classList.remove("required");
    }
  };

  // 결제 버튼 클릭 시 실행할 함수
  const handlePayment = (paymentMethod) => {
    const requiredFields = document.querySelectorAll(".required");
    if (requiredFields.length === 3) {
      // 결제 함수 실행
      if (paymentMethod === "kg") {
        pay(); // KG 결제 함수
      } else if (paymentMethod === "toss") {
        pay2(); // Toss 결제 함수
      }
    } else {
      Swal.fire({
        title: "주문정보를 확인하세요",
        text: "모든 항목을 정확히 기입해주세요.",
        icon: "warning",
      });
    }
  };

  //KG결제
  const pay = () => {
    let name = "";
    if (cartList.length > 1) {
      name = `${cartList[0].productName} 외 ${cartList.length - 1}건`;
    } else {
      name = `${cartList[0].productName}`;
    }
    const date = new Date();
    const dateString =
      date.getFullYear() +
      "" +
      (date.getMonth() + 1) +
      "" +
      date.getDate() +
      "" +
      date.getHours() +
      "" +
      date.getMinutes() +
      "" +
      date.getSeconds() +
      "" +
      date.getMilliseconds();
    window.IMP.request_pay(
      {
        pg: "html5_inicis.INIpayTest",
        pay_method: "card",
        merchant_uid: dateString,
        name: name,
        amount: payPrice,
        buyer_email: loginEmail,
        buyer_name: payer.payName,
        buyer_tel: payer.payPhone,
        buyer_addr: payer.payAddr2,
        buyer_postcode: payer.payAddr1,
      },
      (rsp) => {
        if (rsp.success) {
          // 결제 성공 시 로직
          console.log(rsp);
          // 결제 성공 시 저장할 데이터
          const form = new FormData();
          form.append("memberEmail", loginEmail);
          form.append("payUid", rsp.merchant_uid);
          form.append("totalPrice", totalPrice);
          form.append("payDate", date);
          form.append("payName", payer.payName);
          form.append("payAddr1", payer.payAddr1);
          form.append("payAddr2", payer.payAddr2);
          form.append("payAddr3", payer.payAddr3);
          form.append("payCartNo", checkCartNo);
          axios
            .post(`${backServer}/pay/payment`, form)
            .then((res) => {
              console.log(res);
              Swal.fire({
                title: "결제 성공",
                text: "결제를 성공했습니다.",
                icon: "success",
              });
              navigate("/market/payment/success");
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          // 결제 실패 시 로직
          console.log(rsp.error_msg);
          // 추가로 실행할 로직을 여기에 작성
        }
      }
    );
  };

  //토스결제
  const pay2 = () => {
    let name = "";
    if (cartList.length > 1) {
      name = `${cartList[0].productName} 외 ${cartList.length - 1}건`;
    } else {
      name = `${cartList[0].productName}`;
    }
    const date = new Date();
    const dateString =
      date.getFullYear() +
      "" +
      (date.getMonth() + 1) +
      "" +
      date.getDate() +
      "" +
      date.getHours() +
      "" +
      date.getMinutes() +
      "" +
      date.getSeconds() +
      "" +
      date.getMilliseconds();
    window.IMP.request_pay(
      {
        pg: "uplus.tlgdacomxpay",
        pay_method: "card",
        merchant_uid: dateString,
        name: name,
        amount: payPrice,
        buyer_email: loginEmail,
        buyer_name: payer.payName,
        buyer_tel: payer.payPhone,
        buyer_addr: payer.payAddr2,
        buyer_postcode: payer.payAddr1,
      },
      (rsp) => {
        if (rsp.success) {
          // 결제 성공 시 로직
          console.log(rsp);
          // 결제 성공 시 저장할 데이터
          const form = new FormData();
          form.append("memberEmail", loginEmail);
          form.append("payUid", rsp.merchant_uid);
          form.append("totalPrice", totalPrice);
          form.append("payDate", date);
          form.append("payName", payer.payName);
          form.append("payAddr1", payer.payAddr1);
          form.append("payAddr2", payer.payAddr2);
          form.append("payAddr3", payer.payAddr3);
          form.append("payCartNo", checkCartNo);
          axios
            .post(`${backServer}/pay/payment`, form)
            .then((res) => {
              console.log(res);
              Swal.fire({
                title: "결제 성공",
                text: "결제를 성공했습니다.",
                icon: "success",
              });
              navigate("/mypage/buy-list");
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          // 결제 실패 시 로직
          console.log(rsp.error_msg);
          // 추가로 실행할 로직을 여기에 작성
        }
      }
    );
  };

  return (
    <div className="payment-page-wrap">
      <div className="page-title">결제</div>
      <div className="order-wrap margin">
        <div className="title">
          <div className="select-title">주문 정보</div>
          <div className="select">
            <label>
              <input
                type="radio"
                value={1}
                name="select"
                onChange={radioType}
                defaultChecked
              />
              새로 작성
            </label>
            <label>
              <input
                type="radio"
                value={2}
                name="select"
                onChange={radioType}
              />
              주문자 정보와 동일
            </label>
          </div>
        </div>
        <div className="content-wrap">
          <table className="member-info-tbl">
            <tbody>
              <tr>
                <th>주문자</th>
                <td>{memberData.memberName}</td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>{loginEmail}</td>
              </tr>
              <tr>
                <th>받는 사람</th>
                <td>
                  <input
                    onChange={changeName}
                    value={payer.payName}
                    ref={nameRequired}
                    placeholder="배송 받는 사람의 이름을 작성해주세요."
                  />
                </td>
              </tr>
              <tr>
                <th>배송지 주소</th>
                <td>
                  <div className="post-code-wrap">
                    <input
                      type="text"
                      name="memberAddr1"
                      id="postcode"
                      value={payer.payAddr1}
                      placeholder="우편번호"
                      readonly
                    />
                    <button
                      type="button"
                      id="addrBtn"
                      onClick={changeAddress}
                      disabled={isAddrBtnDisabled}
                    >
                      주소찾기
                    </button>
                  </div>
                  <div className="detail-address-wrap">
                    <div>
                      <input
                        type="text"
                        name="memberAddr2"
                        id="address"
                        value={payer.payAddr2}
                        ref={postRequired}
                        placeholder="도로명 주소"
                        readonly
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="memberAddr3"
                        id="detailAddress"
                        value={payer.payAddr3}
                        onChange={changeDetailAddr}
                        ref={addrRequired}
                        placeholder="상세주소를 작성해주세요."
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>받는 사람 전화번호</th>
                <td>
                  <input
                    id="memberPhone"
                    value={payer.payPhone}
                    onChange={phoneNum}
                    ref={phoneRequried}
                    placeholder="배송 받는 사람의 전화번호를 작성해주세요."
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="payList-wrap margin">
        <div className="title">주문 상품 정보</div>
        <div className="content-wrap">
          {cartList.map((cart, i) => {
            return <PayItem key={"pay-" + i} cart={cart} />;
          })}
        </div>
      </div>
      <div className="pay-wrap margin">
        <div className="title">결제 정보</div>
        <div className="content-wrap">
          <table>
            <tbody>
              <tr>
                <th>주문상품</th>
                <td>{totalPrice.toLocaleString("ko-KR")} 원</td>
              </tr>
              <tr>
                <th>배송비</th>
                <td>
                  {totalPrice >= 30000 ? 0 : (3000).toLocaleString("ko-KR")} 원
                </td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 auto",
              width: "780px",
            }}
          >
            <div className="payment-total">최종 결제금액</div>
            <div className="payment-total">
              {payPrice
                ? payPrice === 0
                  ? payPrice
                  : payPrice.toLocaleString("ko-KR")
                : ""}{" "}
              원
            </div>
          </div>
        </div>
        <div className="pay-btn">
          <button onClick={() => handlePayment("kg")}>결제하기 (KG)</button>
          <button onClick={() => handlePayment("toss")}>결제하기 (Toss)</button>
        </div>
      </div>
    </div>
  );
};

const PayItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const cart = props.cart;
  return (
    <div className="product-cart-wrap">
      <div className="product-pay-detail">
        <div className="product-thumb">
          <img
            src={
              cart.productThumb
                ? `${backServer}/product/thumb/${cart.productThumb}`
                : "/image/basicimage.png"
            }
          />
        </div>
        <div className="pay-info">
          <table className="pay-info-tbl">
            <tbody>
              <tr>
                <td>상품명</td>
                <th>{cart.productName}</th>
              </tr>
              <tr>
                <td>상품금액</td>
                <th>{cart.productPrice.toLocaleString("ko-KR")}원</th>
              </tr>
              <tr>
                <td>선택수량</td>
                <th>{cart.productCartCount}</th>
              </tr>
            </tbody>
          </table>
          <div className="product-totalprice">
            해당상품 총 금액 :{" "}
            {(cart.productCartCount * cart.productPrice).toLocaleString(
              "ko-KR"
            )}
            원
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
