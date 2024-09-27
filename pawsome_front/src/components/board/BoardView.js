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
import { config } from "../utils/Properties";
import { useTranslation } from "react-i18next";
import { RiWechatLine } from "react-icons/ri";

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

  //공유하기
  const { t } = useTranslation();
  const useSNSShare = ({ title, url, option }) => {
    const shareToTwitter = () => {
      const sharedLink =
        "text=" + encodeURIComponent(title + " \n ") + encodeURIComponent(url);
      openWidnow(`https://twitter.com/intent/tweet?${sharedLink}`);
    };

    const shareToFacebook = () => {
      const sharedLink = encodeURIComponent(url);
      openWidnow(`http://www.facebook.com/sharer/sharer.php?u=${sharedLink}`);
    };

    const shareToKakaoTalk = () => {
      if (window.Kakao === undefined) {
        return;
      }

      const kakao = window.Kakao;

      // Prevent duplicate initialization
      if (!kakao.isInitialized()) {
        // Initialize with the JavaScript key
        kakao.init(config.KAKAO_SHARE_KEY);
      }

      kakao.Share.sendDefault({
        objectType: "text",
        text: title,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      });
    };

    const shareToNavigator = ({ text, url }) => {
      const sharedData = {
        text: text,
        url: url,
      };

      try {
        if (navigator.canShare && navigator.canShare(sharedData)) {
          navigator
            .share(sharedData)
            .then(() => {
              console.log("Success");
            })
            .catch(() => {
              console.log("Cancelled");
            });
        }
      } catch (e) {
        console.log("Failed");
      }
    };

    const openWidnow = (url) => {
      window.open(url, option?.windowOpenTarget || "_blank");
    };

    return {
      isAvailNavigator: typeof navigator.share !== "undefined",
      shareToTwitter,
      shareToFacebook,
      shareToKakaoTalk,
      shareToNavigator,
    };
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
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
              <Link to="#">수정</Link>
              <div>
                <button type="button">삭제</button>
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
                src={`${backServer}/board/${board.memberProfile}`}
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
              {board.boardLike}
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
              <button onClick={useSNSShare}>
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
        <div className="other-contents">
          <div style={{ display: "flex", alignSelf: "center" }}>
            <img
              style={{ width: "200px", height: "200px" }}
              src={`${backServer}/board/${board.boardThumb}`}
            />
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
        </div>
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
        <div>글글글</div>
        <div>글글글</div>
        <div>글글글</div>
        <div>글글글</div>
        <div>글글글</div>
        <div>글글글</div>
        <div>글글글</div>
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
                width: "1000px",
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

export default BoardView;
