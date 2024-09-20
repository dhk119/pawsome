import { Link } from "react-router-dom";

const ProductList = () => {
  return (
    <section className="section product-list">
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
    </section>
  );
};

export default ProductList;
