import React from "react";
import { Link } from "react-router-dom";
import "./service.css";

const PetService = () => {
  return (
    <div>
      <nav className="nav-box">
        <ul>
          <li className="nav-btn">
            <Link to="/service/allMap">반려동물 시설 검색</Link>
          </li>
          <li className="nav-btn">
            <Link to="/service/mbti">멍BTI</Link>
          </li>
          <li className="nav-btn">
            <Link to="/service/feedSuggest">사료추천</Link>
          </li>
          <li className="nav-btn">
            <Link to="/service/recordList">반려동물 등록 조회</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PetService;
