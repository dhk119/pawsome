import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageNavi from "../utils/PageNavi";
import { Switch } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ProductList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [type, setType] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [option, setOption] = useState("A");
  const [search, setSearch] = useState(0);
  useEffect(() => {
    search === 0
      ? axios.get(`${backServer}/admin/productList/${reqPage}`).then((res) => {
          setProductList(res.data.list);
          setPi(res.data.pi);
        })
      : keyword
      ? axios
          .get(
            `${backServer}/admin/searchProduct/${reqPage}/${type}/${keyword}/${option}`
          )
          .then((res) => {
            setProductList(res.data.list);
            setPi(res.data.pi);
          })
      : axios
          .get(`${backServer}/admin/searchProduct/${reqPage}/${option}`)
          .then((res) => {
            setProductList(res.data.list);
            setPi(res.data.pi);
          });
  }, [reqPage, search]);
  const changeShow = (i, productShow) => {
    productList[i].productShow = productShow;
    setProductList([...productList]);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffa518",
      },
    },
  });
  const changeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const changeType = (e) => {
    setType(e.target.value);
  };
  const searchProduct = () => {
    if (!keyword && option === "A") {
      setSearch(0);
    } else {
      setSearch(search + 1);
      setReqPage(1);
    }
  };
  const changeOption = (e) => {
    setOption(e.target.value);
  };
  return (
    <section>
      <div className="admin-title">제품 리스트</div>
      <div className="admin-write-wrap">
        <div className="admin-top-left">
          <div className="admin-write">
            <Link to="/admin/productRegist" id="link-product-regist">
              제품등록
            </Link>
          </div>
        </div>
        <div className="admin-top-mid"></div>
        <div className="admin-search-wrap">
          <div className="inquiry-keyword">
            <label htmlFor="option"></label>
            <select id="option" value={option} onChange={changeOption}>
              <option value={"A"}>전체</option>
              <option value={"Y"}>등록</option>
              <option value={"N"}>미등록</option>
            </select>
            <label htmlFor="type"></label>
            <select id="type" value={type} onChange={changeType}>
              <option value={"all"}>전체</option>
              <option value={"name"}>제품명</option>
              <option value={"category"}>카테고리</option>
              <option value={"price"}>가격</option>
            </select>
          </div>
          <div className="search-input-wrap" id="inquiry-search">
            <button
              type="button"
              className="search-btn"
              onClick={searchProduct}
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
            <th>제품번호</th>
            <th>제품명</th>
            <th>타입</th>
            <th>카테고리</th>
            <th>가격</th>
            <th>썸네일</th>
            <th>등록일</th>
            <th>상품등록</th>
            <th>등록 관리자 이메일</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, i) => {
            const viewNavigate = () => {
              navigate(`/admin/productView/${product.productNo}`);
            };
            const handleChange = () => {
              const productShow = product.productShow === "Y" ? "N" : "Y";
              const obj = {
                productNo: product.productNo,
                productShow: productShow,
              };
              axios
                .patch(`${backServer}/admin/product`, obj)
                .then((res) => {
                  changeShow(i, productShow);
                })
                .catch(() => {});
              changeShow(i, productShow);
            };
            return (
              <tr key={"product" + i}>
                <td
                  onClick={() => {
                    viewNavigate();
                  }}
                >
                  {product.productNo}
                </td>
                <td
                  onClick={() => {
                    viewNavigate();
                  }}
                >
                  {product.productName}
                </td>
                <td
                  onClick={() => {
                    viewNavigate();
                  }}
                >
                  {product.typeCategory === 1 ? "강아지" : "고양이"}
                </td>
                <td
                  onClick={() => {
                    viewNavigate();
                  }}
                >
                  {product.mainCategory}
                </td>
                <td
                  onClick={() => {
                    viewNavigate();
                  }}
                >
                  {product.productPrice}
                </td>
                <td>
                  <img
                    src={`${backServer}/product/thumb/${product.productThumb}`}
                    style={{ width: "100%", height: "100%" }}
                  ></img>
                </td>
                <td
                  onClick={() => {
                    viewNavigate();
                  }}
                >
                  {product.productRegDate}
                </td>
                <td>
                  <ThemeProvider theme={theme}>
                    <Switch
                      checked={product.productShow === "Y"}
                      onChange={handleChange}
                      defaultChecked
                      color="primary"
                      id="admin-product-list-switch"
                    />
                  </ThemeProvider>
                </td>
                <td
                  onClick={() => {
                    viewNavigate();
                  }}
                >
                  {product.memberEmail}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pageNavi-frm">
        <ul className="pageNavi-ul">
          <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        </ul>
      </div>
    </section>
  );
};
export default ProductList;
