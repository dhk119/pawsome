import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import Map from "../board/Map";
import WalkMap from "./WalkMap";

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
  const changeTag = (e) => {
    console.log(e);
    setBoardTag(e.target.innerText);
  };
  //첨부파일 화면에 띄울 state
  const [showBoardFile, setShowBoardFile] = useState([]);
  //첨부파일 추가시 동작할 함수
  const addBoardFile = (e) => {
    const files = e.currentTarget.files; //배열처럼 보이지만 배열이 아니기 때문에 직접for문써서 넣어주기
    const fileArr = new Array(); //글작성 시 전송할 파일 배열
    const filenameArr = new Array(); //화면에 노출시킬 파일이름 배열
    for (let i = 0; i < files.length; i++) {
      fileArr.push(files[i]);
      filenameArr.push(files[i].name);
    }
    setBoardFile([...boardFile, ...fileArr]);
    setShowBoardFile([...showBoardFile, ...filenameArr]);
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
                        {boardTag === "" ? "주제를 선택해 주세요" : boardTag}
                      </span>
                      <span>
                        <AiIcons.AiOutlineClose
                          onClick={() => {
                            setBoardTag("");
                          }}
                        />
                      </span>
                    </button>
                  ) : (
                    <button onClick={showSidebar}>
                      <span style={{ color: "#ffa518" }}>
                        {boardTag === "" ? "주제를 선택해 주세요" : boardTag}
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
            <input
              className="board-content-title"
              placeholder="제목을 입력해 주세요"
            ></input>
          </li>
          <li>
            {boardTag == "#오산완" && (
              <div id="map-box" style={{ textAlign: "center" }}>
                <span>
                  * 현재 위치가 나오지 않으면 위치 사용을 허용으로 변경해주세요.
                  *
                </span>
                <div
                  id="walkMap"
                  style={{
                    width: "500px",
                    height: "400px",
                  }}
                >
                  <WalkMap />
                </div>
                <span style={{ fontSize: "12px" }}>
                  지도를 마우스로 클릭하면 선 그리기가 시작되고 오른쪽 마우스를
                  클릭하면 선 그리기가 종료됩니다
                </span>
                <br></br>
                <span>
                  * 산책코스를 그려 지도를 캡쳐 후 이미지를 첨부해주세요! *
                </span>
              </div>
            )}

            <div className="board-img-wrap">
              <label htmlFor="boardFile">
                <img src="/image/default_img.png" alt="Upload" />
              </label>
              <input
                className="img-file"
                type="file"
                id="boardFile"
                onChange={addBoardFile}
                multiple
              />
            </div>
          </li>
          <li>
            <div className="board-write-alert">
              <AiIcons.AiOutlineAlert /> 욕설, 광고 등{" "}
              <Link to="#">운영정책</Link>위반시 제재를 받으실 수 있습니다.
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BoardFrm;
