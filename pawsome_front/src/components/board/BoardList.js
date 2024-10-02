import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginState } from "../utils/RecoilData";
import ScrollToTop from "react-scroll-to-top";
import axios from "axios";
import MorePage from "../utils/MorePage";
import { TfiTimer } from "react-icons/tfi";
import * as AiIcons from "react-icons/ai";
import { TbEye } from "react-icons/tb";

const BoardList = () => {
  const isLogin = useRecoilValue(isLoginState);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [boardList, setBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [boardTag, setBoardTag] = useState(0);
  const [pi, setPi] = useState({});
  const [reply, setReply] = useState(0);
  useEffect(() => {
    axios
      .get(`${backServer}/board/list/${boardTag}/${reqPage}`)
      .then((res) => {
        if (reqPage != 1) {
          const array = boardList.concat(res.data.list);
          setBoardList(array);
        } else {
          setBoardList(res.data.list);
        }
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, boardTag]);
  const changeTag = (e) => {
    setBoardTag(e.target.id);
    setReqPage(1);
  };
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
            <div className="board-list-options">
              <select>
                <option>등록순</option>
                <option>인기순</option>
              </select>
            </div>
            {isLogin ? <Link to="/board/write">글쓰기</Link> : ""}
          </div>
          <div className="board-list-wrap">
            <ul className="posting-wrap">
              {boardList
                ? boardList.map((board, i) => {
                    return <BoardItem board={board} />;
                  })
                : ""}
            </ul>
          </div>
          {pi.totalPage === 0 ? (
            <div className="list-list">
              <span>등록된 게시글이 없습니다.</span>
            </div>
          ) : reqPage !== pi.totalPage ? (
            <span className="more-list">
              <MorePage pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="up-btn">
        <ScrollToTop smooth />
      </div>
    </section>
  );
};

const BoardItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const board = props.board;
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
          <div className="posting-tag">
            <div>
              {board.boardTag === 1
                ? "#댕댕이"
                : board.boardTag === 2
                ? "#냥냥이"
                : board.boardTag === 3
                ? "#일상"
                : board.boardTag === 4
                ? "#정보공유"
                : board.boardTag === 5
                ? "#오산완"
                : "#전체"}
            </div>
            <div>{board.boardTitle}</div>
          </div>
          <div className="posting-sub-info">
            <div>{board.memberNickname}</div>
            <div>
              <TfiTimer />
              {board.regDate}
            </div>
            <div>
              <TbEye />
              {board.readCount}
            </div>
            <div>
              <AiIcons.AiFillHeart />
              {board.boardLike}
            </div>
          </div>
        </div>
        <div className="end">
          <div className="posting-img">
            {board.boardThumb ? (
              <img src={`${backServer}/board/thumb/${board.boardThumb}`}></img>
            ) : (
              ""
            )}
          </div>
          <div className="reply-count">
            <div>{board.replyCount}</div>
            <div>댓글</div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default BoardList;
