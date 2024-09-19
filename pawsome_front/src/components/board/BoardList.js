import { Link } from "react-router-dom";

const BoardList = () => {
  return (
    <section className="section board-wrap">
      <nav className="nav board-nav">
        <ul>
          <li>
            <Link to="#">전체</Link>
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
        <ul>
          <li>#태그</li>
          <li>#태그</li>
          <li>#태그</li>
          <li>#태그</li>
          <li>#태그</li>
          <li>#태그</li>
          <li>#태그</li>
        </ul>
      </div>
    </section>
  );
};

export default BoardList;
