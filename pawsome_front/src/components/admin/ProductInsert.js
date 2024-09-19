import { useState } from "react";

const ProductInsert = () => {
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
  const [productRegDate, setProductRegDate] = useState("");
  const [productShow, setProductShow] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
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
  const inputRegDate = (e) => {
    setProductRegDate(e.target.value);
  };
  const inputShow = (e) => {
    setProductShow(e.target.value);
  };
  return (
    <>
      <div></div>
    </>
  );
};
export default ProductInsert;
