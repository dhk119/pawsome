import { Link, useNavigate, useParams } from "react-router-dom";
import BoardFrm from "./BoardFrm";
import QuillEditor from "../utils/QuillEditor";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { memberNicknameState } from "../utils/RecoilData";
import axios from "axios";
import Swal from "sweetalert2";

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
    axios
      .get(`${backServer}/board/boardNo/${boardNo}`)
      .then((res) => {
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
        setBoardThumb(res.data.boardThumb);
        setFileList(res.data.fileList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateBoard = () => {
    if (boardTitle !== "" && boardContent !== "") {
      const form = new FormData();
      form.append("boardTitle", boardTitle);
      form.append("boardContent", boardContent);
      form.append("boardNo", boardNo);
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
      for (let i = 0; i < delBoardFileNo.length; i++) {
        form.append("delBoardFileNo", delBoardFileNo[i]);
      }
      axios
        .patch(`${backServer}/board`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          if (res.data) {
            navigate(`/board/view/${boardNo}`);
          } else {
            Swal.fire({
              title: "수정시 오류가 발생했습니다.",
              text: "빠진게 없는지 확인해 주세요.",
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
                <Link to={`/board/view/${boardNo}`}>취소</Link>
              </div>
              <div>
                <button type="submit" onClick={updateBoard}>
                  수정
                </button>
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
