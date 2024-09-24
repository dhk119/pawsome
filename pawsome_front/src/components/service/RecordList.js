import { Link } from "react-router-dom";
const RecordList = () => {
  return (
    <div className="container">
      <Link to="/service/petService" style={{ color: "#ffa518" }}>
        메인으로
      </Link>
      <div className="service-wrap">
        <h1>반려동물 등록조회</h1>
      </div>
    </div>
  );
};

export default RecordList;
