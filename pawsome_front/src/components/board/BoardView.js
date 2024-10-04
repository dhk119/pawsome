import { Fragment, useEffect, useRef, useState } from "react";
import BoardNav from "./BoardNav";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, memberNicknameState } from "../utils/RecoilData";
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
import { FiCornerDownRight } from "react-icons/fi";
// import { ShareKakaoLink } from "src/components/utils/ShareKakaoLink";
const BoardView = () => {
  const isLogin = useRecoilValue(isLoginState);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const [boardNo, setBoardNo] = useState(params.boardNo);
  const [board, setBoard] = useState({});
  const [boardList, setBoardList] = useState([]);
  const [replyList, setReplyList] = useState(null);
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const navigate = useNavigate();
  const [reqPage, setReqPage] = useState(1);
  const [boardTag, setBoardTag] = useState(0);
  const [pi, setPi] = useState({});
  const [boardLike, setBoardLike] = useState(0);
  const [replyNo, setReplyNo] = useState(0);
  const [replyContent, setreplyContent] = useState("");
  const [writeType, setWriteType] = useState(true);
  const changeReply = (e) => {
    setreplyContent(e.target.value);
  };
  const [changedComment, setChangedComment] = useState(true);
  const viewDelUpdateRef = useRef(null);
  const [replyNoState, setReplyNoState] = useState(0);

  const commentRef = useRef(null);
  const [hide, setHide] = useState(true);
  const [type, setType] = useState(1);
  const changeType = (e) => {
    setType(e.target.value);
  };
  useEffect(() => {
    axios
      .get(
        `${backServer}/board/replyList/${boardNo}/${reqPage}/${type}/${memberNickname}`
      )
      .then((res) => {
        console.log(res);
        if (reqPage != 1) {
          const arr = replyList.concat(res.data.list);
          setReplyList(arr);
        } else {
          setReplyList(res.data.list);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, boardNo, changedComment, type, memberNickname]);
  console.log(replyList);
  useEffect(() => {
    axios
      .get(`${backServer}/board/list/${boardTag}/${reqPage}/${type}`)
      .then((res) => {
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
  }, [reqPage, boardTag, type]);

  useEffect(() => {
    axios
      .get(`${backServer}/board/boardNo/${boardNo}/${memberNickname}`)
      .then((res) => {
        console.log(res);
        setBoard(res.data);
        setBoardLike(res.data.boardLike);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [boardNo, memberNickname]);

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
    if (board.isLike === 0) {
      axios
        .post(`${backServer}/board/like`, {
          boardNo: board.boardNo,
          memberNickname: memberNickname,
        })
        .then((res) => {
          console.log(res);
          setBoardLike(boardLike + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .delete(`${backServer}/board/like`, {
          boardNo: board.boardNo,
          memberNickname: memberNickname,
        })
        .then((res) => {
          if (res.data > 0) {
            setBoardLike(boardLike - 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const writeReply = () => {
    if (replyContent !== "") {
      console.log("답줘:", replyContent);

      const form = new FormData();
      form.append("replyContent", replyContent);
      form.append("boardNo", boardNo);
      form.append("memberNickname", memberNickname);
      if (writeType) {
        axios
          .post(`${backServer}/board/reply`, form)
          .then((res) => {
            console.log(res);
            if (res.data) {
              setChangedComment(!changedComment);
              setreplyContent("");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("replyNo : ", replyNoState);

        form.append("replyNoRef", replyNoState);
        axios
          .patch(`${backServer}/board/reply/reComment`, form)
          .then((res) => {
            console.log(res);
            if (res.data) {
              setWriteType(true);
              setChangedComment(!changedComment);
              setreplyContent("");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                marginLeft: "500px",
              }}
            >
              <div
                onClick={() => {
                  if (hide) {
                    viewDelUpdateRef.current.style.display = "block";
                    setHide(!hide);
                  } else {
                    viewDelUpdateRef.current.style.display = "none";
                    setHide(!hide);
                  }
                }}
              >
                <AiIcons.AiOutlineEllipsis
                  style={{
                    padding: "5px 30px",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div
                className="view-btn-zone"
                style={{ display: "none" }}
                ref={viewDelUpdateRef}
              >
                <div>
                  <Link to={`/board/update/${board.boardNo}`}>수정하기</Link>
                </div>
                <div>
                  <button type="button" onClick={deleteBoard}>
                    삭제하기
                  </button>
                </div>
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
                  width: "40px",
                  height: "40px",
                }}
                src={`${backServer}/board/thumb/${board.memberProfile}`}
              />
            </div>
            <div className="b-v-m">
              <div>{board.memberNickname}</div>
              <div
                className="board-view-data"
                style={{ paddingBottom: "50px" }}
              >
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
              <button>
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
                          margin: "10px",
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
                      <div style={{ marginLeft: "5px" }}>
                        {board.boardTitle}
                      </div>
                      <div style={{ marginLeft: "5px" }}>{board.regDate}</div>
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
          <div className="reply-list-options">
            <select onChange={changeType}>
              <option value={1}>등록순</option>
              <option value={2}>인기순</option>
            </select>
          </div>
        </div>
      </div>
      <div className="reply-list-wrap">
        <div className="posting-wrap">
          <ul>
            {replyList ? (
              replyList.map((reply, i) => {
                return (
                  <Fragment key={("reply-", i)}>
                    <ReplyItem
                      reply={reply}
                      setReplyList={setReplyList}
                      replyList={replyList}
                      changedComment={changedComment}
                      setChangedComment={setChangedComment}
                      commentRef={commentRef}
                      setWriteType={setWriteType}
                      writeType={writeType}
                      setReplyNoState={setReplyNoState}
                      replyNoState={replyNoState}
                    />
                  </Fragment>
                );
              })
            ) : (
              <div className="preview-reply">
                <div>
                  <img src="/image/noreplyimg.png" />
                </div>
                <div>
                  <span style={{ color: "#ccc", fontWeight: "bold" }}>
                    아직 댓글이 없어요!
                  </span>
                </div>
                <div>
                  <span style={{ color: "#ccc" }}>첫 댓글을 작성해주세요</span>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
      {isLogin ? (
        <div className="reply-input-wrap">
          <form
            className="reply-write-frm"
            onSubmit={(e) => {
              e.preventDefault();
              writeReply();
            }}
          >
            <div>
              <input
                style={{
                  width: "1000px",
                  marginLeft: "30px",
                  border: "none",
                  paddingBottom: "3px",
                  color: "#ccc",
                }}
                readOnly
                ref={commentRef}
              ></input>
              <input
                style={{
                  width: "1000px",
                  marginLeft: "30px",
                  border: "none",
                  borderBottom: "1px solid #d6d6d6",
                  paddingBottom: "3px",
                }}
                placeholder="댓글을 남겨주세요"
                onChange={changeReply}
                value={replyContent}
              />
            </div>
            <div>
              <button
                type="submit"
                style={{
                  border: "none",
                  backgroundColor: "#ffd697",
                  padding: "5px 20px",
                  borderRadius: "10px",
                  width: "70px",
                  marginTop: "15px",
                  marginRight: "25px",
                }}
              >
                등록
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};
const ReplyItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const reply = props.reply;
  const replyList = props.replyList;
  const setReplyList = props.setReplyList;
  const viewDelUpdateRef = useRef(null);
  const [hide, setHide] = useState(true);
  const [replyLike, setReplyLike] = useState(0);
  const [changeReply, setChangeReply] = useState(reply.replyContent);
  const { changedComment, setChangedComment } = props;
  const editRef = useRef(null);
  const originalRef = useRef(null);
  const [editType, setEditType] = useState(false);
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);

  const { commentRef, setWriteType, writeType, replyNoState, setReplyNoState } =
    props;

  const isLike = () => {
    if (memberNickname !== "") {
      axios
        .post(`${backServer}/board/reply/like`, {
          replyNo: reply.replyNo,
          memberNickname: memberNickname,
        })
        .then((res) => {
          console.log(res);
          setReplyLike(replyLike + 1);
          setChangedComment(!changedComment);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deleteReply = () => {
    axios
      .delete(`${backServer}/board/reply/${reply.replyNo}`)
      .then((res) => {
        console.log(res);
        if (res.data === 1) {
          Swal.fire({
            title: "댓글이 삭제 되었습니다.",
            icon: "success",
          }).then((res) => {
            replyList.splice(res.data, 1);
            setReplyList([...replyList]);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateReply = () => {
    const form = new FormData();
    form.append("replyContent", changeReply);
    form.append("replyNo", reply.replyNo);
    axios
      .patch(`${backServer}/board/updateReply`, form)
      .then((res) => {
        console.log(res);
        editRef.current.style.display = "none";
        originalRef.current.style.display = "block";
        setChangedComment(!changedComment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <li className="list-list2">
        <div className="reply-member-wrap">
          <div>
            <img
              style={{
                borderRadius: "45px",
                border: "1px solid #ffa518",
                padding: "5px 5px",
                width: "30px",
                height: "30px",
              }}
              src={`${backServer}/board/thumb/${reply.memberProfile}`}
            />
          </div>
          <div>
            <div className="reply-member">
              <div>{reply.memberNickname}</div>
              <div style={{ display: "flex", gap: "5px" }}>
                <div>
                  <AiIcons.AiOutlineHistory style={{ paddingTop: "5px" }} />
                </div>
                <div>{reply.replyRegDate}</div>
              </div>
            </div>
            <div className="reply-content">
              <div ref={originalRef}>
                <div>{reply.replyContent}</div>
              </div>
              <div style={{ display: "none" }} ref={editRef}>
                <input
                  onChange={(e) => {
                    setChangeReply(e.target.value);
                  }}
                  value={changeReply}
                />
              </div>
            </div>

            <div style={{ marginTop: "10px", display: "flex", gap: "5px" }}>
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  fontSize: "20px",
                  color: "#ffa518",
                }}
                onClick={isLike}
              >
                <AiIcons.AiFillHeart />
              </button>
              <div>{reply.replyLike}</div>
            </div>
          </div>
        </div>
        <div style={{ position: "relative", width: "60px" }}>
          <div
            style={{ position: "absolute", right: "0" }}
            onClick={() => {
              if (hide) {
                viewDelUpdateRef.current.style.display = "block";
                setHide(!hide);
              } else {
                viewDelUpdateRef.current.style.display = "none";
                setHide(!hide);
              }
            }}
          >
            <AiIcons.AiOutlineEllipsis />
          </div>

          <div
            style={{ display: "none", marginTop: "20px" }}
            ref={viewDelUpdateRef}
          >
            {editType ? (
              <>
                <div>
                  <button onClick={updateReply}>수정완료</button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setEditType(!editType);
                      editRef.current.style.display = "none";
                      originalRef.current.style.display = "block";
                    }}
                  >
                    수정취소
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <button
                    onClick={() => {
                      setEditType(!editType);
                      editRef.current.style.display = "block";
                      originalRef.current.style.display = "none";
                    }}
                  >
                    수정하기
                  </button>
                </div>
                <div>
                  <button onClick={deleteReply}>삭제하기</button>
                </div>
              </>
            )}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              marginBottom: "5px",
              width: "100px",
            }}
          >
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
              }}
              onClick={() => {
                commentRef.current.value =
                  "@" + reply.memberNickname + "님에게 답글 남기는 중";
                setWriteType(false);
                setReplyNoState(reply.replyNo);
              }}
            >
              <AiIcons.AiFillEdit style={{ marginRight: "3px" }} />
              답글쓰기
            </button>
          </div>
        </div>
      </li>
      <li>
        {replyList.map((reply, i) => {
          return (
            <Fragment key={("reply-", i)}>
              <ReReplyItem
                reply={reply}
                setReplyList={setReplyList}
                replyList={replyList}
                changedComment={changedComment}
                setChangedComment={setChangedComment}
                commentRef={commentRef}
                setWriteType={setWriteType}
                writeType={writeType}
                setReplyNoState={setReplyNoState}
                replyNoState={replyNoState}
              />
            </Fragment>
          );
        })}
      </li>
    </>
  );
};

const ReReplyItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const reply = props.reply;
  const replyList = props.replyList;
  const setReplyList = props.setReplyList;
  const viewDelUpdateRef = useRef(null);
  const [hide, setHide] = useState(true);
  const [replyLike, setReplyLike] = useState(0);
  const [changeReply, setChangeReply] = useState(reply.replyContent);
  const { changedComment, setChangedComment } = props;
  const editRef = useRef(null);
  const originalRef = useRef(null);
  const [editType, setEditType] = useState(false);

  const { commentRef, setWriteType, writeType, replyNoState, setReplyNoState } =
    props;

  const isLike = () => {
    console.log(reply);
    axios
      .post(`${backServer}/board/reply/like`, reply)
      .then((res) => {
        console.log(res);
        setReplyLike(replyLike + 1);
        setChangedComment(!changedComment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteReply = () => {
    axios
      .delete(`${backServer}/board/reply/${reply.replyNo}`)
      .then((res) => {
        console.log(res);
        if (res.data === 1) {
          Swal.fire({
            title: "댓글이 삭제 되었습니다.",
            icon: "success",
          }).then((res) => {
            replyList.splice(res.data, 1);
            setReplyList([...replyList]);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateReply = () => {
    const form = new FormData();
    form.append("replyContent", changeReply);
    form.append("replyNo", reply.replyNo);
    axios
      .patch(`${backServer}/board/updateReply`, form)
      .then((res) => {
        console.log(res);
        editRef.current.style.display = "none";
        originalRef.current.style.display = "block";
        setChangedComment(!changedComment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <li
      className="list-list2"
      style={{ backgroundColor: "rgba(255, 214, 151, 0.5)" }}
    >
      <div className="reply-member-wrap">
        <FiCornerDownRight style={{ marginTop: "17px" }} />
        <div>
          <img
            style={{
              borderRadius: "45px",
              border: "1px solid #ffa518",
              padding: "5px 5px",
              width: "30px",
              height: "30px",
            }}
            src={`${backServer}/board/thumb/${reply.memberProfile}`}
          />
        </div>
        <div>
          <div className="reply-member">
            <div>{reply.memberNickname}</div>
            <div style={{ display: "flex", gap: "5px" }}>
              <div>
                <AiIcons.AiOutlineHistory style={{ paddingTop: "5px" }} />
              </div>
              <div>{reply.replyRegDate}</div>
            </div>
          </div>
          <div className="reply-content">
            <div ref={originalRef}>
              <div>{reply.replyContent}</div>
            </div>
            <div style={{ display: "none" }} ref={editRef}>
              <input
                onChange={(e) => {
                  setChangeReply(e.target.value);
                }}
                value={changeReply}
              />
            </div>
          </div>

          <div style={{ marginTop: "10px", display: "flex", gap: "5px" }}>
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                fontSize: "20px",
                color: "#ffa518",
              }}
              onClick={isLike}
            >
              <AiIcons.AiFillHeart />
            </button>
            <div>{reply.replyLike}</div>
          </div>
        </div>
      </div>
      <div style={{ position: "relative", width: "60px" }}>
        <div
          style={{ position: "absolute", right: "0" }}
          onClick={() => {
            if (hide) {
              viewDelUpdateRef.current.style.display = "block";
              setHide(!hide);
            } else {
              viewDelUpdateRef.current.style.display = "none";
              setHide(!hide);
            }
          }}
        >
          <AiIcons.AiOutlineEllipsis />
        </div>

        <div
          style={{ display: "none", marginTop: "20px" }}
          ref={viewDelUpdateRef}
        >
          {editType ? (
            <>
              <div>
                <button onClick={updateReply}>수정완료</button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setEditType(!editType);
                    editRef.current.style.display = "none";
                    originalRef.current.style.display = "block";
                  }}
                >
                  수정취소
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <button
                  onClick={() => {
                    setEditType(!editType);
                    editRef.current.style.display = "block";
                    originalRef.current.style.display = "none";
                  }}
                >
                  수정하기
                </button>
              </div>
              <div>
                <button onClick={deleteReply}>삭제하기</button>
              </div>
            </>
          )}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            marginBottom: "5px",
            width: "100px",
          }}
        >
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
            }}
            onClick={() => {
              commentRef.current.value =
                "@" + reply.memberNickname + "님에게 답글 남기는 중";
              setWriteType(false);
              setReplyNoState(reply.replyNo);
            }}
          >
            <AiIcons.AiFillEdit style={{ marginRight: "3px" }} />
            답글쓰기
          </button>
        </div>
      </div>
    </li>
  );
};
export default BoardView;
