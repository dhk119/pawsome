import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);
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
          {boardList.map((board, i) => {
            return <BoardItem key={"board-" + i} board={board} />;
          })}
        </ul>
      </div>
    </section>
  );
};
const BoardItem = (props) => {
  const board = props.board;
  const navigate = useNavigate();
  return (
    <li className="posting-item">
      <div></div>
    </li>
  );
};
export default BoardList;
