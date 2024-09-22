import { Link } from "react-router-dom";
import { BsBox } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const ProductList = () => {
  return (
    <>
      <div className="page-title">전체</div>
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
        {/* navigate로 click => 상품 번호 같이 넘겨주는 걸로(주소창에 변경있게) */}
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
    </>
  );
};

export default ProductList;
