import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import { useParams } from "react-router-dom";
import { length } from "./../../../node_modules/stylis/src/Tokenizer";
import { charat, replace } from "./../../../node_modules/stylis/src/Utility";

const Payment = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
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
  useEffect(() => {
    axios
      .get(`${backServer}/pay/payer/${loginEmail}`)
      .then((res) => {
        console.log(res);
        setMemberData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${backServer}/pay/payList/${checkCartNo}`)
      .then((res) => {
        console.log(res);
        setCartList(res.data);
        const result = res.data.map((cart) => {
          paymentTotal += cart.productCartCount * cart.productPrice;
        });
        setTotalPrice(paymentTotal);
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
    let input = e.target.value;
    input = input.replace(/[^0-9]/g, "");
    if (input.length > 3 && input.charAt(3) !== "-") {
      input = input.slice(0, 3) + "-" + input.slice(3);
    }
    if (input.length > 8 && input.charAt(8) !== "-") {
      input = input.slice(0, 8) + "-" + input.slice(8);
    }
    if (input.length > 13) {
      return;
    }
    setPayer((prevPayer) => ({
      ...prevPayer,
      payPhone: input,
    }));
  };
  const changeName = (e) => {
    let input = e.target.value;
    setPayer((prevPayer) => ({
      ...prevPayer,
      payName: input,
    }));
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
    }
  };

  //결제
  const pay = () => {
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
        name: `${cartList[0].productName} 외 ${cartList.length - 1}건`,
        amount: 100, //테스트 끝나면 totalPrice로 수정
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
                <td>{totalPrice.toLocaleString("ko-KR")}</td>
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
              {totalPrice >= 30000
                ? totalPrice.toLocaleString("ko-KR")
                : (totalPrice + 3000).toLocaleString("ko-KR")}{" "}
              원
            </div>
          </div>
        </div>
        <div className="pay-btn">
          <button onClick={pay}>결제하기</button>
        </div>
      </div>
      <div className="pay-type-wrap margin">
        <div className="title">결제 동의</div>
        <div className="content">결제에 동의하시나요? </div>
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
