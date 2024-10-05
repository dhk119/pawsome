import React from "react";
import { Link } from "react-router-dom";
import "./service.css";
import { useNavigate } from "react-router-dom";

const PetService = () => {
  const navigate = useNavigate();
  const buttonClick1 = () => {
    navigate("/service/allMap");
  };
  const buttonClick2 = () => {
    navigate("/service/mbti");
  };
  const buttonClick3 = () => {
    navigate("/service/healthTest");
  };
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
        </ul>
      </nav>
      <div style={{ position: "relative" }}>
        <img
          src="/image/service/serviceHeader.png"
          style={{ width: "1200px", position: "relative" }}
        />
        <button className="sm-btn1" onClick={buttonClick1}>
          지도
        </button>
        <button className="sm-btn2" onClick={buttonClick2}>
          멍BTI
        </button>
        <button className="sm-btn3" onClick={buttonClick3}>
          건강체크
        </button>
      </div>
    </div>
  );
};

export default PetService;
