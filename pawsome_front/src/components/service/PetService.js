import React from "react";
import { Link } from "react-router-dom";

const PetService = () => {
  return (
    <div>
      <nav className="nav type-nav">
        <ul>
          <li>
            <Link to="/service/allMap">반려동물 시설 검색</Link>
          </li>
          <li>
            <Link to="/service/mbti">멍BTI</Link>
          </li>
          <li>
            <Link to="/service/feedSuggest">사료추천</Link>
          </li>
          <li>
            <Link to="/service/recordList">반려동물 등록 조회</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PetService;
