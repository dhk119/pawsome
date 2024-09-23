import { Link, useNavigate } from "react-router-dom";
import { BsBox } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [productList, setProductList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  useEffect(() => {
    axios
      .get(`${backServer}/market/productList/${reqPage}`)
      .then((res) => {
        console.log(res);
        setProductList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
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

        {productList.map((product, i) => {
          return <ProductItem key={"product-" + i} product={product} />;
        })}
      </div>
    </>
  );
};

const ProductItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const product = props.product;
  const navigate = useNavigate();
  return (
    <div
      className="product-wrap"
      onClick={() => {
        navigate(`/market/productDetail/${product.productNo}`);
      }}
    >
      <div className="product-thumb">
        <div className="product-like">
          <FaRegHeart />
        </div>
        <img
          src={
            product.productThumb
              ? `${backServer}/product/thumb/${product.productThumb}`
              : "/image/basicimage.png"
          }
        ></img>
      </div>
      <div className="product-info">
        <div className="product-name">{product.productName}</div>
        <div className="product-price">{product.productPrice}</div>
      </div>
    </div>
  );
};

export default ProductList;
