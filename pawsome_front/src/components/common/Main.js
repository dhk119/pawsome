import { Link } from "react-router-dom";
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
          <p>반려동물과 함께한 즐거운 시간들을 함께 공유하고 즐겨보세요</p>
        </div>
        <div className="commercial-image">
          <img src="/image/mainpet2.jpg" />
        </div>
      </div>
      <div className="map-wrap">
        <div className="page-title">
          <span className="material-icons">pets</span>
          <span>동물병원</span>
          <p>#가까운 동물병원을 찾아보세요~</p>
        </div>
        <div>
          <Link>
            <div
              style={{
                width: "100%",
                height: "279px",
                backgroundColor: "#5799ff",
              }}
            >
              <img src="#"></img>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Main;
