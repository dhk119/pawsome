import axios from "axios";
import { useEffect, useState } from "react";
import ReviewFrm from "./ReviewFrm";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Backspace } from "@mui/icons-material";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, loginEmailState } from "../../utils/RecoilData";

const UpdateReview = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const params = useParams();
  const reviewNo = params.reviewNo;
  const [reviewContent, setReviewContent] = useState("");
  const [reviewFile, setReviewFile] = useState([]);
  const [value, setValue] = useState(0); //별점
  const productNo = params.productNo;
  const [product, setProduct] = useState({});
  const [loginEmail] = useRecoilState(loginEmailState);

  //수정
  const [newFile, setNewFile] = useState([]);
  const [delFileNo, setDelFileNo] = useState([]);

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
    axios
      .get(`${backServer}/product/selectReview/${reviewNo}`)
      .then((res) => {
        console.log(res.data);
        setReviewContent(res.data.reviewContent);
        setValue(res.data.reviewStar);
        setNewFile(res.data.reviewFileList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(delFileNo);

  const updateReview = () => {
    if (value !== 0 && reviewContent !== "") {
      const form = new FormData();
      form.append("reviewNo", reviewNo);
      form.append("reviewStar", value);
      form.append("reviewContent", reviewContent);
      form.append("delFileNo", delFileNo);
      // 파일이 존재할 경우에만 추가
      if (reviewFile.length > 0) {
        for (let i = 0; i < reviewFile.length; i++) {
          form.append("fileList", reviewFile[i]);
        }
      }
      axios
        .patch(`${backServer}/product/updateReview`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "리뷰 수정 성공!",
            html: "리뷰 수정에 성공하셨습니다.</br>해당 제품의 상세보기 페이지로 이동합니다.",
            icon: "success",
          });
          navigate(`/market/main/productDetail/${productNo}/detail`);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "리뷰 수정 실패...",
            html: "리뷰 수정에 실패하였습니다.</br>잠시 후 다시 시도해주세요.",
            icon: "success",
          });
        });
    }
  };

  const deleteReview = () => {
    axios
      .delete(`${backServer}/product/deleteReview/${reviewNo}`)
      .then((res) => {
        console.log(res);
        if (res == 1) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="review-page-wrap">
      <div className="page-title">REVIEW</div>
      <div className="qna-writeFrm-wrap">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateReview();
          }}
        >
          <div className="qna-writeFrm-title">
            <div>리뷰 수정</div>
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
              newFile={newFile}
              setNewFile={setNewFile}
              delFileNo={delFileNo}
              setDelFileNo={setDelFileNo}
            />
            <div className="submit-btn-wrap">
              <button type="submit" className="submit-btn">
                리뷰 수정
              </button>
              <button
                type="button"
                className="submit-btn"
                onClick={deleteReview}
              >
                리뷰 삭제
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateReview;
