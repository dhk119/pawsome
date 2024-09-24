import { Link, useNavigate, useParams } from "react-router-dom";
import { BsBox } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import MainNav from "./MainNav";

const ProductList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [productList, setProductList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [totalCount, setTotalCount] = useState();
  const params = useParams();
  const [typeCategory, setTypeCategory] = useState(0);
  const [mainCategory, setMainCategory] = useState("all");
  const changeType = (e) => {
    setTypeCategory(e.target.id);
    setMainCategory("all");
    /*addclass now */
  };
  console.log(typeCategory);
  const changeMain = (e) => {
    setMainCategory(e.target.id);
  };
  console.log(mainCategory);
  useEffect(() => {
    axios
      .get(
        `${backServer}/product/productList/${typeCategory}/${mainCategory}/${reqPage}`
      )
      .then((res) => {
        console.log(res);
        setProductList(res.data.list);
        setPi(res.data.pi);
        setTotalCount(res.data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [typeCategory, mainCategory, reqPage]);
  return (
    <section className="section productList-wrap">
      <MainNav changeMain={changeMain} changeType={changeType} />
      <div className="best-item"></div>
      <div className="page-title">
        {mainCategory === "feed"
          ? "사료"
          : mainCategory === "snack"
          ? "간식"
          : mainCategory === "nutrient"
          ? "영양제"
          : mainCategory === "tableware"
          ? "식기용품"
          : mainCategory === "hygiene"
          ? "위생용품"
          : mainCategory === "toy"
          ? "장난감"
          : mainCategory === "fashion"
          ? "패션"
          : mainCategory === "house"
          ? "하우스"
          : "전체"}
      </div>
      <div className="productList-title">
        <div className="productList-category">
          <Link to="#">
            {typeCategory === "1"
              ? "댕댕이"
              : typeCategory === "2"
              ? "냥냥이"
              : "전체"}
          </Link>
          <span> {">"} </span>
          <Link to="#">
            {mainCategory === "feed"
              ? "사료"
              : mainCategory === "snack"
              ? "간식"
              : mainCategory === "nutrient"
              ? "영양제"
              : mainCategory === "tableware"
              ? "식기용품"
              : mainCategory === "hygiene"
              ? "위생용품"
              : mainCategory === "toy"
              ? "장난감"
              : mainCategory === "fashion"
              ? "패션"
              : mainCategory === "house"
              ? "하우스"
              : "전체"}
          </Link>
        </div>
        <div className="productList-filter">
          <div className="number">
            <span className="icon">
              <BsBox />
            </span>
            <span className="text">
              총 {totalCount}개의 상품이 검색되었습니다.
            </span>
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
    </section>
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
        navigate(`/market/productDetail/${product.productNo}/detail`);
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
