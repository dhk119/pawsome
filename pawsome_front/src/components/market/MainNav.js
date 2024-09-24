import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import { useState } from "react";

const MainNav = () => {
  const [typeCategory, setTypeCategory] = useState(0);
  const [mainCategory, setMainCategory] = useState("all");
  const navigate = useNavigate();
  const changeType = (e) => {
    setTypeCategory(e.target.id);
    setMainCategory("all");
    navigate(`/market/main/productList/${e.target.id}/all`);
  };
  const changeMain = (e) => {
    setMainCategory(e.target.id);
    navigate(`/market/main/productList/${typeCategory}/${e.target.id}`);
  };

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
            <span onClick={changeMain} id="all">
              전체
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="feed">
              사료
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="snack">
              간식
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="nutrient">
              영양제
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="tableware">
              식기용품
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="hygiene">
              위생용품
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="toy">
              장난감
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="fashion">
              패션
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="house">
              하우스
            </span>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="productList/:typeCategory/:mainCategory"
          element={<ProductList />}
        />
        <Route path="productDetail/:productNo/*" element={<ProductDetail />} />
      </Routes>
    </section>
  );
};

export default MainNav;
