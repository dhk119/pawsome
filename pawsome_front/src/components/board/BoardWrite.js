import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { memberNicknameState } from "../utils/RecoilData";
import { useState } from "react";
import BoardFrm from "./BoardFrm";
import QuillEditor from "../utils/QuillEditor";

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
  return (
    <section className="section board-content-wrap">
      <div className="page-title">게시글 작성</div>
      <form
        className="board-write-frm"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <BoardFrm
          memberNickname={memberNickname}
          boardTitle={boardTitle}
          setBoardTitle={inputTitle}
          boardThumb={boardThumb}
          setBoardThumb={setBoardThumb}
          boardFile={boardFile}
          setBoardFile={setBoardFile}
        />
      </form>
      <div className="board-content-wrap">
        <QuillEditor />
      </div>
    </section>
  );
};

export default BoardWrite;
