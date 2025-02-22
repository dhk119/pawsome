import axios from "axios";
import { useEffect, useState } from "react";
import { TbEye } from "react-icons/tb";
import { TfiTimer } from "react-icons/tfi";
import { useNavigate, useParams } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import ProductList from "../market/ProductList";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { loginEmailState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import MorePage from "../utils/MorePage";

const SearchResult = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const searchKeyWord = params.searchKeyWord;
  const [searched, setSearchKeyWord] = useState(searchKeyWord);
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [reqPage1, setReqPage1] = useState(1);
  const [productList, setProductList] = useState([]);
  const [like, setLike] = useState(false);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [searchedStatus, setSearchedStatus] = useState();
  const [pi, setPi] = useState({});
  const [pi1, setPi1] = useState({});
  console.log(reqPage);
  console.log(reqPage1);
  useEffect(() => {
    axios
      .get(`${backServer}/board/searchBoardList/${reqPage}/${searched}`)
      .then((res) => {
        console.log(res);
        if (reqPage != 1) {
          const array = boardList.concat(res.data.list);
          setBoardList(array);
          setPi(res.data.pi);
        } else {
          setBoardList(res.data.list);
          setPi(res.data.pi);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, searchedStatus]);
  useEffect(() => {
    axios
      .get(`${backServer}/product/searchMarketList/${reqPage1}/${searched}`)
      .then((res) => {
        console.log(res);
        if (reqPage1 != 1) {
          const array = productList.concat(res.data.list);
          setProductList(array);
          setPi1(res.data.pi);
        } else {
          setProductList(res.data.list);
          setPi1(res.data.pi);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage1, searchedStatus]);
  const changeSearchKeyWord = (e) => {
    setSearchKeyWord(e.target.value);
  };
  return (
    <section className="section search-all-wrap">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="search-wrap">
          <div className="search-input-wrap">
            <button
              className="search-btn"
              onClick={() => {
                setSearchedStatus(!searchedStatus);
                navigate(`/searchResult/${searched}`);
              }}
            >
              <img src="/image/paw.png" className="search-icon" />
            </button>
            <input
              type="text"
              className="search-input"
              placeholder="검색어를 입력하세요"
              value={searched}
              onChange={changeSearchKeyWord}
            ></input>
          </div>
        </div>
      </form>
      <div className="search-result-wrap">
        <div className="search-result">
          <div className="search-result-detail">
            <div className="search-result-title">
              <span>마켓</span>

              <div className="productList-content">
                {productList.length !== 0 ? (
                  productList.map((product, i) => {
                    return (
                      <ProductResult
                        key={"product-" + i}
                        product={product}
                        loginEmail={loginEmail}
                        setLoginEmail={setLoginEmail}
                        setLike={setLike}
                        like={like}
                      />
                    );
                  })
                ) : (
                  <div
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "#ffbe58",
                      textAlign: "center",
                      width: "100%",
                      padding: "30px 30px",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "20px",
                      margin: "10px auto",
                    }}
                  >
                    조회 된 제품이 없습니다
                  </div>
                )}
              </div>
              {reqPage1 !== pi1.totalPage && productList.length !== 0 ? (
                <span className="more-list" style={{ width: "100px" }}>
                  <MorePage
                    pi={pi1}
                    reqPage={reqPage1}
                    setReqPage={setReqPage1}
                  />
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="search-result-detail">
            <div className="search-result-title">
              <span>게시판</span>
              <div className="board-list-wrap" style={{ marginTop: "20px" }}>
                <ul className="posting-wrap">
                  {boardList.length !== 0 ? (
                    boardList.map((board, i) => {
                      return <BoardResult key={"board-" + i} board={board} />;
                    })
                  ) : (
                    <div
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#ffbe58",
                        textAlign: "center",
                        width: "95%",
                        padding: "30px 30px",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "20px",
                        margin: "10px auto",
                      }}
                    >
                      조회 된 게시물이 없습니다
                    </div>
                  )}
                </ul>
              </div>
              {reqPage !== pi.totalPage && boardList.length !== 0 ? (
                <span className="more-list" style={{ width: "100px" }}>
                  <MorePage pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BoardResult = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const board = props.board;
  const navigate = useNavigate();

  return (
    <li
      className="posting-item"
      onClick={() => {
        navigate(`/board/view/${board.boardNo}`);
      }}
    >
      <div className="list-list">
        <div className="posting-info start">
          <div className="posting-tag">
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
                ? "#오산완"
                : "#전체"}
            </div>
            <div>{board.boardTitle}</div>
          </div>
          <div className="posting-sub-info">
            <div>{board.memberNickname}</div>
            <div>
              <TfiTimer />
              {board.regDate}
            </div>
            <div>
              <TbEye />
              {board.readCount}
            </div>
            <div>
              <AiIcons.AiFillHeart />
              {board.boardLike}
            </div>
          </div>
        </div>
        <div className="end">
          <div className="posting-img">
            {board.boardThumb ? (
              <img src={`${backServer}/board/thumb/${board.boardThumb}`}></img>
            ) : (
              ""
            )}
          </div>
          <div className="reply-count">
            <div>{board.replyCount}</div>
            <div>댓글</div>
          </div>
        </div>
      </div>
    </li>
  );
};

const ProductResult = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const product = props.product;
  const loginEmail = props.loginEmail;
  const navigate = useNavigate();
  const like = props.like;
  const setLike = props.setLike;
  const likePush = () => {
    axios
      .post(`${backServer}/product/changeLike/${loginEmail}`, product)
      .then((res) => {
        console.log(res);
        if (res.data == 3) {
          //insert됨
          product.isLike = 1;
        } else if (res.data == 2) {
          //delete됨
          product.isLike = 0;
        }
        setLike(!like);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="product-wrap">
      <div className="product-thumb">
        <div className="product-like" onClick={likePush}>
          {product.isLike == 1 ? <FaHeart /> : <FaRegHeart />}
        </div>
        <img
          src={
            product.productThumb
              ? `${backServer}/product/thumb/${product.productThumb}`
              : "/image/basicimage.png"
          }
          onClick={() => {
            navigate(`/market/main/productDetail/${product.productNo}/detail`);
          }}
        />
      </div>
      <div className="product-info">
        <div className="product-name">{product.productName}</div>
        <div className="product-price">{product.productPrice}</div>
      </div>
    </div>
  );
};
export default SearchResult;
