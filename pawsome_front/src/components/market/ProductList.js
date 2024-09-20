import { Link } from "react-router-dom";
import { BsBox } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const ProductList = () => {
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
      <div className="productList-title">
        <div className="productList-category">
          <Link to="#">전체</Link>
          <span> {">"} </span>
          <Link to="#">전체</Link>
          <span> {">"} </span>
          <Link to="#">전체</Link>
        </div>
        <div className="productList-filter">
          <div className="number">
            <span className="icon">
              <BsBox />
            </span>
            <span className="text"> 총 nn개의 상품이 검색되었습니다.</span>
          </div>
          <div className="filter">
            <Link to="#" className="now">
              인기순
            </Link>
            <span>|</span>
            <Link to="#">최신순</Link>
            <span>|</span>
            <Link to="#">낮은 가격순</Link>
            <span>|</span>
            <Link to="#">높은 가격순</Link>
          </div>
        </div>
      </div>
      <div className="productList-content">
        <div className="product-wrap">
          <div className="product-thumb">
            <div className="product-like">
              <FaRegHeart />
            </div>
            <img src="/image/basicimage.png"></img>
          </div>
          <div className="product-info">
            <div className="product-name">상품명</div>
            <div className="product-price">상품가격</div>
          </div>
        </div>
        <div className="product-wrap">
          <div className="product-thumb">
            <div className="product-like">
              <FaRegHeart />
            </div>
            <img src="/image/basicimage.png"></img>
          </div>
          <div className="product-info">
            <div className="product-name">상품명</div>
            <div className="product-price">상품가격</div>
          </div>
        </div>
        <div className="product-wrap">
          <div className="product-thumb">
            <div className="product-like">
              <FaRegHeart />
            </div>
            <img src="/image/basicimage.png"></img>
          </div>
          <div className="product-info">
            <div className="product-name">상품명</div>
            <div className="product-price">상품가격</div>
          </div>
        </div>
        <div className="product-wrap">
          <div className="product-thumb">
            <div className="product-like">
              <FaRegHeart />
            </div>
            <img src="/image/basicimage.png"></img>
          </div>
          <div className="product-info">
            <div className="product-name">상품명</div>
            <div className="product-price">상품가격</div>
          </div>
        </div>
        <div className="product-wrap">
          <div className="product-thumb">
            <div className="product-like">
              <FaRegHeart />
            </div>
            <img src="/image/basicimage.png"></img>
          </div>
          <div className="product-info">
            <div className="product-name">상품명</div>
            <div className="product-price">상품가격</div>
          </div>
        </div>
        <div className="product-wrap">
          <div className="product-thumb">
            <div className="product-like">
              <FaRegHeart />
            </div>
            <img src="/image/basicimage.png"></img>
          </div>
          <div className="product-info">
            <div className="product-name">상품명</div>
            <div className="product-price">상품가격</div>
          </div>
        </div>
        <div className="product-wrap">
          <div className="product-thumb">
            <div className="product-like">
              <FaRegHeart />
            </div>
            <img src="/image/basicimage.png"></img>
          </div>
          <div className="product-info">
            <div className="product-name">상품명</div>
            <div className="product-price">상품가격</div>
          </div>
        </div>
        <div className="product-wrap">
          <div className="product-thumb">
            <div className="product-like">
              <FaRegHeart />
            </div>
            <img src="/image/basicimage.png"></img>
          </div>
          <div className="product-info">
            <div className="product-name">상품명</div>
            <div className="product-price">상품가격</div>
          </div>
        </div>
        <div className="product-wrap">
          <div className="product-thumb">
            <div className="product-like">
              <FaRegHeart />
            </div>
            <img src="/image/basicimage.png"></img>
          </div>
          <div className="product-info">
            <div className="product-name">상품명</div>
            <div className="product-price">상품가격</div>
          </div>
        </div>
        <div className="product-wrap">
          <div className="product-thumb">
            <div className="product-like">
              <FaRegHeart />
            </div>
            <img src="/image/basicimage.png"></img>
          </div>
          <div className="product-info">
            <div className="product-name">상품명</div>
            <div className="product-price">상품가격</div>
          </div>
        </div>
        <div className="product-wrap">
          <div className="product-thumb">
            <div className="product-like">
              <FaRegHeart />
            </div>
            <img src="/image/basicimage.png"></img>
          </div>
          <div className="product-info">
            <div className="product-name">상품명</div>
            <div className="product-price">상품가격</div>
          </div>
        </div>
        <div className="product-wrap">
          <div className="product-thumb">
            <div className="product-like">
              <FaRegHeart />
            </div>
            <img src="/image/basicimage.png"></img>
          </div>
          <div className="product-info">
            <div className="product-name">상품명</div>
            <div className="product-price">상품가격</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
