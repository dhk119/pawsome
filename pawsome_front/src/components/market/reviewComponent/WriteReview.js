import { useNavigate, useParams } from "react-router-dom";
import ReviewFrm from "./ReviewFrm";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { memberNicknameState } from "../../utils/RecoilData";
import "../write.css";
import axios from "axios";

const WriteReview = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const [reviewStar, setReviewStar] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewFile, setReviewFile] = useState([]);
  /* 나중에 연결하면 주소로 번호 받기
  const params = useParams();
  const productNo = params.productNo;
  */
  const [product, setProduct] = useState({});
  //별점처리
  const [value, setValue] = useState(0);
  console.log(value);

  useEffect(() => {
    axios
      .get(`${backServer}/product/productDetail/94`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="review-page-wrap">
      <div className="page-title">REVIEW</div>
      <div className="qna-writeFrm-wrap">
        <div className="qna-writeFrm-title">
          <div>리뷰 작성</div>
        </div>
        <div className="qna-writeFrm-info">
          <ReviewFrm
            memberNickname={memberNickname}
            reviewStar={reviewStar}
            setReviewStar={setReviewStar}
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
      </div>
    </section>
  );
};

export default WriteReview;
