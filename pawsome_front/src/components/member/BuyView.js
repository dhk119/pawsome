import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TiDelete } from "react-icons/ti";
import { cancelPay } from "./../market/refund";

const BuyView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [buyList, setBuyList] = useState([]);
  const { payUid } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(-1);

  useEffect(() => {
    if (payUid) {
      axios
        .get(`${backServer}/member/selectOneBuy/${payUid}`)
        .then((res) => {
          console.log(res.data);
          setBuyList(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [payUid, backServer, result]);

  const firstBuyInfo = buyList.length > 0 ? buyList[0] : null;

  return (
    <div className="buy-view-wrap">
      {firstBuyInfo && (
        <div className="buy-view-info">
          <h2>No.{firstBuyInfo.payUid}</h2>
          <p>{firstBuyInfo.pay.payDate}</p>
        </div>
      )}

      <div className="buy-view-items">
        {/* 전체 취소 버튼 */}
        {firstBuyInfo && (
          <div
            className="cancelBtn"
            style={{ width: "90px" }}
            onClick={() => {
              Swal.fire({
                title: "결제를 취소하시겠습니까?",
                html: "해당 주문 건을 전체 취소합니다.<br/>취소 후, 철회가 불가능합니다.",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#ffa518",
                confirmButtonText: "예",
                cancelButtonText: "아니오",
              }).then((result) => {
                if (result.isConfirmed) {
                  cancelPay(
                    firstBuyInfo.buyNo, // 전체 취소 시 결제 시퀀스 번호
                    0, // 상품 번호는 0으로 전체 취소
                    firstBuyInfo.payUid, // 주문 번호
                    firstBuyInfo.pay.totalPrice, // 총 결제 금액
                    setResult
                  );
                  navigate(`/mypage/buy-view/${firstBuyInfo.payUid}`);
                } else {
                  navigate(`/mypage/buy-view/${firstBuyInfo.payUid}`);
                }
              });
            }}
          >
            <TiDelete />
            전체취소
          </div>
        )}

        {buyList.length > 0 ? (
          buyList.map((buy, index) => (
            <div className="buy-view-card" key={index}>
              <div className="buy-view-header">
                <img
                  src={
                    buy.product.productThumb
                      ? `${backServer}/product/thumb/${buy.product.productThumb}`
                      : "/image/basicimage.png"
                  }
                  className="view-thumbnail"
                  alt={buy.product.productName}
                />
                <div className="buy-view-price-info">
                  <h3>{buy.product.productName}</h3>
                  <p>{buy.buyCount}개</p>
                  <p>{buy.product.productPrice}원</p>
                  <p></p>
                </div>
              </div>

              {/* 배송 상태 */}
              <div className="buy-view-state">
                {buy.buyState === 1
                  ? "결제완료"
                  : buy.buyState === 2
                  ? "결제취소"
                  : buy.buyState === 3
                  ? "배송중"
                  : "배송완료"}
              </div>

              {/* 부분 취소 */}
              {buy.buyState === 1 && (
                <div>
                  <button
                    className="delete-buy-list"
                    onClick={() => {
                      Swal.fire({
                        title: "결제를 취소하시겠습니까?",
                        html: "부분 결제 취소 후 총 결제 금액이 30,000원 이하일 경우,<br/>배송비 3,000원을 제외한 금액이 환불됩니다.",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonColor: "#ffa518",
                        confirmButtonText: "예",
                        cancelButtonText: "아니오",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          cancelPay(
                            buy.buyNo, // 결제 시퀀스 번호
                            buy.product.productNo, // 부분 취소를 위한 상품 번호
                            buy.payUid, // 주문 번호
                            buy.buyCount * buy.product.productPrice, // 부분 결제 취소 금액
                            setResult
                          );
                          navigate(`/mypage/buy-view/${buy.payUid}`);
                        } else {
                          navigate(`/mypage/buy-view/${buy.payUid}`);
                        }
                      });
                    }}
                  >
                    부분결제취소
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>구매 항목이 없습니다.</p>
        )}
      </div>

      {/* 배송 정보 */}
      {firstBuyInfo && (
        <div className="buy-delivery-view">
          <h4>배송 정보</h4>
          <p>수령인: {firstBuyInfo.pay.payName}</p>
          <p>
            주소: {firstBuyInfo.pay.payAddr1} {firstBuyInfo.pay.payAddr2}{" "}
            {firstBuyInfo.pay.payAddr3}
          </p>
          <p>총 결제 금액: {firstBuyInfo.pay.totalPrice}원</p>
        </div>
      )}
    </div>
  );
};

export default BuyView;
