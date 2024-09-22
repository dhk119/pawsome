import { useState } from "react";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const tabArr = [
    { name: "상세정보", content: "상품 상세정보" },
    { name: "상품평", content: "상품 리뷰" },
    { name: "상품문의", content: "상품 Q&A" },
    { name: "주문/배송 안내", content: "주문/배송 안내" },
  ];
  const selectTapHandler = (index) => {
    setCurrentTab(index);
  };
  return (
    <div className="productDetail-wrap">
      <div className="productDetail">
        <div className="product-thumb">
          <img src="/image/basicimage.png" />
        </div>
        <div className="product-info">
          <div className="product-category">
            <Link to="#">전체</Link>
            <span> {">"} </span>
            <Link to="#">사료</Link>
          </div>
          <div className="product-name">상품명</div>
          <div className="product-price">상품금액</div>
          <div className="product-amount">수량</div>
          <div className="product-totalprice">총 금액</div>
          <div className="product-btn">
            <button>장바구니 담기</button>
            <button>바로 구매</button>
            <button>관심상품</button>
          </div>
        </div>
      </div>
      <div className="detail-menu-wrap">
        {tabArr.map((item, index) => {
          return (
            <li
              key={index}
              className={currentTab === index ? "tab active-tab" : "tab"}
              onClick={() => selectTapHandler(index)}
            >
              {item.name}
            </li>
          );
        })}
      </div>
      <div className="tab-content">
        <span>{tabArr[currentTab].content}</span>
      </div>
      {/*
          <div className="tab">
            <div>상세정보</div>
            <div>상품평</div>
            <div>상품문의</div>
            <div>주문/배송 안내</div>
          </div>
          <div className="tab-content">
            <div className="product-detail">
              <span>상품 상세정보</span>
            </div>
            <div className="product-review">
              <span>리뷰</span>
            </div>
            <div className="product-qna">
              <span>qna</span>
            </div>
            <div className="product-guide">
              <spna>주문/배송 안내</spna>
            </div>
          </div>
          */}
    </div>
  );
};

export default ProductDetail;
