import { useEffect, useState } from "react";
import QuillEditor from "./../../utils/QuillEditor";
import Star from "./Star";
import { TiDelete } from "react-icons/ti";

const ReviewFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const reviewContent = props.reviewContent;
  const setReviewContent = props.setReviewContent;
  const reviewFile = props.reviewFile;
  const setReviewFile = props.setReviewFile;
  const product = props.product;
  const value = props.value;
  const setValue = props.setValue;
  //파일 미리보기
  const [showFile, setShowFile] = useState([]);
  //수정 시 사용
  const newFile = props.newFile;
  const setNewFile = props.setNewFile;
  const delFileNo = props.delFileNo;
  const setDelFileNo = props.setDelFileNo;

  /*
  useEffect(() => {
    const addShowFile = () => {
      const showArr = new Array(); //화면에 보여줄 이미지
      for (let i = 0; i < newFile.length; i++) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(newFile[i]);
        fileReader.onloadend = () => {
          showArr.push(fileReader.result);
          setShowFile([...showFile, ...showArr]);
        };
      }
    };
  }, []);
  */
  //첨부파일추가함수
  const addFile = (e) => {
    const files = e.currentTarget.files; //배열같지만 아니기에 for문으로 넣어줘야 함
    const fileArr = new Array(); //백으로 전송할 이미지
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
            {/* 리뷰 수정 시 돌아가는 함수 */}
            {newFile
              ? newFile.map((file, i) => {
                  const deleteFile = () => {
                    const newFileList = newFile.filter((item) => {
                      return item !== file;
                    });
                    setNewFile(newFileList);
                    setDelFileNo([...delFileNo, file.reviewFileNo]);
                  };
                  return (
                    <div className="preview-img" key={"oldFile-" + i}>
                      <img
                        className="fileimg"
                        src={`${backServer}/review/thumb/${file.reviewFileStorage}`}
                      />
                      <span className="del-file-icon" onClick={deleteFile}>
                        <TiDelete />
                      </span>
                    </div>
                  );
                })
              : ""}
            {/* 파일 추가 시 돌아가는 함수(화면에 하나씩 추가로 보여줌) */}
            {showFile.map((fileimg, i) => {
              const deleteFile = () => {
                reviewFile.splice(i, 1);
                setReviewFile([...reviewFile]);
                showFile.splice(i, 1);
                setShowFile([...showFile]);
              };
              return (
                <div className="preview-img" key={"newFile-" + i}>
                  <img className="fileimg" src={fileimg} />
                  <span className="del-file-icon" onClick={deleteFile}>
                    <TiDelete />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewFrm;
