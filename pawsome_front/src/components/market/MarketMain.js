import { Link, Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import "./market.css";
import ProductDetail from "./ProductDetail";
import { useState } from "react";

const MarketMain = () => {
  const [typeCategory, setTypeCategory] = useState(0);
  const [mainCategory, setMainCategory] = useState(0);
  const changeType = (e) => {
    setTypeCategory(e.target.id);
    setMainCategory(0);
    /*addclass now */
  };
  console.log(typeCategory);
  const changeMain = (e) => {
    setMainCategory(e.target.id);
  };
  console.log(mainCategory);
  return (
    <section className="section productList-wrap">
      <nav className="nav type-nav">
        <ul>
          <li>
            <span onClick={changeType} id="0">
              전체
            </span>
          </li>
          <li>
            <span onClick={changeType} id="1">
              댕댕이
            </span>
          </li>
          <li>
            <span onClick={changeType} id="2">
              냥냥이
            </span>
          </li>
        </ul>
      </nav>
      <nav className="nav main-nav">
        <ul>
          <li>
            <span onClick={changeMain} id="0">
              전체
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="1">
              사료
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="2">
              간식
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="3">
              영양제
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="4">
              식기용품
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="5">
              위생용품
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="6">
              장난감
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="7">
              패션
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="8">
              하우스
            </span>
          </li>
        </ul>
      </nav>
      <div className="best-item"></div>
      <Routes>
        <Route
          path="productList/:typeCategory/:mainCategory/*"
          element={<ProductList />}
        />
        {/*별처리 해주어야 서브라우팅 사용 가능 (하위에서 전환가능하게)*/}
        <Route path="productDetail/:productNo/*" element={<ProductDetail />} />
      </Routes>
    </section>
  );
};

export default MarketMain;
