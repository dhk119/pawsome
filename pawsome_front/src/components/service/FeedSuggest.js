import { Link } from "react-router-dom";
const FeedSuggest = () => {
  return (
    <div className="container">
      <Link to="/service/petService" style={{ color: "#ffa518" }}>
        메인으로
      </Link>
      <div className="service-wrap">
        <h1>나의 강아지 맞춤 사료 찾기 !</h1>
        <img src="/image/service/feed.png" style={{ width: "800px" }} />
        <div className="feedtest">
          <h2>어떤 반려동물과 함께하고있나요?</h2>
        </div>
      </div>
    </div>
  );
};

export default FeedSuggest;
