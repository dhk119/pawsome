import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginState } from "../utils/RecoilData";
import ScrollToTop from "react-scroll-to-top";
import axios from "axios";

const BoardList = () => {
  const isLogin = useRecoilValue(isLoginState);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [boardList, setBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [boardTag, setBoardTag] = useState(0);
  useEffect(() => {
    axios
      .get(`${backServer}/board/list/${boardTag}/${reqPage}`)
      .then((res) => {
        console.log(res);
        setBoardList(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, boardTag]);
  const changeTag = (e) => {
    setBoardTag(e.target.id);
    setReqPage(1);
  };
  console.log(boardTag);
  return (
    <section className="section board-wrap">
      <nav className="nav board-nav">
        <ul>
          <li>
            <span onClick={changeTag} id="0">
              #전체
            </span>
          </li>
          <li>
            <span onClick={changeTag} id="1">
              #댕댕이
            </span>
          </li>
          <li>
            <span onClick={changeTag} id="2">
              #냥냥이
            </span>
          </li>
          <li>
            <span onClick={changeTag} id="3">
              #일상
            </span>
          </li>
          <li>
            <span onClick={changeTag} id="4">
              #정보공유
            </span>
          </li>
          <li>
            <span onClick={changeTag} id="5">
              #오산완
            </span>
          </li>
        </ul>
      </nav>
      <div className="list-board">
        <div className="board-all-wrap">
          <div className="write-wrap">
            {isLogin ? <Link to="/board/write">글쓰기</Link> : ""}
          </div>
          <div className="board-list-wrap">
            <ul className="posting-wrap">
              {boardList.map((board, i) => {
                return <BoardItem board={board} />;
              })}
            </ul>
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
          </div>
        </div>
      </div>
      <div className="up-btn">
        <ScrollToTop smooth />
      </div>
    </section>
  );
};
const BoardTag = (props) => {
  const boardTag = props.boardTag;
  const setBoardTag = props.setBoardTag;
  const reqPage = props.reqPage;
  const setReqPage = props.setReqPage;
  return <li>{boardTag}전체</li>;
};

const BoardItem = (props) => {
  const board = props.board;
  const [boardLike, setBoardLike] = useState(0);
  const navigate = useNavigate();
  return (
    <li
      className="posting-item"
      onClick={() => {
        navigate(`/board/view/${board.boardNo}`);
      }}
    >
      <div className="list-list">
        <div className="posting-info start">
          <div className="posting-tag">{board.boardTag === 1? "#댕댕이" : board.boardTag === 2? "#냥냥이" : }</div>
          <div className="posting-sub-info">
            {board.boardTitle} {board.memberNickname} {board.readCount}
            {boardLike}
          </div>
        </div>
        <div className="end">
          <div className="posting-img">
            <img
              src={
                board.boardThumb
                  ? `localhost:8282/board/thumb/${board.boardThumb}`
                  : ""
              }
            ></img>
          </div>
          <div>
            <div>{board.boardNo}</div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default BoardList;
