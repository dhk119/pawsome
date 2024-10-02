import { Link, useNavigate, useParams } from "react-router-dom";
import { BsBox } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollToTop from "react-scroll-to-top";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ProductList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [productList, setProductList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [totalCount, setTotalCount] = useState();
  const params = useParams();
  const typeCategory = params.typeCategory;
  const mainCategory = params.mainCategory;
  const [filterType, setFilterType] = useState(1);

  useEffect(() => {
    axios
      .get(
        `${backServer}/product/productList/${typeCategory}/${mainCategory}/${reqPage}/${filterType}`
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
  }, [typeCategory, mainCategory, reqPage, filterType]);

  const changeFilterType = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <>
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
              {"  "}총 {totalCount}개의 상품이 검색되었습니다.
            </span>
          </div>
          <div className="filter">
            <FormControl sx={{ m: 1, minWidth: 140 }}>
              <Select
                id="select"
                value={filterType}
                onChange={changeFilterType}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={1}>최신순</MenuItem>
                <MenuItem value={2}>낮은 가격순</MenuItem>
                <MenuItem value={3}>높은 가격순</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="productList-content">
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
        navigate(`/market/main/productDetail/${product.productNo}/detail`);
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
        />
      </div>
      <div className="product-info">
        <div className="product-name">{product.productName}</div>
        <div className="product-price">{product.productPrice}</div>
      </div>
    </div>
  );
};

export default ProductList;
