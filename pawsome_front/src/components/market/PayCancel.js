import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginEmailState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import { TiDelete } from "react-icons/ti";
import { cancelPay } from "./refund";
import PageNavi from "../utils/PageNavi";
import Swal from "sweetalert2";

const PayCancel = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [buyList, setBuyList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [totalCount, setTotalCount] = useState();
  const [result, setResult] = useState(-1); //결제관련 state
  useEffect(() => {
    axios
      .get(`${backServer}/pay/buyList/${loginEmail}/${reqPage}`)
      .then((res) => {
        console.log(res);
        setBuyList(res.data.list);
        setPi(res.data.pi);
        setTotalCount(res.data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginEmail, reqPage, result]);

  return (
    <div className="payment-page-wrap">
      <div className="page-title">결제내역</div>
      <div className="payList-wrap margin">
        <div className="title">주문 상품 정보</div>
        <div className="content-wrap">
          {buyList.map((buy, i) => {
            return <BuyItem key={"buy-" + i} buy={buy} setResult={setResult} />;
          })}
        </div>
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
    </div>
  );
};

const BuyItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const buy = props.buy;
  const setResult = props.setResult;
  const navigate = useNavigate();

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
                <td>구매일자</td>
                <th>{buy.payUid}수정!</th>
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
          {/* 부분취소 */}
          <div
            className="cancelBtn"
            style={{ width: "90px" }}
            onClick={() => {
              Swal.fire({
                title: "결제를 취소하시겠습니까?",
                html: "부분 결제 취소 후 총 결제금액이 30,000원 이하일 경우,</br>배송비 3,000원을 제외한 금액이 환불됩니다.",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#ffa518",
                confirmButtonText: "예",
                cancelButtonText: "아니오",
              }).then((result) => {
                if (result.isConfirmed) {
                  cancelPay(
                    buy.buyNo, //결제시퀀스번호
                    buy.productNo, //상품번호
                    buy.payUid, //주문번호
                    buy.buyCount * buy.productPrice, // 결제 총 금액
                    setResult
                  );
                  //결제내역확인페이지로 이동
                  navigate("/market/payment/payCancel");
                } else {
                  //결제취소화면으로 이동
                  navigate("/market/payment/payCancel");
                }
              });
            }}
          >
            <TiDelete />
            부분취소
          </div>
          <div
            className="cancelBtn"
            style={{ width: "90px" }}
            onClick={() => {
              Swal.fire({
                title: "결제를 취소하시겠습니까?",
                html: "해당 주문 건을 전체 취소합니다.</br>취소 후, 철회가 불가능합니다.",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#ffa518",
                confirmButtonText: "예",
                cancelButtonText: "아니오",
              }).then((result) => {
                if (result.isConfirmed) {
                  cancelPay(
                    buy.buyNo, //결제시퀀스번호
                    0, //상품번호 (백에서 상품번호가 0이면 전체 취소 되도록)
                    buy.payUid, //주문번호
                    buy.totalPrice, // 결제 총 금액
                    setResult
                  );
                  //결제내역확인페이지로 이동
                  navigate("/mypage/buy-list");
                } else {
                  //결제취소화면으로 이동
                  navigate("/market/payment/payCancel");
                }
              });
            }}
          >
            <TiDelete />
            전체취소
          </div>

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
