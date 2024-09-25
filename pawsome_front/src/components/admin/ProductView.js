import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductFrm from "./ProductFrm";

const ProductView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const productNo = params.productNo;
  const [productName, setProductName] = useState("");
  const [typeCategory, setTypeCategory] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [thumb, setThumb] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [productShow, setProductShow] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const inputName = (e) => {
    setProductName(e.target.value);
    setProduct({ ...product, productName: e.target.value });
  };
  const inputTypeCategory = (e) => {
    setTypeCategory(e.target.value);
    setProduct({ ...product, typeCategory: e.target.value });
  };
  const inputMainCategory = (e) => {
    setMainCategory(e.target.value);
    setProduct({ ...product, mainCategory: e.target.value });
  };
  const inputPrice = (e) => {
    setProductPrice(e.target.value);
    setProduct({ ...product, productPrice: e.target.value });
  };
  const inputDetail = (e) => {
    setProductDetail(e.target.value);
    setProduct({ ...product, productDetail: e.target.value });
  };
  const inputShow = (e) => {
    setProductShow(e.target.value);
    setProduct({ ...product, productShow: e.target.value });
  };
  useEffect(() => {
    axios.get(`${backServer}/admin/productNo/${productNo}`).then((res) => {
      setProduct(res.data);
    });
  }, []);
  return (
    <>
      <div className="admin-title">제품 수정</div>
      <form
        className="product-regist-frm"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <ProductFrm
          productName={productName}
          setProductName={inputName}
          typeCategory={typeCategory}
          setTypeCategory={inputTypeCategory}
          mainCategory={mainCategory}
          setMainCategory={inputMainCategory}
          productPrice={productPrice}
          setProductPrice={inputPrice}
          productThumb={thumb}
          setProductThumb={setThumb}
          productDetail={productDetail}
          setProductDetail={inputDetail}
          productShow={productShow}
          setProductShow={inputShow}
          memberEmail={memberEmail}
        ></ProductFrm>
        <div className="admin-button-zone">
          <button type="submit" className="admin-write-submit">
            등록하기
          </button>
        </div>
      </form>
    </>
  );
};
export default ProductView;
