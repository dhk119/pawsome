import { Link, Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import { useState } from "react";

const MainNav = (props) => {
  const changeMain = props.changeMain;
  const changeType = props.changeType;
  return (
    <>
      <nav className="nav type-nav">
        <ul>
          <li>
            <span onClick={changeType} id="0">
              전체
            </span>
          </li>
          <li>
            <span onClick={changeType} id="1">
              댕댕이
            </span>
          </li>
          <li>
            <span onClick={changeType} id="2">
              냥냥이
            </span>
          </li>
        </ul>
      </nav>
      <nav className="nav main-nav">
        <ul>
          <li>
            <span onClick={changeMain} id="all">
              전체
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="feed">
              사료
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="snack">
              간식
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="nutrient">
              영양제
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="tableware">
              식기용품
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="hygiene">
              위생용품
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="toy">
              장난감
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="fashion">
              패션
            </span>
          </li>
          <li>
            <span onClick={changeMain} id="house">
              하우스
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MainNav;
