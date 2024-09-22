import { Link, Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import "./market.css";
import ProductDetail from "./ProductDetail";

const MarketMain = () => {
  return (
    <section className="section productList-wrap">
      <nav className="nav type-nav">
        <ul>
          <li>
            <Link to="#">전체</Link>
          </li>
          <li>
            <Link to="#">댕댕이</Link>
          </li>
          <li>
            <Link to="#">냥냥이</Link>
          </li>
        </ul>
      </nav>
      <nav className="nav main-nav">
        <ul>
          <li>
            <Link to="#">전체</Link>
          </li>
          <li>
            <Link to="#">사료</Link>
          </li>
          <li>
            <Link to="#">간식</Link>
          </li>
          <li>
            <Link to="#">영양제</Link>
          </li>
          <li>
            <Link to="#">식기용품</Link>
          </li>
          <li>
            <Link to="#">위생용품</Link>
          </li>
          <li>
            <Link to="#">장난감</Link>
          </li>
          <li>
            <Link to="#">패션</Link>
          </li>
          <li>
            <Link to="#">하우스</Link>
          </li>
        </ul>
      </nav>
      <div className="best-item"></div>
      <Routes>
        <Route path="productList" element={<ProductList />}></Route>;
        <Route path="productDetail/*" element={<ProductDetail />}></Route>
        {/*별처리 해주어야 서브라우팅 사용 가능 (하위에서 전환가능하게)*/}
      </Routes>
    </section>
  );
};

export default MarketMain;
