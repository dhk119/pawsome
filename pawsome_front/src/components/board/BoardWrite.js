import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { memberNicknameState } from "../utils/RecoilData";
import { useState } from "react";
import BoardFrm from "./BoardFrm";
import QuillEditor from "../utils/QuillEditor";
import ScrollToTop from "react-scroll-to-top";

const BoardWrite = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const [boardTag, setBoardTag] = useState(0);
  const [boardTitle, setBoardTitle] = useState("");
  const [boardThumb, setBoardThumb] = useState(null);
  const [boardContent, setBoardContent] = useState("");
  const [boardFile, setBoardFile] = useState([]);
  const inputTitle = (e) => {
    setBoardTitle(e.target.value);
  };
  const writeBoard = () => {};
  return (
    <section className="section board-content-wrap">
      <div className="board-inside-wrap">
        <div className="page-title">게시글 작성</div>
        <div className="board-write-wrap">
          <form
            className="board-write-frm"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="writeFrm-btn">
              <div>
                <Link to="/board/list">취소</Link>
              </div>
              <div>
                <button type="submit">등록</button>
              </div>
            </div>
            <div className="board-content-wrap">
              <BoardFrm
                memberNickname={memberNickname}
                boardTag={boardTag}
                setBoardTag={setBoardTag}
                boardTitle={boardTitle}
                setBoardTitle={inputTitle}
                boardThumb={boardThumb}
                setBoardThumb={setBoardThumb}
                boardFile={boardFile}
                setBoardFile={setBoardFile}
              />
            </div>
            <div className="board-content-wrap">
              <QuillEditor
                content={boardContent}
                setContent={setBoardContent}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="up-btn">
        <ScrollToTop smooth />
      </div>
    </section>
  );
};

export default BoardWrite;
