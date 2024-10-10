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
    <div>
      <nav className="nav-box">
        <ul>
          <li className="nav-btn">
            <Link to="/service/PetService">전체</Link>
          </li>
          <li className="nav-btn">
            <Link to="/service/allMap">시설검색</Link>
          </li>
          <li className="nav-btn">
            <Link to="/service/mbti">멍BTI</Link>
          </li>
          <li className="nav-btn">
            <Link to="/service/healthTest">건강체크</Link>
          </li>
        </ul>
      </nav>
      <div className="service-container">
        <div style={{ position: "relative" }}>
          <img
            src="/image/service/serviceHeader.png"
            style={{ width: "1200px", position: "relative" }}
          />
          <button className="sm-btn1" onClick={buttonClick1}></button>
          <button className="sm-btn2" onClick={buttonClick2}></button>
          <button className="sm-btn3" onClick={buttonClick3}></button>
        </div>
      </div>
    </div>
  );
};

export default PetService;
