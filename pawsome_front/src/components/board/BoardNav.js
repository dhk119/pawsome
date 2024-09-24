import { useState } from "react";

const BoardNav = () => {
  const [reqPage, setReqPage] = useState(1);
  const [boardTag, setBoardTag] = useState(0);
  const changeTag = (e) => {
    setBoardTag(e.target.id);
    setReqPage(1);
  };
  return (
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
  );
};

export default BoardNav;
