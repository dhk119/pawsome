import { useEffect, useState } from "react";
import { loginEmailState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";

const BuyList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [buyList, setBuyList] = useState([]);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const navigate = useNavigate();

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(2); // '2024' -> '24'
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 1월은 0이므로 +1
    const day = String(date.getDate()).padStart(2, "0"); // 두 자리로 맞춤
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="buy-list-wrap">
      <h1>구매내역</h1>
      <div className="buy-list-container">
        {buyList.length > 0 ? (
          buyList.map((item) => (
            <div key={item.buyNo} className="buy-item-card">
              {/* 날짜와 상세보기 버튼 */}
              <div className="buy-list-header">
                <div className="buy-list-date">
                  {formatDate(item.pay.payDate)}
                </div>
                <div className="view-details-button">
                  <button
                    className="btn-details"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/mypage/buy-view/${item.buyNo}`);
                    }}
                  >
                    상세보기 <GoChevronRight />
                  </button>
                </div>
              </div>

              {/* 배송 상태 */}
              <div className="buy-state">
                {item.buyState === 1
                  ? "결제완료"
                  : item.buyState === 2
                  ? "결제취소"
                  : item.buyState === 3
                  ? "배송중"
                  : "배송완료"}
              </div>

              {/* 제품 이미지 및 정보 */}
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
                  <p>{formatPrice(item.product.productPrice)}원</p>
                  <p>{item.buyCount}개</p>
                </div>
              </div>

              {/* 추가 버튼 (배송 조회, 리뷰 작성) */}
              <div className="buy-item-footer">
                <div className="buy-action-buttons">
                  {item.buyState === 3 ? (
                    <button className="btn btn-track">배송 조회</button>
                  ) : item.buyState === 4 ? (
                    <button
                      className="btn btn-review"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/market/main/productDetail/${item.product.productNo}/review`
                        );
                      }}
                    >
                      리뷰 작성
                    </button>
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
