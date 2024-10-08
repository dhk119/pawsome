import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BuyView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [buyList, setBuyList] = useState([]);
  const { payUid } = useParams();

  useEffect(() => {
    if (payUid) {
      axios
        .get(`${backServer}/member/selectOneBuy/${payUid}`)
        .then((res) => {
          console.log(res.data);
          setBuyList(res.data);
          console.log("구매정보 상세보기");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [payUid, backServer]);

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
                  alt={buy.product.productName} // alt 속성 추가
                />
                <div className="buy-view-price-info">
                  <h3>{buy.product.productName}</h3>
                  <p>{buy.product.productPrice}원</p>
                  <p>{buy.buyCount}개</p>
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
              {buy.buyState === 1 ? (
                <div>
                  <button>결제취소</button>
                </div>
              ) : (
                <></>
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
