import { useEffect, useState } from "react";
import { loginEmailState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import axios from "axios";

const BuyList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [buyList, setBuyList] = useState([]);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);

  useEffect(() => {
    if (loginEmail) {
      axios
        .get(`${backServer}/member/selectBuyList/${loginEmail}`)
        .then((res) => {
          setBuyList(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loginEmail, backServer]);

  return (
    <div className="buy-list-wrap">
      <h1>구매내역</h1>
      <div className="buy-list-container">
        {buyList.length > 0 ? (
          buyList.map((item) => (
            <div key={item.buyNo} className="buy-item-card">
              <div>{item.pay.payDate}</div>
              <div className="buy-item-header">
                <img
                  src={
                    item.product.productThumb
                      ? `${backServer}/product/thumb/${item.product.productThumb}`
                      : "/image/basicimage.png"
                  }
                  alt={item.product.productName}
                  className="product-thumbnail"
                />
                <div className="buy-item-info">
                  <h3>{item.product.productName}</h3>
                  <p>가격: {item.product.productPrice}원</p>
                  <p>수량: {item.buyCount}</p>
                </div>
              </div>
              <div className="buy-item-footer">
                <span
                  className={`buy-state ${
                    item.buyState === 3
                      ? "shipping"
                      : item.buyState === 4
                      ? "delivered"
                      : ""
                  }`}
                >
                  {item.buyState === 1
                    ? "결제완료"
                    : item.buyState === 2
                    ? "결제취소"
                    : item.buyState === 3
                    ? "배송중"
                    : "배송완료"}
                </span>
                <div className="buy-action-buttons">
                  {item.buyState === 3 ? (
                    <button className="btn btn-track">배송 조회</button>
                  ) : item.buyState === 4 ? (
                    <button className="btn btn-review">리뷰 작성</button>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-purchases">구매 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default BuyList;
