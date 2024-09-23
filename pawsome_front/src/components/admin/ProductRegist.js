import { useState } from "react";
import ProductFrm from "./ProductFrm";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductRegist = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productNo: 0,
    productName: "",
    typeCategory: 0,
    mainCategory: "",
    productPrice: null,
    productThumb: "",
    productDetail: "",
    productRegDate: "",
    productShow: "",
    memberEmail: "",
  });
  const [productName, setProductName] = useState("");
  const [typeCategory, setTypeCategory] = useState(0);
  const [mainCategory, setMainCategory] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [thumb, setThumb] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [productShow, setProductShow] = useState("");
  const [memberEmail, setMemberEmail] = useRecoilState(loginEmailState);
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
  const registProduct = () => {
    if (
      productName !== "" &&
      typeCategory !== 0 &&
      mainCategory !== "" &&
      productPrice !== 0 &&
      thumb !== "" &&
      productDetail !== "" &&
      productShow !== ""
    ) {
      const form = new FormData();
      form.append("productName", productName);
      form.append("typeCategory", typeCategory);
      form.append("mainCategory", mainCategory);
      form.append("productPrice", productPrice);
      form.append("thumb", thumb);
      form.append("productDetail", productDetail);
      form.append("productShow", productShow);
      form.append("memberEmail", memberEmail);
      axios
        .post(`${backServer}/admin`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          navigate("/admin/productList");
        })
        .catch((err) => {});
    } else {
      Swal.fire({
        text: "누락된 입력 값이 있습니다",
        icon: "info",
        iconColor: "var(--main1)",
        confirmButtonColor: "var(--point1)",
      });
    }
  };
  return (
    <>
      <div className="page-title">제품 등록</div>
      <form
        className="product-regist-frm"
        onSubmit={(e) => {
          e.preventDefault();
          registProduct();
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
        <div className="button-zone">
          <button type="submit">등록하기</button>
        </div>
      </form>
    </>
  );
};
export default ProductRegist;
