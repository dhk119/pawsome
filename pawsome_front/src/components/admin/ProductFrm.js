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
  const productDetail = props.productDetail;
  const setProductDetail = props.setProductDetail;
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
      setProductThumb("");
      setProductImg("");
    }
  };
  return (
    <div>
      <div>
        <table className="tbl">
          <thead></thead>
          <tbody>
            <tr>
              <th>
                <label htmlFor="productName">제품명</label>
              </th>
              <td>
                <div className="input-item">
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={productName}
                    onChange={setProductName}
                  ></input>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="productCompany">제품 브랜드</label>
              </th>
              <td>
                <div className="input-item">
                  <input
                    type="text"
                    id="productCompany"
                    name="productCompany"
                    value={productCompany}
                    onChange={setProductCompany}
                  ></input>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="typeCategory">제품 품종</label>
              </th>
              <td>
                <div className="input-item">
                  <input
                    type="text"
                    id="typeCategory"
                    name="typeCategory"
                    value={typeCategory}
                    onChange={setTypeCategory}
                  ></input>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="mainCategory">제품 메인 카테고리</label>
              </th>
              <td>
                <div className="input-item">
                  <input
                    type="text"
                    id="mainCategory"
                    name="mainCategory"
                    value={mainCategory}
                    onChange={setMainCategory}
                  ></input>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="subCategory">제품 서브 카테고리</label>
              </th>
              <td>
                <div className="input-item">
                  <input
                    type="text"
                    id="subCategory"
                    name="subCategory"
                    value={subCategory}
                    onChange={setSubCategory}
                  ></input>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="productPrice">제품 가격</label>
              </th>
              <td>
                <div className="input-item">
                  <input
                    type="text"
                    id="productPrice"
                    name="productPrice"
                    value={productPrice}
                    onChange={setProductPrice}
                  ></input>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="productDetail">제품 상세정보</label>
              </th>
              <td>
                <div className="input-item">
                  <input
                    type="text"
                    id="productDetail"
                    name="productDetail"
                    value={productDetail}
                    onChange={setProductDetail}
                  ></input>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="productShow">제품 등록 여부</label>
              </th>
              <td>
                <div className="input-item">
                  <input
                    type="text"
                    id="productShow"
                    name="productShow"
                    value={productShow}
                    onChange={setProductShow}
                  ></input>
                </div>
              </td>
            </tr>
            <tr>
              <th>제품 등록 관리자 이메일</th>
              <td>{memberEmail}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductFrm;
