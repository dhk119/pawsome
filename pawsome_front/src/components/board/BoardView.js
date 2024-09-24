import { useEffect, useState } from "react";
import BoardNav from "./BoardNav";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { memberNicknameState } from "../utils/RecoilData";
import axios from "axios";
import * as DOMPurify from "dompurify";

const BoardView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const boardNo = params.boardNo;
  const [board, setBoard] = useState({});
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const [member, setMember] = useState({});
  useEffect(() => {
    axios
      .get(`${backServer}/board/boardNo/${boardNo}`)
      .then((res) => {
        console.log(res);
        setBoard(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="section board-view-wrap">
      <div className="board-view-content">
        <div>
          {board.boardTag} {board.boardTitle}
        </div>
        <div>
          {member.memberProfile}
          {board.memberNickname}
          {board.regDate}
          {board.readCount}
          {/* {boardLike} */}
        </div>
        <div>
          <img src={`${backServer}/board/${board.boardThumb}`}></img>
          {board.boardContent && (
            <div
              style={{
                width: "60vw",
                whiteSpace: "normal",
              }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(String(board.boardContent)),
              }}
            />
          )}
        </div>
      </div>
      <div className="other-board-content"></div>
      <div className="reply-wrap"></div>
    </section>
  );
};
const moreView = () => {};
export default BoardView;
