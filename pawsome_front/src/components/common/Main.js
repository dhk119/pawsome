import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useState } from "react";
const Main = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  let appendNumber = 4;
  let prependNumber = 1;

  const prepend2 = () => {
    swiperRef.prependSlide([
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
    ]);
  };

  const prepend = () => {
    swiperRef.prependSlide(
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>"
    );
  };

  const append = () => {
    swiperRef.appendSlide(
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>"
    );
  };

  const append2 = () => {
    swiperRef.appendSlide([
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
    ]);
  };
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
                width: "100%",
                height: "402px",
                backgroundColor: "#ffbe58",
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
        <div className="weather-wrap">날씨 api 자리</div>
        <div className="video-wrap">동영상 api 자리</div>
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
          </span>
          <Link to="/market/main/productList/0/all">전체보기</Link>
          <div className="main-swiper">
            {/* <>
              <Swiper
                onSwiper={setSwiperRef}
                slidesPerView={3}
                centeredSlides={true}
                spaceBetween={30}
                pagination={{
                  type: "fraction",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
              </Swiper>
            </> */}
          </div>
        </div>
      </div>
      <div className="up-btn">
        <ScrollToTop smooth />
      </div>
    </section>
  );
};

export default Main;
