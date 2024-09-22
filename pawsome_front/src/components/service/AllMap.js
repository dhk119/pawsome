import { Link } from "react-router-dom";
import Map from "../board/Map";

const AllMap = () => {
  return (
    <>
      <nav className="nav type-nav">
        <ul>
          <li>
            <Link to="#">동물병원</Link>
          </li>
          <li>
            <Link to="#">애견용품</Link>
          </li>
          <li>
            <Link to="#">애견호텔</Link>
          </li>
          <li>
            <Link to="#">산책공원</Link>
          </li>
        </ul>
      </nav>
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
            width: "1200px",
            height: "600px",
          }}
        >
          <Map />
        </div>
      </div>
    </>
  );
};

export default AllMap;
