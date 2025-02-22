import { useNavigate, useParams } from "react-router-dom";
import ReviewFrm from "./ReviewFrm";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isLoginState,
  loginEmailState,
  memberNicknameState,
} from "../../utils/RecoilData";
import "../write.css";
import axios from "axios";
import Swal from "sweetalert2";

const WriteReview = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewFile, setReviewFile] = useState([]);
  const params = useParams();
  const productNo = params.productNo;
  const [product, setProduct] = useState({});
  //별점처리
  const [value, setValue] = useState(0);
  const loginState = useRecoilValue(isLoginState);
  useEffect(() => {
    if (!loginState) {
      Swal.fire({
        title: "로그인 필요",
        text: "로그인 후 다시 시도해주세요",
        icon: "warning",
      });
      navigate("/");
    }
    axios
      .get(`${backServer}/product/productDetail/${productNo}/${loginEmail}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const writeReview = () => {
    if (value !== 0 && reviewContent !== "") {
      const form = new FormData();
      form.append("productNo", productNo);
      form.append("reviewStar", value);
      form.append("reviewContent", reviewContent);
      form.append("reviewWriter", memberNickname);
      // 파일이 존재할 경우에만 추가
      if (reviewFile.length > 0) {
        for (let i = 0; i < reviewFile.length; i++) {
          form.append("fileList", reviewFile[i]);
        }
      }
      axios
        .post(`${backServer}/product/writeReview`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "리뷰 등록 성공!",
            html: "리뷰 등록에 성공하셨습니다.</br>해당 제품의 상세보기 페이지로 이동합니다.",
            icon: "success",
          });
          navigate(`/market/main/productDetail/${productNo}/detail`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section className="review-page-wrap">
      <div className="page-title">REVIEW</div>
      <div className="qna-writeFrm-wrap">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            writeReview();
          }}
        >
          <div className="qna-writeFrm-title">
            <div>리뷰 작성</div>
          </div>
          <div className="qna-writeFrm-info">
            <ReviewFrm
              reviewContent={reviewContent}
              setReviewContent={setReviewContent}
              reviewFile={reviewFile}
              setReviewFile={setReviewFile}
              product={product}
              value={value}
              setValue={setValue}
            />
            <div className="submit-btn-wrap">
              <button type="submit" className="submit-btn">
                리뷰 등록
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default WriteReview;
