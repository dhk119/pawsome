import { useState } from "react";
import ProductFrm from "./ProductFrm";

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
  const [productThumb, setProductThumb] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [productRegDate, setProductRegDate] = useState("date");
  const [productShow, setProductShow] = useState("");
  const [memberEmail, setMemberEmail] = useState("loginEmail");
  const inputName = (e) => {
    setProductName(e.target.value);
  };
  const inputCompany = (e) => {
    setProductCompany(e.target.value);
  };
  const inputTypeCategory = (e) => {
    setTypeCategory(e.target.value);
  };
  const inputMainCategory = (e) => {
    setMainCategory(e.target.value);
  };
  const inputSubCategory = (e) => {
    setSubCategory(e.target.value);
  };
  const inputPrice = (e) => {
    setProductPrice(e.target.value);
  };
  const inputThumb = (e) => {
    setProductThumb(e.target.value);
  };
  const inputDetail = (e) => {
    setProductDetail(e.target.value);
  };
  const inputShow = (e) => {
    setProductShow(e.target.value);
  };
  const registProduct = () => {
    if (
      productName !== "" &&
      productCompany !== "" &&
      typeCategory !== 0 &&
      mainCategory !== "" &&
      subCategory !== "" &&
      productPrice !== 0 &&
      productThumb !== "" &&
      productDetail !== "" &&
      productRegDate !== "" &&
      productShow !== ""
    ) {
      setProduct({
        productName: productName,
        productCompany: productCompany,
        typeCategory: typeCategory,
        mainCategory: mainCategory,
        subCategory: subCategory,
        productPrice: productPrice,
        productThumb: productThumb,
        productDetail: productDetail,
        productRegDate: productRegDate,
        productShow: productShow,
        memberEmail: memberEmail,
      });
      console.log(product);
    }
  };
  return (
    <>
      <div className="page-title">제품 등록</div>
      <form
        className="product-regist-frm"
        onSubmit={(e) => {
          e.preventDefault();
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
            productThumb={productThumb}
            setProductThumb={inputThumb}
            productDetail={productDetail}
            setProductDetail={inputDetail}
          ></ProductFrm>;
        }}
      ></form>
    </>
  );
};
export default ProductRegist;
