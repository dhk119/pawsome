import { Link, useNavigate, useParams } from "react-router-dom";
import BoardFrm from "./BoardFrm";
import QuillEditor from "../utils/QuillEditor";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { memberNicknameState } from "../utils/RecoilData";
import axios from "axios";

const BoardUpdate = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const boardNo = params.boardNo;
  const navigate = useNavigate();
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  console.log(memberNickname);
  const [boardTag, setBoardTag] = useState(0);
  const [boardTitle, setBoardTitle] = useState("");
  const [boardThumb, setBoardThumb] = useState(null);
  const [boardContent, setBoardContent] = useState("");
  const [boardFile, setBoardFile] = useState([]);
  //수정후 새로 받을 state
  const [thumbnail, setThumbnail] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [delBoardFileNo, setDelBoardFileNo] = useState([]);
  const inputTitle = (e) => {
    setBoardTitle(e.target.value);
  };
  useEffect(() => {
    axios.get(`${backServer}/board/boardNo/${boardNo}`).then((res) => {
      console.log(res);
      setBoardTag(
        res.data.boardTag === 1
          ? "#댕댕이"
          : res.data.boardTag === 2
          ? "#냥냥이"
          : res.data.boardTag === 3
          ? "#일상"
          : res.data.boardTag === 4
          ? "#정보공유"
          : res.data.boardTag === 5
          ? "오산완"
          : "전체"
      );
      setBoardTitle(res.data.boardTitle);
      setBoardContent(res.data.boardContent);
    });
  });
  return (
    <section className="section board-content-wrap">
      <div className="board-inside-wrap">
        <div className="page-title">게시글 수정</div>
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
                <button type="submit">수정</button>
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
                thumbnail={thumbnail}
                setThumbnail={setThumbnail}
                fileList={fileList}
                setFileList={setFileList}
                delBoardFileNo={delBoardFileNo}
                setDelBoardFileNo={setDelBoardFileNo}
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
    </section>
  );
};

export default BoardUpdate;
