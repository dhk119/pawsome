import { Link } from "react-router-dom";
import Map from "../board/Map";

const AllMap = () => {
  return (
    <div className="map-container">
      <Link to="/service/petService" style={{ color: "#ffa518" }}>
        메인으로
      </Link>
      <nav className="nav-box">
        <ul>
          <li className="nav-btn">
            <Link to="#">동물병원</Link>
          </li>
          <li className="nav-btn">
            <Link to="#">애견용품</Link>
          </li>
          <li className="nav-btn">
            <Link to="#">애견호텔</Link>
          </li>
          <li className="nav-btn">
            <Link to="#">산책공원</Link>
          </li>
        </ul>
      </nav>
      <div style={{ textAlign: "center", color: "#FFa518" }}>
        <h3>
          검색하실때 주변 지하철역이나 **동,**구를 이용해 검색해주세요. "예)당산
          동물병원,영등포구 동물병원"
        </h3>
      </div>
      <div
        id="map-box"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          id="map"
          style={{
            width: "1400px",
            height: "700px",
          }}
        >
          <Map />
        </div>
      </div>
    </div>
  );
};

export default AllMap;
