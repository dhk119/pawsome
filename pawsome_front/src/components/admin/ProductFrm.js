import { useState } from "react";

const ProductFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const productName = props.productName;
  const setProductName = props.setProductName;
  const productCompany = props.productCompany;
  const setProductCompany = props.setProductCompany;
  const typeCategory = props.typeCategory;
  const setTypeCategory = props.setTypeCategory;
  const mainCategory = props.mainCategory;
  const setMainCategory = props.setMainCategory;
  const subCategory = props.subCategory;
  const setSubCategory = props.setSubCategory;
  const productPrice = props.productPrice;
  const setProductPrice = props.setProductPrice;
  const productThumb = props.productThumb;
  const setProductThumb = props.setProductThumb;
  const productDetail = props.setProductThumb;
  const setProductDetail = props.setProductDetail;
  const productRegDate = props.productRegDate;
  const setProductRegDate = props.setProductRegDate;
  const productShow = props.productShow;
  const setProductShow = props.setProductShow;
  const memberEmail = props.memberEmail;
  const [productImg, setProductImg] = useState(null);
  const changeThumb = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] !== 0) {
      setProductThumb(files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setProductImg = reader.result;
      };
    } else {
      setProductThumb();
      setProductImg();
    }
  };
  return (
    <div>
      <div></div>
    </div>
  );
};
export default ProductFrm;
