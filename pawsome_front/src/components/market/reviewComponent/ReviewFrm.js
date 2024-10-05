import { useState } from "react";
import QuillEditor from "./../../utils/QuillEditor";
import Star from "./Star";

const ReviewFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const memberNickname = props.memberNickname;
  const reviewStar = props.reviewStar;
  const setReviewStar = props.setReviewStar;
  const reviewContent = props.reviewContent;
  const setReviewContent = props.setReviewContent;
  const reviewFile = props.reviewFile;
  const setReviewFile = props.setReviewFile;
  const product = props.product;
  //별점처리
  const value = props.value;
  const setValue = props.setValue;

  const [showFile, setShowFile] = useState([]);
  const addFile = (e) => {
    const files = e.currentTarget.files;
    const fileArr = new Array(); //전송할 이미지
    const showArr = new Array(); //화면에 보여줄 이미지
    for (let i = 0; i < files.length; i++) {
      fileArr.push(files[i]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[i]);
      fileReader.onloadend = () => {
        showArr.push(fileReader.result);
        setShowFile([...showFile, ...showArr]);
      };
    }
    setReviewFile([...reviewFile, ...fileArr]);
  };

  return (
    <>
      <div className="qna-title">리뷰 상품</div>
      <div className="info margin-btm">
        <div className="product-thumb">
          <img
            src={
              product.productThumb
                ? `${backServer}/product/thumb/${product.productThumb}`
                : "/image/basicimage.png"
            }
            alt="face" /*이미지의 내용을 간결하게 표현한 문자열(생략해도 무관) */
          />
        </div>
        <div className="product-detailInfo">
          <div>
            <div className="title">상품명</div>
            <div className="name">{product.productName}</div>
          </div>
          <div>
            <div className="title">상품금액</div>
            <div className="price">{product.productPrice}원</div>
          </div>
        </div>
      </div>
      <div className="product-content margin-btm">
        <div className="review-title">
          구매하신 상품에 얼마나 만족하시는지 알려주세요!
        </div>
        <div className="qna-content center" name="reviewStar" id="reviewStar">
          <Star value={value} setValue={setValue} />
        </div>
      </div>
      <div className="product-content margin-qauil">
        <div className="qna-title">텍스트리뷰</div>
        <div className="qna-content" name="reviewContent" id="reviewContent">
          <QuillEditor content={reviewContent} setContent={setReviewContent} />
        </div>
      </div>
      <div className="product-content">
        <div className="qna-title">포토리뷰</div>
        <div className="qna-content">
          <div className="review-img-wrap">
            <label htmlFor="reviewFile">
              <img src="/image/img-box.png" alt="Upload" />
            </label>
            <input
              className="review-file"
              type="file"
              id="reviewFile"
              onChange={addFile}
              multiple
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewFrm;
