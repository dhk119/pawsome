import { Link } from "react-router-dom";
import Interceptor from "./Interceptor";
import { useRecoilState } from "recoil";
import { memberLevelState } from "../utils/RecoilData";

const Admin = () => {
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  return (
    <section>
      {memberLevel === 1 ? (
        <div>
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
                  게시판 리스트
                </Link>
              </div>
              <div className="admin-link-gap">
                <Link className="admin-product-label" to="/admin/petChart">
                  펫 차트
                </Link>
              </div>
              <div className="admin-link-gap">
                <Link className="admin-product-label" to="/admin/productChart">
                  판매 차트
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Interceptor />
      )}
    </section>
  );
};
export default Admin;
