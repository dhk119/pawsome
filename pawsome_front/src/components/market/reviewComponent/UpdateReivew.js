import axios from "axios";
import { useEffect, useState } from "react";
import ReviewFrm from "./ReviewFrm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateReview = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  /* 나중에 연결하면 주소로 번호 받기
  const params = useParams();
  const reviewNo = params.reviewNo;
  */
  const reviewNo = 3;
  const [reviewContent, setReviewContent] = useState("");
  const [reviewFile, setReviewFile] = useState([]);
  const [value, setValue] = useState(0); //별점
  const productNo = 94;
  const [product, setProduct] = useState({});

  const [newFile, setNewFile] = useState([]);
  const [delFileNo, setDelFileNo] = useState([]);
  //수정
  const [newFileList, setNewFileList] = useState([]);

  useEffect(() => {
    axios
      .get(`${backServer}/product/productDetail/${productNo}`)
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
        console.log(res);
        setReviewContent(res.data.reviewContent);
        setValue(res.data.reviewStar);
        setNewFile(res.data.reviewFileList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          /*
          Swal.fire({
            title: "리뷰 수정 성공!",
            html: "리뷰 수정에 성공하셨습니다.</br>해당 제품의 상세보기 페이지로 이동합니다.",
            icon: "success",
          });
          navigate(`/market/main/productDetail/${productNo}/detail`);
          */
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
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateReview;
