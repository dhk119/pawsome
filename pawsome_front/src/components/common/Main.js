import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
const Main = () => {
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
          <Link to="#">
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
      <div className="market-preview-wrap"></div>
      <div className="up-btn">
        <ScrollToTop smooth />
      </div>
    </section>
  );
};

export default Main;
