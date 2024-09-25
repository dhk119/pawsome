import { useState } from "react";
import QuillEditor from "../../utils/QuillEditor";

const WriteFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const product = props.product;
  const [productPublic, setProductPublic] = useState();
  const publicHandler = (e) => {
    setProductPublic(Number(e.target.value));
  };

  return (
    <>
      <div className="qna-writeFrm-info">
        <div className="title">
          <div className="qna-title">제목</div>
          <div class="select-type">
            <select name="qnaType" id="qnaType">
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
            placeholder="문의 제목을 입력하세요"
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
          <div className="qna-content" name="qnaContent" id="Content">
            <QuillEditor />
          </div>
        </div>
        <div className="qna-title padding">비밀글 설정</div>
        <div className="public">
          <label>
            <input
              id="public"
              type="radio"
              value={0}
              onChange={publicHandler}
              checked={productPublic == 0}
            />
            공개
          </label>
          <label>
            <input
              id="public"
              type="radio"
              value={1}
              onChange={publicHandler}
              checked={productPublic == 1}
            />
            비공개 (선택 시, 로그인 후에 열람 가능합니다.)
          </label>
        </div>
        <div className="submit-btn-wrap">
          <button type="submit" className="submit-btn">
            Q&A 등록
          </button>
        </div>
      </div>
    </>
  );
};

export default WriteFrm;
