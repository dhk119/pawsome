import { useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Detail from "./tabComponent/Detail";
import Review from "./tabComponent/Review";
import Qna from "./tabComponent/Qna";
import Guide from "./tabComponent/Guide";
import "./tab.css";

const ProductDetail = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const tabArr = [
    { name: "상세정보", content: "상품 상세정보", url: "detail" },
    { name: "상품평", content: "상품 리뷰", url: "review" },
    { name: "상품문의", content: "상품 Q&A", url: "qna" },
    { name: "주문/배송 안내", content: "주문/배송 안내", url: "guide" },
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
            <Link to="#">장바구니 담기</Link>
            <Link to="#">바로 구매</Link>
            <Link to="#">관심상품</Link>
          </div>
        </div>
      </div>
      <div className="detail-menu-wrap">
        {tabArr.map((item, index) => {
          return (
            <NavLink key={index} to={item.url}>
              <li
                className={currentTab === index ? "tab active-tab" : "tab"}
                onClick={() => selectTapHandler(index)}
              >
                {item.name}
              </li>
            </NavLink>
          );
        })}
      </div>
      <div className="tab-content">
        {/* <span>{tabArr[currentTab].content}</span> */}
        <Routes>
          <Route path="detail" element={<Detail />} />
          <Route path="review" element={<Review />} />
          <Route path="qna" element={<Qna />} />
          <Route path="guide" element={<Guide />} />
        </Routes>
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
