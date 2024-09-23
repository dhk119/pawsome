import { useState } from "react";
import ProductFrm from "./ProductFrm";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import axios from "axios";

const ProductRegist = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [product, setProduct] = useState({
    productNo: 0,
    productName: "",
    productCompany: "",
    typeCategory: 0,
    mainCategory: "",
    subCategory: "",
    productPrice: 0,
    productThumb: "",
    productDetail: "",
    productRegDate: "",
    productShow: "",
    memberEmail: "",
  });
  const [productName, setProductName] = useState("");
  const [productCompany, setProductCompany] = useState("");
  const [typeCategory, setTypeCategory] = useState(0);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [thumb, setThumb] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [productShow, setProductShow] = useState("");
  const [memberEmail, setMemberEmail] = useRecoilState(loginEmailState);
  const inputName = (e) => {
    setProductName(e.target.value);
    setProduct({ ...product, productName: e.target.value });
  };
  const inputCompany = (e) => {
    setProductCompany(e.target.value);
    setProduct({ ...product, productCompany: e.target.value });
  };
  const inputTypeCategory = (e) => {
    setTypeCategory(e.target.value);
    setProduct({ ...product, typeCategory: e.target.value });
  };
  const inputMainCategory = (e) => {
    setMainCategory(e.target.value);
    setProduct({ ...product, mainCategory: e.target.value });
  };
  const inputSubCategory = (e) => {
    setSubCategory(e.target.value);
    setProduct({ ...product, subCategory: e.target.value });
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
      productCompany !== "" &&
      typeCategory !== 0 &&
      mainCategory !== "" &&
      subCategory !== "" &&
      productPrice !== 0 &&
      thumb !== "" &&
      productDetail !== "" &&
      productShow !== ""
    ) {
      const form = new FormData();
      form.append("productName", productName);
      form.append("productCompany", productCompany);
      form.append("typeCategory", typeCategory);
      form.append("mainCategory", mainCategory);
      form.append("subCategory", subCategory);
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
        .then((res) => {});
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
          productCompany={productCompany}
          setProductCompany={inputCompany}
          typeCategory={typeCategory}
          setTypeCategory={inputTypeCategory}
          mainCategory={mainCategory}
          setMainCategory={inputMainCategory}
          subCategory={subCategory}
          setSubCategory={inputSubCategory}
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
