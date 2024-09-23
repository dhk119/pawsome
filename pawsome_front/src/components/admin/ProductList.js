import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isLoginState } from "../utils/RecoilData";
import { Link } from "react-router-dom";
import PageNavi from "../utils/PageNavi";

const ProductList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [productList, setProductList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const isLogin = useRecoilValue(isLoginState);
  useEffect(() => {
    axios.get(`${backServer}/admin/productList/${reqPage}`).then((res) => {
      setProductList(res.data.list);
      setPi(res.data.pi);
    });
  }, [reqPage]);
  return (
    <section>
      <div>제품 리스트</div>
      {isLogin ? <Link to="/admin/productRegist">제품등록</Link> : ""}
      <table>
        <thead>
          <tr>
            <th>제품번호</th>
            <th>제품명</th>
            <th>타입</th>
            <th>카테고리</th>
            <th>가격</th>
            <th>썸네일</th>
            <th>제품상세</th>
            <th>등록일</th>
            <th>상품등록</th>
            <th>등록 관리자</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, i) => {
            return (
              <tr key={"product" + i}>
                <td>{product.productNo}</td>
                <td>{product.productName}</td>
                <td>{product.typeCategory}</td>
                <td>{product.mainCategory}</td>
                <td>{product.productPrice}</td>
                <td>
                  <img
                    src={`${backServer}/product/thumb/${product.productThumb}`}
                  ></img>
                </td>
                <td>{product.productDetail}</td>
                <td>{product.productRegDate}</td>
                <td>{product.productShow}</td>
                <td>{product.memberEmail}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ul>
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </ul>
    </section>
  );
};
export default ProductList;
