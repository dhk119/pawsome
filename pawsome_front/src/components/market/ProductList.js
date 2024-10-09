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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import ScrollPage from "../utils/ScrollPage";
import Swal from "sweetalert2";

const ProductList = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [productList, setProductList] = useState([]);
  const reqPage = props.reqPage;
  const setReqPage = props.setReqPage;
  const [pi, setPi] = useState({});
  const [totalCount, setTotalCount] = useState();
  const params = useParams();
  const typeCategory = params.typeCategory;
  const mainCategory = params.mainCategory;
  const [filterType, setFilterType] = useState(1);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [like, setLike] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${backServer}/product/productList/${typeCategory}/${mainCategory}/${reqPage}/${filterType}/${loginEmail}`
      )
      .then((res) => {
        console.log(res);
        if (reqPage != 1) {
          const array = productList.concat(res.data.list);
          setProductList(array);
        } else {
          setProductList(res.data.list);
        }
        setPi(res.data.pi);
        setTotalCount(res.data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginEmail, typeCategory, mainCategory, reqPage, filterType, like]);

  const changeFilterType = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <>
      <div className="best-item">
        <>
          <Swiper
            pagination={true}
            loop={true}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 4000 }}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src="/image/swiper/swiper7.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/image/swiper/swiper8.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/image/swiper/swiper9.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/image/swiper/swiper10.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/image/swiper/swiper6.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/image/swiper/swiper5.jpg" />
            </SwiperSlide>
          </Swiper>
        </>
      </div>
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
          return (
            <ProductItem
              key={"product-" + i}
              product={product}
              loginEmail={loginEmail}
              setLoginEmail={setLoginEmail}
              setLike={setLike}
              like={like}
            />
          );
        })}
      </div>
      {reqPage !== pi.totalPage ? (
        <ScrollPage pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      ) : (
        ""
      )}
    </>
  );
};

const ProductItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const product = props.product;
  const loginEmail = props.loginEmail;
  const navigate = useNavigate();
  const like = props.like;
  const setLike = props.setLike;
  const likePush = () => {
    if (loginEmail === "test") {
      Swal.fire({
        title: "로그인 필요",
        text: "로그인 후 다시 시도해주세요",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#ffa518",
        confirmButtonText: "로그인페이지 이동",
        cancelButtonText: "계속 구경하기",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      axios
        .post(`${backServer}/product/changeLike/${loginEmail}`, product)
        .then((res) => {
          console.log(res);
          if (res.data == 3) {
            //insert됨
            product.isLike = 1;
          } else if (res.data == 2) {
            //delete됨
            product.isLike = 0;
          }
          setLike(!like);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="product-wrap">
      <div className="product-thumb">
        <div className="product-like" onClick={likePush}>
          {product.isLike == 1 ? <FaHeart /> : <FaRegHeart />}
        </div>
        <img
          src={
            product.productThumb
              ? `${backServer}/product/thumb/${product.productThumb}`
              : "/image/basicimage.png"
          }
          onClick={() => {
            navigate(`/market/main/productDetail/${product.productNo}/detail`);
          }}
        />
      </div>
      <div
        className="product-info"
        onClick={() => {
          navigate(`/market/main/productDetail/${product.productNo}/detail`);
        }}
      >
        <div className="product-name">{product.productName}</div>
        <div className="product-price">{product.productPrice}</div>
      </div>
    </div>
  );
};

export default ProductList;
