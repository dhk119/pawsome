import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section>
      <div className="admin-title">관리자 페이지</div>
      <div className="admin-product-regist-wrap">
        <div className="admin-top-margin"></div>
        <div className="admin-product-wrap" id="admin-mid">
          <div className="admin-link-gap">
            <Link className="admin-product-label" to="/admin/productList">
              제품 리스트
            </Link>
          </div>
          <div className="admin-link-gap">
            <Link className="admin-product-label" to="/admin/memberList">
              회원 리스트
            </Link>
          </div>
          <div className="admin-link-gap">
            <Link className="admin-product-label" to="/admin/petList">
              펫 리스트
            </Link>
          </div>
          <div className="admin-link-gap">
            <Link className="admin-product-label" to="/admin/qnaList">
              qna 리스트
            </Link>
          </div>
          <div className="admin-link-gap">
            <Link className="admin-product-label" to="/admin/boardList">
              신고 게시판 리스트
            </Link>
          </div>
          <div className="admin-link-gap">
            <Link className="admin-product-label" to="/admin/petChart">
              펫 차트
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Admin;
