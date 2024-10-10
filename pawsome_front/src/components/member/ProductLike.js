import { useState, useEffect } from "react";
import axios from "axios";
import { loginEmailState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import PageNavi from "../utils/PageNavi";
import { useNavigate } from "react-router-dom";

const ProductLike = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [productLike, setProductLike] = useState([]);
  const [reqPage, setReqPage] = useState(1); // 현재 페이지
  const [loginEmail] = useRecoilState(loginEmailState);
  const [pi, setPi] = useState({}); // PageInfo 객체
  const navigate = useNavigate();

  useEffect(() => {
    if (loginEmail) {
      axios
        .get(`${backServer}/member/product-like/${reqPage}`, {
          params: { email: loginEmail },
        })
        .then((res) => {
          console.log(res.data);
          setProductLike(res.data.list);
          setPi(res.data.pi);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loginEmail, reqPage]);

  return (
    <div className="product-like-list">
      <h2 className="product-list__title">좋아요한 상품 목록</h2>
      <ul className="product-list__items">
        {productLike.length > 0 ? (
          productLike.map((item, index) => (
            <li
              className="product-list__item"
              key={index}
              onClick={() =>
                navigate(
                  `/market/main/productDetail/${item.product.productNo}/detail`
                )
              }
            >
              <img
                className="product-list__thumb"
                src={`${backServer}/product/thumb/${item.product.productThumb}`}
                alt={item.product.productName}
              />
              <div className="product-list__name">
                {item.product.productName}
              </div>
              <div className="product-list__price">
                가격: {item.product.productPrice}원
              </div>
            </li>
          ))
        ) : (
          <div className="product-list__empty">좋아요한 상품이 없습니다.</div>
        )}
      </ul>

      <div className="like-page">
        {pi && pi.totalPage > 1 && (
          <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        )}
      </div>
    </div>
  );
};

export default ProductLike;
