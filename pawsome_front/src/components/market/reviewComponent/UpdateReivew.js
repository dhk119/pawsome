import axios from "axios";
import { useEffect, useState } from "react";
import ReviewFrm from "./ReviewFrm";

const UpdateReview = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  /* 나중에 연결하면 주소로 번호 받기
  const params = useParams();
  const reviewNo = params.reviewNo;
  */
  const reviewNo = 7;
  const [reviewContent, setReviewContent] = useState("");
  const [reviewFile, setReviewFile] = useState([]);
  const [value, setValue] = useState(0); //별점

  const productNo = 94;
  const [product, setProduct] = useState({});

  //수정
  const [newFileList, setNewFileList] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/product/selectOneReview/${reviewNo}`)
      .then((res) => {
        console.log(res);
        setReviewContent(res.data.reviewContent);
        setReviewFile(res.data.reviewFileList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateReview = () => {};

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
