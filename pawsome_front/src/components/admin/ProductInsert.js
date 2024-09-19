import { useState } from "react";

const ProductInsert = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
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
  return (
    <>
      <div></div>
    </>
  );
};
export default ProductInsert;
