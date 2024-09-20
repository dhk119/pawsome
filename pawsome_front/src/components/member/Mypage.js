import "./mypage.css";

const Mypage = () => {
  return (
    <div className="mypage-body">
      <div className="profile-wrap">
        <div className="user-info">
          <div></div>
          <div>홍길동</div>
        </div>
        <div className="profile-menu">
          <ul>
            <li>프로필</li>
            <li>일정</li>
            <li>주문조회</li>
          </ul>
        </div>
      </div>
      <div className="">
        <div></div>
      </div>
    </div>
  );
};

export default Mypage;
