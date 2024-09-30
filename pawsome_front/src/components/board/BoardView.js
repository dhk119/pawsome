import { useEffect, useState } from "react";
import BoardNav from "./BoardNav";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { RiWechatLine } from "react-icons/ri";
import Swal from "sweetalert2";
// import { ShareKakaoLink } from "src/components/utils/ShareKakaoLink";
const BoardView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const [boardNo, setBoardNo] = useState(params.boardNo);
  const [board, setBoard] = useState({});
  const [boardList, setBoardList] = useState([]);
  const [replyList, setReplyList] = useState([]);
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const navigate = useNavigate();
  const [reqPage, setReqPage] = useState(1);
  const [boardTag, setBoardTag] = useState(0);
  const [pi, setPi] = useState({});
  const [boardLike, setBoardLike] = useState(0);

  useEffect(() => {
    axios
      .get(`${backServer}/board/list/${boardTag}/${reqPage}`)
      .then((res) => {
        console.log(res);
        if (reqPage != 1) {
          const array = boardList.concat(res.data.list);
          setBoardList(array);
        } else {
          setBoardList(res.data.list);
        }
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, boardTag]);

  useEffect(() => {
    axios
      .get(`${backServer}/board/boardNo/${boardNo}`)
      .then((res) => {
        console.log(res);
        setBoard(res.data);
        setBoardLike(res.data.boardLike);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [boardNo]);

  //공유하기
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);
  const deleteBoard = () => {
    axios
      .delete(`${backServer}/board/${board.boardNo}`)
      .then((res) => {
        console.log(res);
        if (res.data === 1) {
          Swal.fire({
            title: "게시글이 삭제 되었습니다.",
            icon: "success",
          }).then((res) => {
            navigate("/board/list");
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isLike = () => {
    setBoardLike(boardLike + 1);
    axios
      .patch(`${backServer}/board/${board.boardNo}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="section board-view-wrap">
      <div className="board-view-content">
        <div className="board-view-head">
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
          </div>
          {memberNickname === board.memberNickname ? (
            <div className="view-btn-zone">
              <Link to={`/board/update/${board.boardNo}`}>수정</Link>
              <div>
                <button type="button" onClick={deleteBoard}>
                  삭제
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="board-view-title">
          <label htmlFor="boardTitle">제목 :</label>
          <div id="boardTitle">{board.boardTitle}</div>
        </div>
        <div className="board-view-memberinfo">
          <div className="board-view-memberinfo1">
            <div>
              <img
                style={{
                  borderRadius: "45px",
                  border: "1px solid #ffa518",
                  padding: "5px 5px",
                }}
                src={`${backServer}/board/thumb/${board.memberProfile}`}
              />
            </div>
            <div className="b-v-m">
              <div>{board.memberNickname}</div>
              <div className="board-view-data">
                <AiIcons.AiOutlineHistory />
                {board.regDate}
              </div>
            </div>
          </div>
          <div className="board-view-memberinfo1">
            <div className="board-view-data">
              <TbEye />
              {board.readCount}
            </div>
            <div className="board-view-data">
              <AiIcons.AiOutlineHeart />
              {boardLike}
            </div>
          </div>
        </div>
        <div className="board-view-content-1">
          <div className="file-image">
            <div>
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
                              src={`${backServer}/board/thumb/${image.filepath}`}
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
              <button onClick={isLike}>
                <AiIcons.AiFillHeart />
                좋아요
              </button>
              <button
              // onClick={() => {
              //   ShareKakaoLink(route, title);
              // }}
              >
                <IoIosSend />
                공유하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="other-board-content">
        <div>
          <span>
            <Link to="/board/list">다른 게시글</Link>도 이어보세요
          </span>
        </div>
        <ul className="other-contents">
          {boardList
            ? boardList.map((board, i) => {
                return (
                  <li
                    onClick={() => {
                      setBoardNo(board.boardNo);
                      navigate(`/board/view/${board.boardNo}`);
                    }}
                  >
                    <div style={{ display: "flex", alignSelf: "center" }}>
                      {board.boardThumb ? (
                        <img
                          style={{ width: "200px", height: "200px" }}
                          src={`${backServer}/board/thumb/${board.boardThumb}`}
                        />
                      ) : (
                        <img
                          style={{ width: "200px", height: "200px" }}
                          src="/image/noimage.png"
                        />
                      )}
                    </div>
                    <div className="other-content-view">
                      <div
                        style={{
                          backgroundColor: "#ffd697",
                          borderRadius: "5px",
                          padding: "3px 3px",
                          width: "90px",
                          textAlign: "center",
                        }}
                      >
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
                      </div>
                      <div>{board.boardTitle}</div>
                      <div>{board.regDate}</div>
                    </div>
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
      <div className="reply-wrap">
        <div className="reply-top-wrap">
          <div>
            <span>
              <RiWechatLine />
            </span>
            <span>댓글</span>
          </div>
          <div>등록순</div>
        </div>
      </div>
      <div className="reply-list-wrap">
        <ul className="posting-wrap">
          {replyList.map((reply, i) => {
            return <ReplyItem key={"reply-" + i} reply={reply} />;
          })}
        </ul>
      </div>
      <div className="reply-input-wrap">
        <form
          className="reply-write-frm"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <input
              style={{
                width: "1050px",
                border: "none",
                borderBottom: "1px solid #d6d6d6",
                paddingBottom: "3px",
              }}
              placeholder="댓글을 남겨주세요"
            />
          </div>
          <div>
            <label htmlFor="boardFile">
              <img
                src="/image/img-box.png"
                alt="Upload"
                style={{ margin: "0 10px" }}
              />
            </label>
            <input
              className="img-file"
              type="file"
              id="boardFile"
              multiple
              style={{ display: "none" }}
            />
          </div>
          <div>
            <button
              type="submit"
              style={{
                border: "none",
                backgroundColor: "#ffd697",
                padding: "5px 10px",
                borderRadius: "10px",
              }}
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
const ReplyItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const reply = props.reply;
  return (
    <li>
      <div>
        <img
          src={
            reply.replyImage
              ? `${backServer}/board/${reply.replyImage}`
              : "/image/paw.png"
          }
        />
      </div>
      <div>
        <div>{reply.reply}</div>
      </div>
    </li>
  );
};
export default BoardView;
