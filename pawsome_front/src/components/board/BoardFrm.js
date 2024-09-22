import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
const BoardFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const boardTag = props.boardTag;
  const setBoardTag = props.setBoardTag;
  const memberNickname = props.memberNickname;
  const boardTitle = props.boardTitle;
  const setBoardTitle = props.setBoardTitle;
  const boardThumb = props.boardThumb;
  const setBoardThumb = props.setBoardThumb;
  const boardFile = props.boardFile;
  const setBoardFile = props.setBoardFile;
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [tag, setTag] = useState("");
  const changeTag = (e) => {
    console.log(e);
    setTag(e.target.innerText);
  };
  return (
    <div className="board-writeFrm">
      <div className="writeFrm-tag">
        <ul>
          <li>
            <>
              <div className="navbar1">
                <Link to="#" className="menu1-bars">
                  {sidebar ? (
                    <button onClick={showSidebar}>
                      <span style={{ color: "#ccc" }}>
                        {tag === "" ? "주제를 선택해 주세요" : tag}
                      </span>
                      <span>
                        <AiIcons.AiOutlineClose
                          onClick={() => {
                            setTag("");
                          }}
                        />
                      </span>
                    </button>
                  ) : (
                    <button onClick={showSidebar}>
                      <span style={{ color: "#ccc" }}>
                        {tag === "" ? "주제를 선택해 주세요" : tag}
                      </span>
                      <span>
                        <AiIcons.AiOutlineRight />
                      </span>
                    </button>
                  )}
                </Link>
              </div>
              <nav className={sidebar ? "nav-menu1 active" : "nav-menu1"}>
                <ul className="nav-menu1-items" onClick={showSidebar}>
                  <li>
                    <h1
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        color: "#5799ff",
                        margin: "10px",
                      }}
                    >
                      글의 주제를 선택해 주세요
                    </h1>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "13px",
                        margin: "10px",
                        color: "#ccc",
                      }}
                    >
                      주제는 한가지만 선택 가능합니다
                    </p>
                  </li>
                  <li>
                    <span onClick={changeTag}>#댕댕이</span>
                  </li>
                  <li>
                    <span onClick={changeTag}>#냥냥이</span>
                  </li>
                  <li>
                    <span onClick={changeTag}>#일상</span>
                  </li>
                  <li>
                    <span onClick={changeTag}>#정보공유</span>
                  </li>
                  <li>
                    <span onClick={changeTag}>#오산완</span>
                  </li>
                </ul>
              </nav>
            </>
          </li>
          <li>
            <input placeholder="제목을 입력해 주세요"></input>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BoardFrm;
