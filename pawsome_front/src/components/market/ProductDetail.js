import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import Detail from "./tabComponent/Detail";
import Review from "./tabComponent/Review";
import Qna from "./tabComponent/Qna";
import Guide from "./tabComponent/Guide";
import "./tab.css";
import axios from "axios";

const ProductDetail = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams(); //주소창에 데이터 가져오기
  const productNo = params.productNo;
  const [product, setProduct] = useState({});
  const [currentTab, setCurrentTab] = useState(0);
  useEffect(() => {
    axios
      .get(`${backServer}/product/productDetail/${productNo}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            <Link to="#">
              {product.typeCategory === "1"
                ? "댕댕이"
                : product.typeCategory === "2"
                ? "냥냥이"
                : "전체"}
            </Link>
            <span> {">"} </span>
            <Link to="#">
              {product.mainCategory === "feed"
                ? "사료"
                : product.mainCategory === "snack"
                ? "간식"
                : product.mainCategory === "nutrient"
                ? "영양제"
                : product.mainCategory === "tableware"
                ? "식기용품"
                : product.mainCategory === "hygiene"
                ? "위생용품"
                : product.mainCategory === "toy"
                ? "장난감"
                : product.mainCategory === "fashion"
                ? "패션"
                : "하우스"}
            </Link>
          </div>
          <div className="product-name">{product.productName}</div>
          <div className="product-price">{product.productPrice}원</div>
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
    </div>
  );
};

export default ProductDetail;
