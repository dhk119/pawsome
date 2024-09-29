import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Detail from "./tabComponent/Detail";
import Review from "./tabComponent/Review";
import Qna from "./tabComponent/Qna";
import Guide from "./tabComponent/Guide";
import "./tab.css";
import axios from "axios";
import QuantityInput from "./QuantityInput";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams(); //주소창에 데이터 가져오기
  const productNo = params.productNo;
  console.log(productNo);
  const [product, setProduct] = useState({});
  const [currentTab, setCurrentTab] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  useEffect(() => {
    axios
      .get(`${backServer}/product/productDetail/${productNo}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
        setTotal(res.data.productPrice);
        setProductPrice(res.data.productPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  const changeType = () => {
    navigate(`/market/main/productList/${product.typeCategory}/all`);
  };
  const changeMain = () => {
    navigate(
      `/market/main/productList/${product.typeCategory}/${product.mainCategory}`
    );
  };

  /* 수량 */
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const stock = 15; //수량 제한 기준
  const handleClickCounter = (num) => {
    setQuantity(quantity + num);
    setTotal(product.productPrice * (quantity + num));
  };
  /* 탭 */
  const tabArr = [
    { name: "상세정보", content: "상품 상세정보", url: "detail" },
    { name: "상품평", content: "상품 리뷰", url: "review" },
    { name: "상품문의", content: "상품 Q&A", url: "qna" },
    { name: "주문/배송 안내", content: "주문/배송 안내", url: "guide" },
  ];
  const selectTapHandler = (index) => {
    setCurrentTab(index);
  };
  /* 장바구니 */
  const cart = () => {
    const form = new FormData();
    form.append("productNo", productNo);
    form.append("productCartCount", quantity);
    form.append("memberEmail", loginEmail);
    Swal.fire({
      title: "장바구니에 담으시겠습니까?",
      html: `상품명 : ${product.productName}</br>상품수량 : ${quantity}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ffa518",
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${backServer}/payment/cart`, form)
          .then((res) => {
            console.log(res);
            if (res.data) {
              Swal.fire({
                title: "장바구니 담기 성공",
                html: "해당 상품을 장바구니에 담았습니다.</br>장바구니로 이동하시겠습니까?",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#ffa518",
                confirmButtonText: "예",
                cancelButtonText: "아니오",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/market/main/cart");
                }
              });
            } else {
              Swal.fire({
                title: "장바구니 담기 실패",
                text: "나중에 다시 시도해주세요.",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <section className="section productList-wrap">
      <div className="productDetail-wrap">
        <div className="line"></div>
        <div className="page-title">상세정보</div>
        <div className="productDetail">
          <div className="product-thumb">
            <img
              src={
                product.productThumb
                  ? `${backServer}/product/thumb/${product.productThumb}`
                  : "/image/basicimage.png"
              }
            />
          </div>
          <div className="product-info">
            <div className="product-category">
              <span className="typeCategory" onClick={changeType}>
                {product.typeCategory === 1
                  ? "댕댕이"
                  : product.typeCategory === 2
                  ? "냥냥이"
                  : "전체"}
              </span>
              <span> {">"} </span>
              <span className="mainCategory" onClick={changeMain}>
                {product.mainCategory === "feed"
                  ? "사료"
                  : product.mainCategory === "snack"
                  ? "간식"
                  : product.mainCategory === "nutrient"
                  ? "영양제"
                  : product.mainCategory === "tableware"
                  ? "식기용품"
                  : product.mainCategory === "hygiene"
                  ? "위생용품"
                  : product.mainCategory === "toy"
                  ? "장난감"
                  : product.mainCategory === "fashion"
                  ? "패션"
                  : "하우스"}
              </span>
            </div>
            <div className="product-name">{product.productName}</div>
            <div className="product-price">
              {productPrice.toLocaleString("ko-KR")}원
            </div>
            <div className="product-amount">
              <div className="product-amount-wrap">
                <table className="amount-tbl">
                  <tbody>
                    <tr>
                      <th>상세옵션</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th>배송비</th>
                      <td>3,000원 (30,000원 이상 구매시, 무료 배송)</td>
                    </tr>
                    <tr>
                      <th>주문 수량 안내</th>
                      <td>
                        최소 주문수량 1개 이상, 최대 주문수량 {stock}개 이하
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                cart();
              }}
            >
              <div className="product-totalprice">
                <QuantityInput
                  quantity={quantity}
                  onClick={handleClickCounter}
                  stock={stock}
                />
                <span>Total | {total.toLocaleString("ko-KR")}원</span>
              </div>

              <div className="product-btn">
                <button type="submit">장바구니 담기</button>
                <button type="button">바로 구매</button>
                <button type="button">관심상품</button>
              </div>
            </form>
          </div>
        </div>
        <div className="detail-menu-wrap">
          {tabArr.map((item, index) => {
            return (
              <NavLink key={index} to={item.url}>
                <li
                  className={currentTab === index ? "tab active-tab" : "tab"}
                  onClick={() => selectTapHandler(index)}
                >
                  {item.name}
                </li>
              </NavLink>
            );
          })}
        </div>
        <div className="tab-content">
          {/* <span>{tabArr[currentTab].content}</span> */}
          <Routes>
            <Route path="detail" element={<Detail />} />
            <Route path="review" element={<Review />} />
            <Route path="qna" element={<Qna />} />
            <Route path="guide" element={<Guide />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
