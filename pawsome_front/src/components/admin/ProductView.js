import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductFrm from "./ProductFrm";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { memberLevelState } from "../utils/RecoilData";
import Interceptor from "./Interceptor";

const ProductView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const productNo = params.productNo;
  const [productName, setProductName] = useState("");
  const [typeCategory, setTypeCategory] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [thumb, setThumb] = useState("");
  const [productThumb, setProductThumb] = useState("");
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
  const inputShow = (e) => {
    setProductShow(e.target.value);
    setProduct({ ...product, productShow: e.target.value });
  };
  useEffect(() => {
    axios.get(`${backServer}/admin/productNo/${productNo}`).then((res) => {
      setProductName(res.data.productName);
      setProductDetail(res.data.productDetail);
      setProductPrice(res.data.productPrice);
      setProductShow(res.data.productShow);
      setProductThumb(res.data.productThumb);
      setMainCategory(res.data.mainCategory);
      setTypeCategory(res.data.typeCategory);
      setMemberEmail(res.data.memberEmail);
    });
  }, []);
  const updateProduct = () => {
    if (productPrice && !Number(productPrice)) {
      Swal.fire({
        text: "가격에는 숫자만 입력 가능합니다.",
        icon: "info",
        iconColor: "var(--main1)",
        confirmButtonColor: "var(--point1)",
      });
    } else if (
      productName !== "" &&
      typeCategory !== "" &&
      mainCategory !== "" &&
      productPrice !== 0 &&
      productPrice !== "" &&
      (thumb !== "" || (productThumb !== null && productThumb !== "")) &&
      productDetail !== "<p><br></p>" &&
      productShow !== ""
    ) {
      const form = new FormData();
      form.append("productNo", productNo);
      form.append("productName", productName);
      form.append("typeCategory", typeCategory);
      form.append("mainCategory", mainCategory);
      form.append("productPrice", productPrice);
      form.append("productDetail", productDetail);
      form.append("productShow", productShow);
      form.append("memberEmail", memberEmail);
      if (thumb !== "") {
        form.append("thumb", thumb);
      } else if (productThumb !== null && productThumb !== "") {
        form.append("productThumb", productThumb);
      }
      axios
        .patch(`${backServer}/admin`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          Swal.fire({
            text: "수정 완료",
            icon: "success",
            iconColor: "var(--main1)",
            confirmButtonColor: "var(--point1)",
          });
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
  const deleteProduct = () => {
    Swal.fire({
      text: "제품을 삭제하시겠습니까?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      confirmButtonColor: "var(--point1)",
      cancelButtonColor: "var(--main1)",
      iconColor: "var(--main2)",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${backServer}/admin/productNo/${productNo}`)
          .then((res) => {
            if (res.data > 0) {
              Swal.fire({
                text: "성공적으로 삭제되었습니다.",
                icon: "success",
                iconColor: "var(--main1)",
                confirmButtonColor: "var(--point1)",
              });
              navigate("/admin/productList");
            } else {
            }
          })
          .catch((err) => {});
      } else if (result.isDismissed) {
      }
    });
  };
  return (
    <section>
      {memberLevel === 1 ? (
        <div>
          <div className="admin-title">제품 상세</div>
          <form
            className="product-regist-frm"
            onSubmit={(e) => {
              e.preventDefault();
              updateProduct();
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
              thumb={thumb}
              setThumb={setThumb}
              productThumb={productThumb}
              setProductThumb={setProductThumb}
              productDetail={productDetail}
              setProductDetail={setProductDetail}
              productShow={productShow}
              setProductShow={inputShow}
              memberEmail={memberEmail}
            ></ProductFrm>
            <div className="admin-button-zone">
              <button
                id="admin-delete"
                className="admin-write-undo"
                type="button"
                onClick={deleteProduct}
              >
                삭제
              </button>
              <button type="submit" className="admin-write-submit">
                수정하기
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Interceptor />
      )}
    </section>
  );
};
export default ProductView;
