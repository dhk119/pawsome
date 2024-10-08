import { Link, useNavigate, useParams } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import "./default.css";
import BoardList from "../board/BoardList";
import Weather from "../utils/Weather";
import VideoList from "./VideoList";
import { loginEmailState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Main = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [product, setProduct] = useState("");
  const navigate = useNavigate();
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [like, setLike] = useState(false);
  const [productList, setProductList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const changeSearchKeyWord = (e) => {
    setSearchKeyWord(e.target.value);
  };
  useEffect(() => {
    axios
      .get(`${backServer}/product/mainMarketList`)
      .then((res) => {
        console.log(res);
        setProductList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="section" style={{ width: "100%" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="search-wrap">
          <div className="search-input-wrap">
            <button
              className="search-btn"
              onClick={() => {
                navigate(`/searchResult/${searchKeyWord}`);
              }}
            >
              <img src="/image/paw.png" className="search-icon" />
            </button>
            <input
              type="text"
              className="search-input"
              placeholder="검색어를 입력하세요"
              value={searchKeyWord}
              onChange={changeSearchKeyWord}
            ></input>
          </div>
        </div>
      </form>
      <div className="commercial-wrap">
        <div className="commercial-text">
          <span>반려동물과 행복한 시간!</span>
          <br />
          <span>PAWSOME에서 함께하세요.</span>
          <br />
          <br />
          <p>반려동물과 함께한 즐거운 시간들을 공유하고 즐겨보세요.</p>
        </div>
        <div className="commercial-image">
          <img src="/image/mainpet2.jpg" />
        </div>
      </div>
      <div className="map-wrap">
        <div className="map-title">
          <span>
            <span
              className="material-icons"
              style={{ color: "#ffa518", marginRight: "15px" }}
            >
              pets
            </span>
            동물병원
          </span>
          <span>#가까운 동물병원을 찾아보세요</span>
        </div>
        <div>
          <Link to="/board/map">
            <div
              style={{
                width: "90%",
                height: "402px",
                backgroundColor: "#ffbe58",
                marginLeft: "80px",
              }}
            >
              <img src="/image/nursecat.png" />
              <img src="/image/map.png" style={{ marginRight: "210px" }} />
              <img src="/image/doctordog.png" />
            </div>
          </Link>
        </div>
      </div>
      <div className="api-wrap">
        <div className="weather-title" style={{ marginLeft: "90px" }}>
          <span>
            <span
              className="material-icons"
              style={{ color: "#ffa518", marginRight: "15px" }}
            >
              pets
            </span>
            날씨
          </span>
          <span>#산책 전에 날씨를 확인해 보세요</span>
        </div>
        <div className="weather-wrap">
          <Weather />
        </div>
      </div>
      <div className="api-wrap">
        <div className="weather-title" style={{ marginLeft: "90px" }}>
          <span>
            <span
              className="material-icons"
              style={{ color: "#ffa518", marginRight: "15px" }}
            >
              pets
            </span>
            반려동물 SHORTS
          </span>
          <span>#재미난 영상을 확인해 보세요</span>
        </div>
        <VideoList />
      </div>
      <div className="market-preview-wrap">
        <div className="market-main-title">
          <span>
            <span
              className="material-icons"
              style={{ color: "#ffa518", marginRight: "15px" }}
            >
              pets
            </span>
            마켓
            <Link
              className="market-all-btn"
              to="/market/main/productList/0/all"
            >
              전체보기
            </Link>
          </span>
          <span style={{ fontSize: "16px", fontWeight: "200" }}>
            #산책 전에 날씨를 확인해 보세요
          </span>
        </div>
        <div className="main-swiper">
          <>
            <Swiper
              slidesPerView={5}
              className="Swiper"
              pagination={{
                type: "fraction",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
            >
              {productList.map((product, i) => (
                <SwiperSlide
                  key={`product-${product.productNo}`}
                  style={{ backgroundColor: "#" }}
                >
                  <ProductItem
                    product={product}
                    loginEmail={loginEmail}
                    setLoginEmail={setLoginEmail}
                    setLike={setLike}
                    like={like}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        </div>
      </div>
      <div className="board-all-for-main">
        <div className="board-all-title">
          <span>
            <span
              className="material-icons"
              style={{ color: "#ffa518", marginRight: "15px" }}
            >
              pets
            </span>
            와글와글 커뮤니티
          </span>
          <span>#커뮤니티를 둘러보세요</span>
        </div>
        <div className="board_main">
          <BoardList />
        </div>
      </div>
      <div className="up-btn">
        <ScrollToTop smooth />
      </div>
    </section>
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
  };

  return (
    <div className="product-wrap" style={{ borderRadius: "10px" }}>
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
      <div className="product-info">
        <div className="product-name">{product.productName}</div>
        <div className="product-price">{product.productPrice}</div>
      </div>
    </div>
  );
};
export default Main;
