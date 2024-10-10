import DOMPurify from "dompurify";
import QuillEditor from "./../../utils/QuillEditor";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";

const WriteAnswerFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const qna = props.qna;
  const qnaAnswerContent = props.qnaAnswerContent;
  const setQnaAnswerContent = props.setQnaAnswerContent;
  const params = useParams();
  const productNo = params.productNo;
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [product, setProduct] = useState({});
  useEffect(() => {
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
  return (
    <>
      <div className="title">
        <div className="qna-title">제목</div>
        <div class="select-type">
          <select name="qnaType" id="qnaType" value={qna.qnaType} aria-readonly>
            <option value="1">전체</option>
            <option value="2">상품문의</option>
            <option value="3">배송문의</option>
            <option value="4">결제문의</option>
            <option value="5">기타문의</option>
          </select>
        </div>
        <input
          type="text"
          name="qnaTitle"
          id="qnaTitle"
          value={qna.qnaTitle}
          readOnly
        />
      </div>
      <div className="qna-title">문의 상품</div>
      <div className="info">
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
      <div className="product-content">
        <div className="qna-title">문의 내용</div>
        <div className="qna-content answer" name="qnaContent" id="qnaContent">
          {qna.qnaContent && (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(String(qna.qnaContent)),
              }}
            />
          )}
        </div>
      </div>
      <div className="product-content padding">
        <div className="qna-title">문의 답변 내용</div>
        <div
          className="qna-content"
          name="qnaAnswerContent"
          id="qnaAnswerContent"
        >
          <QuillEditor
            content={qnaAnswerContent}
            setContent={setQnaAnswerContent}
          />
        </div>
      </div>
    </>
  );
};

export default WriteAnswerFrm;
