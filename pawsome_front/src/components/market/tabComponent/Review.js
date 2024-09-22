const Review = () => {
  return (
    <div className="review-wrap">
      <div className="star-wrap">
        <span> 별점 자리</span>
      </div>
      <div className="review-list">
        <div className="review-detail">
          <div className="review-title">
            <div>
              <div className="writer">주문자아이디</div>
              <div className="date">작성일</div>
            </div>
            <div className="star">별점</div>
          </div>
          <div className="review-content">리뷰 내용</div>
        </div>
      </div>
    </div>
  );
};

export default Review;
