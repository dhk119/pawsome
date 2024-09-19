import { Link } from "react-router-dom";
import "./board.css";

const AllBoardList = () => {
  return (
    <section className="section board-list">
      <nav className="nav board-nav">
        <ul>
          <li>
            <Link to="#">전체</Link>
          </li>
          <li>
            <Link to="/board/list">자유 게시판</Link>
          </li>
          <li>
            <Link to="#">오산완</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default AllBoardList;
