import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // useParams를 추가

const BuyView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [buy, setBuy] = useState({});
  const { buyNo } = useParams();

  useEffect(() => {
    if (buyNo) {
      axios
        .get(`${backServer}/member/selectBuyList/${buyNo}`)
        .then((res) => {
          setBuy(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [buyNo, backServer]);

  return (
    <>
      <div className="buy-view-wrap">
        <div>주문번호: </div>
        {/* 상품정보 */}
        <div className="buy-wrap">
          <div>
            <div>상품명: </div>
          </div>
          <div>
            <div>주문상태: </div>
            <div>
              <div>
                <img alt="상품사진" />
              </div>
              <div>
                <div>이름</div>
                <div>가격</div>
              </div>
            </div>
            <div>
              <button>취소하기</button>
              <button>문의하기</button>
            </div>
          </div>
        </div>
        {/* 배송 정보 */}
        <div>
          <div>배송정보</div>
          <div>수령인</div>
          <div>휴대폰</div>
          <div>주소</div>
        </div>
        {/* 결제 내역 */}
        <div>
          <div>상품 금액</div>
        </div>
      </div>
    </>
  );
};

export default BuyView;
