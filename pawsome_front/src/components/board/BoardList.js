import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

const BoardList = () => {
  return (
    <section className="section board-wrap">
      <nav className="nav board-nav">
        <ul>
          <li>
            <Link to="/board/allList">전체</Link>
          </li>
          <li>
            <Link to="#">댕댕이</Link>
          </li>
          <li>
            <Link to="#">냥냥이</Link>
          </li>
          <li>
            <Link to="#">일상</Link>
          </li>
          <li>
            <Link to="#">정보공유</Link>
          </li>
          <li>
            <Link to="#">오산완</Link>
          </li>
        </ul>
      </nav>
      <div className="list-board">
        <ul className="posting-wrap">
          <li>
            <div className="list-list">
              <div className="start">
                <div>#태그</div>
                <div>제목, 작성자, 조회수, 좋아요</div>
              </div>
              <div className="end">
                <div>
                  <img
                    src="/image/paw.png"
                    style={{ width: "30px", height: "30px" }}
                  />
                </div>
                <div>
                  <p>댓글 갯수</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="up-btn">
        <button>
          <FaIcons.FaArrowCircleUp
            style={{ width: "40px", height: "40px", marginTop: "30px" }}
          />
        </button>
      </div>
    </section>
  );
};
export default BoardList;
