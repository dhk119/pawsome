import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import Map from "../board/Map";
import WalkMap from "./WalkMap";

const BoardFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const boardTag = props.boardTag;
  const setBoardTag = props.setBoardTag;
  const boardTitle = props.boardTitle;
  const setBoardTitle = props.setBoardTitle;
  const boardThumb = props.boardThumb;
  const setBoardThumb = props.setBoardThumb;
  const boardFile = props.boardFile;
  const setBoardFile = props.setBoardFile;
  //수정용
  const fileList = props.fileList;
  const setFileList = props.setFileList;
  const delBoardFileNo = props.delBoardFileNo;
  const setDelBoardFileNo = props.setDelBoardFileNo;
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const changeTag = (e) => {
    console.log(e.target.innerText);
    setBoardTag(e.target.innerText);
  };
  //첨부파일 화면에 띄울 state
  const [showBoardFile, setShowBoardFile] = useState([]);
  //첨부파일 추가시 동작할 함수
  const addBoardFile = (e) => {
    const files = e.currentTarget.files; //배열처럼 보이지만 배열이 아니기 때문에 직접for문써서 넣어주기
    const fileArr = new Array(); //글작성 시 전송할 파일 배열
    const fileimgArr = new Array(); //화면에 노출시킬 파일이미지 배열
    for (let i = 0; i < files.length; i++) {
      fileArr.push(files[i]);
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        fileimgArr.push(reader.result);
        setShowBoardFile([...showBoardFile, ...fileimgArr]);
      };
    }
    setBoardFile([...boardFile, ...fileArr]);
  };
  console.log(fileList);
  return (
    <div className="board-writeFrm">
      <ul>
        <li>
          <>
            <div className="navbar1">
              <Link to="#" className="menu1-bars">
                {sidebar ? (
                  <div onClick={showSidebar}>
                    <span style={{ color: "#ccc" }}>
                      {boardTag === 0 ? "주제를 선택해 주세요" : boardTag}
                    </span>
                    <span>
                      <AiIcons.AiOutlineClose />
                    </span>
                  </div>
                ) : (
                  <div onClick={showSidebar}>
                    <span style={{ color: "#ccc" }}>
                      {boardTag === 0 ? "주제를 선택해 주세요" : boardTag}
                    </span>
                    <span>
                      <AiIcons.AiOutlineRight />
                    </span>
                  </div>
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
          <div>
            <input
              className="board-content-title"
              placeholder="제목을 입력해 주세요"
              value={boardTitle}
              onChange={setBoardTitle}
            ></input>
          </div>
        </li>
        <li>
          {boardTag == "#오산완" && (
            <div
              id="map-box"
              style={{
                textAlign: "center",
              }}
            >
              <span>
                * 현재 위치가 나오지 않으면 위치 사용을 허용으로 변경해주세요. *
              </span>
              <div id="walkMap">
                <WalkMap />
              </div>
              <span style={{ fontSize: "12px" }}>
                지도를 마우스로 클릭하면 선 그리기가 시작되고 오른쪽 마우스를
                클릭하면 선 그리기가 종료됩니다
              </span>
              <br />
              <span>산책코스를 그려 지도를 캡쳐 후 이미지를 첨부해주세요!</span>
              <span style={{ fontSize: "12px" }}>
                * 캡쳐하는법 window키+ctrl+s를 누르고 드래그 *
              </span>
            </div>
          )}

          <div className="board-img-wrap">
            <label htmlFor="boardFile">
              <img src="/image/img-box.png" alt="Upload" />
            </label>
            <input
              className="img-file"
              type="file"
              id="boardFile"
              onChange={addBoardFile}
              multiple
            />
            {fileList
              ? fileList.map((boardFile, i) => {
                  console.log(boardFile);
                  const deleteFile = () => {
                    const newFileList = fileList.filter((item) => {
                      return item !== boardFile;
                    });
                    setFileList(newFileList);
                    setDelBoardFileNo([
                      ...delBoardFileNo,
                      boardFile.boardFileNo,
                    ]);
                  };
                  return (
                    <div className="preview-img" key={"oldFile-" + i}>
                      <img
                        className="fileimg"
                        src={`${backServer}/board/thumb/${boardFile.filepath}`}
                      />
                      <span className="del-file-icon" onClick={deleteFile}>
                        <AiIcons.AiOutlineCloseCircle />
                      </span>
                    </div>
                  );
                })
              : ""}
            {showBoardFile.map((fileimg, i) => {
              const deleteFile = () => {
                boardFile.splice(i, 1);
                setBoardFile([...boardFile]);
                showBoardFile.splice(i, 1);
                setShowBoardFile([...showBoardFile]);
              };
              return (
                <div className="preview-img" key={"newFile-" + i}>
                  <img className="fileimg" src={fileimg} />
                  <span className="del-file-icon" onClick={deleteFile}>
                    <AiIcons.AiOutlineCloseCircle />
                  </span>
                </div>
              );
            })}
          </div>
        </li>
        <li>
          <div className="board-write-alert">
            <AiIcons.AiOutlineAlert style={{ color: "red" }} /> 욕설, 광고 등{" "}
            <Link to="#">운영정책</Link> 위반시 제재를 받으실 수 있습니다.
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BoardFrm;
