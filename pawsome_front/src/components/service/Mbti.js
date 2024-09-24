import { Link } from "react-router-dom";
const Mbti = () => {
  return (
    <div className="mbti-container">
      <Link to="/service/petService" style={{ color: "#ffa518" }}>
        메인으로
      </Link>
      <div className="dog-mbti">
        <h2 style={{ margin: "20px" }}>
          12문제로 알아보는 나의 강아지 유형 MBTI는? 테스트로 알아보자!
        </h2>
        <img src="/image/service/mbti-main.jpg" style={{ width: "600px" }} />
        <div
          className="start-btn"
          style={{ margin: "40px", fontSize: "x-large" }}
        >
          테스트 시작하기
        </div>
      </div>
    </div>
  );
};

export default Mbti;
