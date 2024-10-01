import React from "react";
import { Link } from "react-router-dom";
import "./service.css";

const PetService = () => {
  return (
    <div className="service-container">
      <nav className="nav-box">
        <ul>
          <li className="nav-btn">
            <Link to="/service/allMap">반려동물 시설 검색</Link>
          </li>
          <li className="nav-btn">
            <Link to="/service/mbti">멍BTI</Link>
          </li>
          <li className="nav-btn">
            <Link to="/service/healthTest">건강체크</Link>
          </li>
          <li className="nav-btn">
            <Link to="/service/recordList">반려동물 등록 조회</Link>
          </li>
        </ul>
      </nav>
      <img src="/image/service/ServiceHeader.png" style={{ width: "1200px" }} />
    </div>
  );
};

export default PetService;
