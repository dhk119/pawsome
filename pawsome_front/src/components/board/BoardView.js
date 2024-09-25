import { useEffect, useState } from "react";
import BoardNav from "./BoardNav";
import { Link, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { memberNicknameState } from "../utils/RecoilData";
import axios from "axios";
import * as DOMPurify from "dompurify";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import * as AiIcons from "react-icons/ai";
import { TbEye } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";

const BoardView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const boardNo = params.boardNo;
  const [board, setBoard] = useState({});
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
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
  console.log(board);
  return (
    <section className="section board-view-wrap">
      <div className="board-view-content">
        <div>
          {board.boardTag === 1
            ? "#댕댕이"
            : board.boardTag === 2
            ? "#냥냥이"
            : board.boardTag === 3
            ? "#일상"
            : board.boardTag === 4
            ? "#정보공유"
            : board.boardTag === 5
            ? "오산완"
            : "#전체"}
          ,{board.boardTitle}
          {memberNickname === board.memberNickname ? (
            <div className="view-btn-zone">
              <Link to="#">수정</Link>
              <button type="button">삭제</button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <div>
            <img src={`${backServer}/board/${board.memberProfile}`} />
            {board.memberNickname}
          </div>
          <div>
            <AiIcons.AiOutlineHistory />
            {board.regDate}
            <TbEye />
            {board.readCount}
            <AiIcons.AiOutlineHeart />
            {board.boardLike}
          </div>
        </div>
        <div>
          <div className="file-image">
            <>
              <Swiper
                className="boardSwiper"
                pagination={{
                  type: "fraction",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
              >
                {board.fileList
                  ? board.fileList.map((image, i) => {
                      return (
                        <SwiperSlide>
                          <img
                            key={("img-", i)}
                            src={`${backServer}/board/${image.filepath}`}
                          />
                        </SwiperSlide>
                      );
                    })
                  : ""}
              </Swiper>
            </>
          </div>
          <div className="board-quill">
            {board.boardContent && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "60vw",
                  whiteSpace: "normal",
                }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(String(board.boardContent)),
                }}
              />
            )}
          </div>
          <div className="boardView-btn">
            <button>
              <AiIcons.AiFillHeart />
              좋아요
            </button>
            <button>
              <IoIosSend />
              공유하기
            </button>
          </div>
        </div>
      </div>
      <div className="other-board-content">
        <span>다른 게시글도 이어보세요</span>
        <div>
          <img src={`${backServer}/board/${board.boardThumb}`} />
          {board.boardTag},{board.boardTitle},{board.regDate}
        </div>
      </div>
      <div className="reply-wrap"></div>
    </section>
  );
};

export default BoardView;
