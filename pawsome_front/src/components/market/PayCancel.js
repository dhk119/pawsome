import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginEmailState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import { TiDelete } from "react-icons/ti";

const PayCancel = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [buyList, setBuyList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  useEffect(() => {
    axios
      .get(`${backServer}/pay/buyList/${loginEmail}/${reqPage}`)
      .then((res) => {
        console.log(res);
        setBuyList(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginEmail, reqPage]);

  return (
    <div className="payment-page-wrap">
      <div className="page-title">결제내역</div>
      <div className="payList-wrap margin">
        <div className="title">주문 상품 정보</div>
        <div className="content-wrap">
          {buyList.map((buy, i) => {
            return <BuyItem key={"buy-" + i} buy={buy} />;
          })}
        </div>
      </div>
    </div>
  );
};

const BuyItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const buy = props.buy;
  return (
    <div className="product-cart-wrap">
      <div className="product-pay-detail">
        <div className="product-thumb">
          <img
            src={
              buy.productThumb
                ? `${backServer}/product/thumb/${buy.productThumb}`
                : "/image/basicimage.png"
            }
          />
        </div>
        <div className="pay-info">
          <table className="pay-info-tbl">
            <tbody>
              <tr>
                <th colSpan={2}>
                  {buy.buyState == 1
                    ? "결제 완료"
                    : buy.buyState == 2
                    ? "결제 취소"
                    : buy.buyState == 3
                    ? "배송중"
                    : "배송완료"}
                </th>
              </tr>
              <tr>
                <td>구매번호</td>
                <th>{buy.payUid}</th>
              </tr>
              <tr>
                <td>상품명</td>
                <th>{buy.productName}</th>
              </tr>
              <tr>
                <td>상품금액</td>
                <th>{buy.productPrice.toLocaleString("ko-KR")}원</th>
              </tr>
              <tr>
                <td>수량</td>
                <th>{buy.buyCount}</th>
              </tr>
            </tbody>
          </table>
          {/* 
          <div
            className="cancelBtn"
            onClick={() => {
              cancelBuy(cart.cartNo);
            }}
          >
            <TiDelete />
          </div>
           */}
          <div className="product-totalprice">
            해당상품 총 금액 :{" "}
            {(buy.buyCount * buy.productPrice).toLocaleString("ko-KR")}원
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayCancel;
