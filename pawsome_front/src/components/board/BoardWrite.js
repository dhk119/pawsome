import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { memberNicknameState } from "../utils/RecoilData";
import { useState } from "react";
import BoardFrm from "./BoardFrm";
import QuillEditor from "../utils/QuillEditor";
import ScrollToTop from "react-scroll-to-top";
import axios from "axios";
import { Swal } from "sweetalert2";
import BoardList from "./BoardList";

const BoardWrite = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  console.log(memberNickname);
  const [boardTag, setBoardTag] = useState(0);
  const [boardTitle, setBoardTitle] = useState("");
  const [boardThumb, setBoardThumb] = useState(null);
  const [boardContent, setBoardContent] = useState("");
  const [boardFile, setBoardFile] = useState([]);
  const inputTitle = (e) => {
    setBoardTitle(e.target.value);
  };

  const writeBoard = () => {
    if (boardTitle !== "" && boardContent !== "") {
      const form = new FormData();
      form.append("boardTitle", boardTitle);
      form.append("boardContent", boardContent);
      form.append("memberNickname", memberNickname);
      if (boardTag === "#댕댕이") {
        form.append("boardTag", 1);
      } else if (boardTag === "#냥냥이") {
        form.append("boardTag", 2);
      } else if (boardTag === "#일상") {
        form.append("boardTag", 3);
      } else if (boardTag === "#정보공유") {
        form.append("boardTag", 4);
      } else if (boardTag === "#오산완") {
        form.append("boardTag", 5);
      }
      for (let i = 0; i < boardFile.length; i++) {
        form.append("boardFile", boardFile[i]);
      }
      axios
        .post(`${backServer}/board`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data) {
            navigate("/board/list");
          } else {
            Swal.fire({
              title: "게시글 작성요망",
              text: "게시글 작성해 주세요",
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section className="section board-content-wrap">
      <div className="board-inside-wrap">
        <div className="page-title">게시글 작성</div>
        <div className="board-write-wrap">
          <form
            className="board-write-frm"
            onSubmit={(e) => {
              e.preventDefault();
              writeBoard();
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
