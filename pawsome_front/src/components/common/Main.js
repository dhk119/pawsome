import { Link, useNavigate, useParams } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useState } from "react";
import "./default.css";
import BoardList from "../board/BoardList";
import Weather from "../utils/Weather";
import VideoList from "./VideoList";
import MarketViewNav from "./MarketViewNav";

const Main = () => {
  const params = useParams();
  const productNo = params.productNo;
  const [product, setProduct] = useState(params);
  const navigate = useNavigate();

  return (
    <section className="section" style={{ width: "100%" }}>
      <div className="search-wrap">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="search-input-wrap">
            <button type="submit" className="search-btn">
              <img src="/image/paw.png" className="search-icon" />
            </button>
            <input
              type="text"
              className="search-input"
              placeholder="검색어를 입력하세요"
            ></input>
          </div>
        </form>
      </div>
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
          <MarketViewNav />
          <>
            <Swiper
              slidesPerView={4}
              className="Swiper"
              pagination={{
                type: "fraction",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
            >
              <SwiperSlide>
                <img
                  src="/image/nursecat.png"
                  onClick={() => {
                    navigate(`/product/productDetail/${productNo}`);
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/image/nursecat.png"
                  onClick={() => {
                    navigate(
                      `/market/main/productDetail/${product.productNo}/detail`
                    );
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/image/nursecat.png"
                  onClick={() => {
                    navigate(
                      `/market/main/productDetail/${product.productNo}/detail`
                    );
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/image/nursecat.png"
                  onClick={() => {
                    navigate(
                      `/market/main/productDetail/${product.productNo}/detail`
                    );
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/image/nursecat.png"
                  onClick={() => {
                    navigate(
                      `/market/main/productDetail/${product.productNo}/detail`
                    );
                  }}
                />
              </SwiperSlide>
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

export default Main;
