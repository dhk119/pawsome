import { useRecoilState } from "recoil";
import Interceptor from "./Interceptor";
import { memberLevelState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import PageNavi from "../utils/PageNavi";
import Swal from "sweetalert2";

const BoardList = () => {
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reqPage, setReqPage] = useState(1);
  const [boardList, setBoardList] = useState([]);
  const [pi, setPi] = useState({});
  const [type, setType] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [option, setOption] = useState(0);
  const [search, setSearch] = useState(0);
  const [del, setDel] = useState(false);
  const navigate = useNavigate();
  const changeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const changeType = (e) => {
    setType(e.target.value);
  };
  const searchBoard = () => {
    if (!keyword && option === 0) {
      setSearch(0);
    } else {
      setSearch(search + 1);
    }
  };
  const changeOption = (e) => {
    setOption(Number(e.target.value));
  };
  useEffect(() => {
    search === 0
      ? axios.get(`${backServer}/admin/boardList/${reqPage}`).then((res) => {
          setBoardList(res.data.list);
          setPi(res.data.pi);
        })
      : keyword
      ? axios
          .get(
            `${backServer}/admin/searchBoard/${reqPage}/${type}/${keyword}/${option}`
          )
          .then((res) => {
            setBoardList(res.data.list);
            setPi(res.data.pi);
          })
      : axios
          .get(`${backServer}/admin/searchBoard/${reqPage}/${option}`)
          .then((res) => {
            setBoardList(res.data.list);
            setPi(res.data.pi);
          });
  }, [reqPage, search, del]);
  return (
    <section>
      {memberLevel === 1 ? (
        <div>
          <div className="admin-title">게시판 리스트</div>
          <div className="admin-write-wrap">
            <div className="admin-top-left"></div>
            <div className="admin-top-mid"></div>
            <div className="admin-search-wrap">
              <div className="inquiry-keyword">
                <label htmlFor="option"></label>
                <select id="option" value={option} onChange={changeOption}>
                  <option value={0}>태그</option>
                  <option value={1}>전체</option>
                  <option value={2}>댕댕이</option>
                  <option value={3}>냥냥이</option>
                  <option value={4}>일상</option>
                  <option value={5}>정보공유</option>
                  <option value={6}>오산완</option>
                </select>
                <label htmlFor="type"></label>
                <select id="type" value={type} onChange={changeType}>
                  <option value={"all"}>전체</option>
                  <option value={"title"}>제목</option>
                  <option value={"content"}> 내용 </option>
                  <option value={"writer"}>닉네임</option>
                </select>
              </div>
              <div className="search-input-wrap" id="inquiry-search">
                <button
                  type="button"
                  className="search-btn"
                  onClick={searchBoard}
                >
                  <img src="/image/paw.png" className="search-icon" />
                </button>
                <input
                  type="text"
                  className="search-input"
                  placeholder="검색어를 입력하세요"
                  value={keyword}
                  onChange={changeKeyword}
                ></input>
              </div>
            </div>
          </div>
          <table className="admin-tbl">
            <thead>
              <tr>
                <th>게시판 번호</th>
                <th>게시판 제목</th>
                <th>게시판 썸네일</th>
                <th>작성자</th>
                <th>카테고리</th>
                <th>조회수</th>
                <th>작성일</th>
                <th>좋아요</th>
                <th>댓글수</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody id="admin-member-list-body">
              {boardList.map((board, i) => {
                const deleteBoard = () => {
                  Swal.fire({
                    text: "게시물을 삭제하시겠습니까?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "삭제",
                    cancelButtonText: "취소",
                    confirmButtonColor: "var(--point1)",
                    cancelButtonColor: "var(--main1)",
                    iconColor: "var(--main2)",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      const boardNo = board.boardNo;
                      axios
                        .delete(`${backServer}/admin/deleteBoard/${boardNo}`)
                        .then((res) => {
                          if (res.data > 0) {
                            setDel(del ? false : true);
                            Swal.fire({
                              text: "성공적으로 삭제되었습니다",
                              icon: "success",
                              iconColor: "var(--main1)",
                              confirmButtonColor: "var(--point1)",
                            });
                          }
                        });
                    } else {
                      navigate(`/admin/boardList`);
                    }
                  });
                };
                return (
                  <tr key={"board" + i}>
                    <td>{board.boardNo}</td>
                    <td
                      onClick={() => {
                        navigate(`/board/view/${board.boardNo}`);
                      }}
                    >
                      {board.boardTitle}
                    </td>
                    <td>
                      <img
                        src={`${backServer}/board/thumb/${board.boardThumb}`}
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </td>
                    <td
                      onClick={() => {
                        navigate(`/board/view/${board.boardNo}`);
                      }}
                    >
                      {board.memberNickname}
                    </td>
                    <td
                      onClick={() => {
                        navigate(`/board/view/${board.boardNo}`);
                      }}
                    >
                      {board.boardTag === 1
                        ? "전체 "
                        : board.boardTag === 2
                        ? "댕댕이"
                        : board.boardTag === 3
                        ? "냥냥이"
                        : board.boardTag === 4
                        ? "일상"
                        : board.boardTag === 5
                        ? "정보공유"
                        : "오산완"}
                    </td>
                    <td
                      onClick={() => {
                        navigate(`/board/view/${board.boardNo}`);
                      }}
                    >
                      {board.readCount}
                    </td>
                    <td
                      onClick={() => {
                        navigate(`/board/view/${board.boardNo}`);
                      }}
                    >
                      {board.regDate}
                    </td>
                    <td
                      onClick={() => {
                        navigate(`/board/view/${board.boardNo}`);
                      }}
                    >
                      {board.boardLike}
                    </td>
                    <td
                      onClick={() => {
                        navigate(`/board/view/${board.boardNo}`);
                      }}
                    >
                      {board.replyCount}
                    </td>
                    <td>
                      <button
                        onClick={deleteBoard}
                        className="admin-board-delete-button"
                      >
                        게시물 삭제
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pageNavi-frm admin-list">
            <ul className="pageNavi-ul">
              <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
            </ul>
          </div>
          <div className="admin-list-button-zone">
            <button
              className="admin-write-submit"
              type="button"
              onClick={() => {
                navigate("/admin/main");
              }}
            >
              관리자 페이지
            </button>
          </div>
        </div>
      ) : (
        <Interceptor />
      )}
    </section>
  );
};
export default BoardList;
