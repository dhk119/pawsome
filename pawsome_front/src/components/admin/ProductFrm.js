import { useEffect, useRef, useState } from "react";
import QuillEditor from "../utils/QuillEditor";

const ProductFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const productName = props.productName;
  const setProductName = props.setProductName;
  const typeCategory = props.typeCategory;
  const setTypeCategory = props.setTypeCategory;
  const mainCategory = props.mainCategory;
  const setMainCategory = props.setMainCategory;
  const productPrice = props.productPrice;
  const setProductPrice = props.setProductPrice;
  const thumb = props.thumb;
  const setThumb = props.setThumb;
  const productThumb = props.productThumb;
  const setProductThumb = props.setProductThumb;
  const productDetail = props.productDetail;
  const setProductDetail = props.setProductDetail;
  const productShow = props.productShow;
  const setProductShow = props.setProductShow;
  const memberEmail = props.memberEmail;
  const [productImg, setProductImg] = useState(null);
  const thumbnailRef = useRef(null);
  const changeThumb = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] !== 0) {
      setThumb(files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setThumb("");
      setProductImg("");
    }
  };
  return (
    <div>
      <div className="admin-product-regist-wrap">
        <div className="admin-thumb-wrap">
          {productImg ? (
            <img
              src={productImg}
              onClick={() => {
                thumbnailRef.current.click();
              }}
            ></img>
          ) : productThumb ? (
            <img
              src={`${backServer}/product/thumb/${productThumb}`}
              onClick={() => {
                thumbnailRef.current.click();
              }}
              className="regist-img-width"
            ></img>
          ) : (
            <img
              src="/image/default_img.png"
              onClick={() => {
                thumbnailRef.current.click();
              }}
            ></img>
          )}
          <input
            ref={thumbnailRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={changeThumb}
          ></input>
        </div>
        <div className="admin-product-wrap">
          <div>
            <label htmlFor="productName" className="admin-product-label">
              제품명
            </label>
          </div>
          <div>
            <div className="admin-input-item">
              <input
                type="text"
                id="productName"
                name="productName"
                value={productName}
                onChange={setProductName}
              ></input>
            </div>
          </div>
        </div>
        <div className="admin-product-wrap">
          <div>
            <div className="admin-product-label">제품 품종</div>
          </div>
          {typeCategory !== 1 && typeCategory !== 2 ? (
            <div className="admin-input-wrap">
              <label htmlFor="dog">강아지</label>
              <input
                type="radio"
                id="dog"
                name="typeCategory"
                value={1}
                onChange={setTypeCategory}
              ></input>
              <label htmlFor="cat">고양이</label>
              <input
                type="radio"
                id="cat"
                name="typeCategory"
                value={2}
                onChange={setTypeCategory}
              ></input>
            </div>
          ) : typeCategory == 1 ? (
            <div className="admin-input-wrap">
              <label htmlFor="dog">강아지</label>
              <input
                type="radio"
                id="dog"
                name="typeCategory"
                value={1}
                onChange={setTypeCategory}
                checked
              ></input>
              <label htmlFor="cat">고양이</label>
              <input
                type="radio"
                id="cat"
                name="typeCategory"
                value={2}
                onChange={setTypeCategory}
              ></input>
            </div>
          ) : (
            <div className="admin-input-wrap">
              <label htmlFor="dog">강아지</label>
              <input
                type="radio"
                id="dog"
                name="typeCategory"
                value={1}
                onChange={setTypeCategory}
              ></input>
              <label htmlFor="cat">고양이</label>
              <input
                type="radio"
                id="cat"
                name="typeCategory"
                value={2}
                onChange={setTypeCategory}
                checked
              ></input>
            </div>
          )}
        </div>
        <div className="admin-product-wrap">
          <div>
            <label htmlFor="mainCategory" className="admin-product-label">
              제품 메인 카테고리
            </label>
          </div>
          <div>
            <div className="admin-input-item">
              <input
                type="text"
                id="mainCategory"
                name="mainCategory"
                value={mainCategory}
                onChange={setMainCategory}
              ></input>
            </div>
          </div>
        </div>
        <div className="admin-product-wrap">
          <div>
            <label htmlFor="productPrice" className="admin-product-label">
              제품 가격
            </label>
          </div>
          <div>
            <div className="admin-input-item">
              <input
                type="text"
                id="productPrice"
                name="productPrice"
                value={productPrice}
                onChange={setProductPrice}
              ></input>
            </div>
          </div>
        </div>
        <div className="admin-product-wrap">
          <div>
            <div className="admin-product-label">제품 상세정보</div>
          </div>
          <div>
            <div className="admin-product-quill-editor">
              <QuillEditor
                content={productDetail}
                setContent={setProductDetail}
                id="admin-product-quill"
              ></QuillEditor>
            </div>
          </div>
        </div>
        <div className="admin-product-wrap">
          <div>
            <div className="admin-product-label">등록여부</div>
          </div>
          {productShow !== "Y" && productShow !== "N" ? (
            <div className="admin-input-wrap">
              <label htmlFor="show">등록</label>
              <input
                type="radio"
                id="show"
                name="productShow"
                value={"Y"}
                onChange={setProductShow}
              ></input>
              <label htmlFor="hidden">미등록</label>
              <input
                type="radio"
                id="hidden"
                name="productShow"
                value={"N"}
                onChange={setProductShow}
              ></input>
            </div>
          ) : productShow === "Y" ? (
            <div className="admin-input-wrap">
              <label htmlFor="show">등록</label>
              <input
                type="radio"
                id="show"
                name="productShow"
                value={"Y"}
                onChange={setProductShow}
                checked
              ></input>
              <label htmlFor="hidden">미등록</label>
              <input
                type="radio"
                id="hidden"
                name="productShow"
                value={"N"}
                onChange={setProductShow}
              ></input>
            </div>
          ) : (
            <div className="admin-input-wrap">
              <label htmlFor="show">등록</label>
              <input
                type="radio"
                id="show"
                name="productShow"
                value={"Y"}
                onChange={setProductShow}
              ></input>
              <label htmlFor="hidden">미등록</label>
              <input
                type="radio"
                id="hidden"
                name="productShow"
                value={"N"}
                onChange={setProductShow}
                checked
              ></input>
            </div>
          )}
        </div>
        <div className="admin-product-wrap">
          <div className="admin-product-label">제품 등록 관리자 이메일</div>
          <div>{memberEmail}</div>
        </div>
      </div>
    </div>
  );
};
export default ProductFrm;
