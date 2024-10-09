import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const KakaoJoin = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const location = useLocation();
  const { kakaoUserInfo } = location.state || {};

  // 주소 관련
  const postcodeRef = useRef(null);
  const addressRef = useRef(null);
  const detailAddressRef = useRef(null);

  useEffect(() => {
    console.log(kakaoUserInfo);
  }, [kakaoUserInfo]);

  const [member, setMember] = useState({
    memberEmail: "",
    memberName: "",
    memberNickname: "",
    memberAddr1: "", // 우편번호
    memberAddr2: "", // 주소
    memberAddr3: "", // 상세주소
    loginType: "kakao",
  });

  useEffect(() => {
    console.log(kakaoUserInfo);
    setMember((prevMember) => ({
      ...prevMember,
      memberEmail: kakaoUserInfo.kakaoUserInfo.email || "",
      memberName: kakaoUserInfo.kakaoUserInfo.name || "",
    }));
  }, [kakaoUserInfo]);

  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [nicknameCheck, setNicknameCheck] = useState(0);
  const checkNickname = () => {
    const nicknameReg = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    if (!nicknameReg.test(member.memberNickname)) {
      setNicknameCheck(2);
    } else {
      axios
        .get(
          `${backServer}/member/memberNickname/${member.memberNickname}/check-nickname`
        )
        .then((res) => {
          console.log(res);
          if (res.data === 1) {
            setNicknameCheck(3); //닉네임 중복
          } else if (res.data === 0) {
            setNicknameCheck(1); //정규표현식 통과
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const nameMessage = useRef(null);
  const checkName = () => {
    nameMessage.current.classList.remove("valid");
    nameMessage.current.classList.remove("invalid");

    const nameReg = /^[가-힣]{2,10}$/; // 한글 2-10자
    if (nameReg.test(member.memberName)) {
      nameMessage.current.innerText = "이름이 유효합니다.";
      nameMessage.current.classList.add("valid");
    } else {
      nameMessage.current.innerText = "이름을 확인해주세요.(한글 2-10글자)";
      nameMessage.current.classList.add("invalid");
    }
  };

  const [terms, setTerms] = useState({
    all: false, // 전체 동의
    terms1: false, // 만 14세 이상
    terms2: false, // 서비스 이용약관 동의
    terms3: false, // 개인정보 수집 및 이용 동의
  });

  const handleAllChecked = (e) => {
    const checked = e.target.checked;
    setTerms({
      all: checked,
      terms1: checked,
      terms2: checked,
      terms3: checked,
    });
  };

  const handleTermChecked = (e) => {
    const { name, checked } = e.target;
    setTerms((prevTerms) => {
      const newTerms = { ...prevTerms, [name]: checked };
      newTerms.all = newTerms.terms1 && newTerms.terms2 && newTerms.terms3;
      return newTerms;
    });
  };

  const join = () => {
    if (
      terms.terms1 && // 만 14세 이상 동의
      terms.terms2 && // 서비스 이용약관 동의
      terms.terms3 && // 개인정보 수집 및 이용 동의
      nicknameCheck === 1 && // 닉네임이 유효하고 중복체크를 통과한 경우
      /^[가-힣]{2,10}$/.test(member.memberName) && // 이름이 유효한지
      member.memberAddr1 && // 우편번호가 입력되었는지
      member.memberAddr2 && // 주소가 입력되었는지
      member.memberAddr3 // 상세주소가 입력되었는지
    ) {
      axios
        .post(`${backServer}/member`, member)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        text: "입력 값을 확인하세요.",
        icon: "info",
        confirmButtonColor: "var(--main1)",
      });
    }
  };

  const handlePostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr =
          data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

        setMember((prevMember) => ({
          ...prevMember,
          memberAddr1: data.zonecode,
          memberAddr2: addr,
        }));

        document.querySelector("input[name='memberAddr3']").focus();
      },
    }).open();
  };

  //모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  return (
    <div className="body">
      <div className="join-page">
        <div className="form">
          <h2>회원가입</h2>

          <form
            className="join-form"
            onSubmit={(e) => {
              e.preventDefault();
              join();
            }}
          >
            <input
              type="text"
              name="memberEmail"
              value={member.memberEmail}
              readOnly
            />
            <input
              type="text"
              id="memberNickname"
              name="memberNickname"
              value={member.memberNickname}
              onChange={changeMember}
              onBlur={checkNickname}
              placeholder="닉네임"
            />
            <p
              className={
                "input-msg" +
                (nicknameCheck === 0
                  ? ""
                  : nicknameCheck === 1
                  ? " valid"
                  : " invalid")
              }
            >
              {nicknameCheck === 0
                ? ""
                : nicknameCheck === 1
                ? "사용가능한 닉네임입니다."
                : nicknameCheck === 2
                ? "닉네임 양식에 맞지 않습니다."
                : "이미 사용중인 닉네임 입니다."}
            </p>

            <input
              type="text"
              id="memberName"
              name="memberName"
              value={member.memberName}
              onChange={changeMember}
              placeholder="이름"
              onBlur={checkName}
            />
            <p className="input-msg" ref={nameMessage}></p>
            <div className="addr">
              <input
                type="text"
                ref={postcodeRef}
                name="memberAddr1"
                value={member.memberAddr1}
                onChange={changeMember}
                placeholder="우편번호"
              />
              <input
                className="addr-btn"
                type="button"
                onClick={handlePostcode}
                value="우편번호 찾기"
              />
            </div>
            <input
              type="text"
              ref={addressRef}
              name="memberAddr2"
              value={member.memberAddr2}
              onChange={changeMember}
              placeholder="주소"
            />
            <input
              type="text"
              name="memberAddr3"
              value={member.memberAddr3}
              onChange={changeMember}
              ref={detailAddressRef}
              placeholder="상세주소"
            />
            <div className="terms-wrap">
              <div>
                <input
                  type="checkbox"
                  name="all"
                  id="all"
                  checked={terms.all}
                  onChange={handleAllChecked}
                />
                <label htmlFor="all">약관 전체동의</label>
                <div></div>
              </div>
              <hr />
              <div>
                <input
                  type="checkbox"
                  name="terms1"
                  id="terms1"
                  checked={terms.terms1}
                  onChange={handleTermChecked}
                />
                <label htmlFor="terms1">(필수)만 14세 이상입니다</label>
                <div></div>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="terms2"
                  id="terms2"
                  checked={terms.terms2}
                  onChange={handleTermChecked}
                />
                <label htmlFor="terms2">(필수)서비스 이용약관 동의</label>
                <div className="more-terms" onClick={openModal}>
                  보기
                </div>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="terms3"
                  id="terms3"
                  checked={terms.terms3}
                  onChange={handleTermChecked}
                />
                <label htmlFor="terms3">(필수)개인정보 수집 및 이용 동의</label>
                <div className="more-terms" onClick={openModal2}>
                  보기
                </div>
              </div>
            </div>
            <button type="submit">회원가입</button>
          </form>
        </div>
      </div>
      <ReactModal
        isOpen={isModalOpen2}
        onRequestClose={closeModal2}
        contentLabel="개인정보 수집 및 이용"
        ariaHideApp={false}
        className="modal-content"
      >
        <h2>개인정보 수집 및 이용</h2>
        <div class="page-content">
          <p>
            pawsome 주식회사(이하 ‘회사’)가 운영하는 pawsome 웹 및 앱
            서비스(https://bemypet.kr, https://mypetlife.co.kr 등)은 개인정보
            보호법 제30조에 따라 정보주체(이하 ‘고객’)의 개인정보를 보호하고
            이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여
            다음과 같이 개인정보 처리지침을 수립․공개합니다.
          </p>

          <h4 class="wp-block-heading">
            <strong>
              <strong>개인정보의 처리목적, 수집항목, 보유 및 이용기간</strong>
            </strong>
          </h4>

          <p>회사는 다음과 같이 정보주체의 개인정보를 처리합니다.</p>

          <figure class="wp-block-table">
            <table>
              <tbody>
                <tr>
                  <td>서비스명</td>
                  <td>목적</td>
                  <td>항목</td>
                  <td>보유 기간</td>
                </tr>

                <tr>
                  <td>회원 가입 및 로그인</td>
                  <td>
                    회원 가입의사 확인 및 회원가입, 로그인, 로그인한 회원의 식별
                  </td>
                  <td>
                    필수: 이메일, 아이디, 비밀번호, 닉네임
                    <br />
                    선택: 프로필 이미지
                  </td>
                  <td>
                    <strong>회원 탈퇴 시 까지</strong>
                  </td>
                </tr>

                <tr>
                  <td>SNS 회원가입/로그인</td>
                  <td>
                    회원 가입의사 확인 및 회원가입, 로그인, 로그인한 회원의 식별
                  </td>
                  <td>
                    – 네이버
                    <br />
                    1. 필수
                    <br />
                    1) 회원 이름
                    <br />
                    2) 연락처 이메일 주소
                    <br />
                    3) 별명(닉네임)
                    <br />
                    4) 프로필 사진
                    <br />
                    5) 성별
                    <br />
                    6) 생일
                    <br />
                    7) 연령대
                    <br />
                    8) 출생년도
                    <br />
                    9) 휴대폰 번호
                    <br />
                    <br />– 구글
                    <br />
                    1) 이메일 주소
                    <br />
                    2) 닉네임
                    <br />
                    <br />– 페이스북
                    <br />
                    1) 이메일 주소
                    <br />
                    2) 닉네임
                    <br />
                    <br />– 애플 <br />
                    1) 이메일 주소
                    <br />
                    2) 닉네임
                  </td>
                  <td>
                    <strong>회원 탈퇴 시 까지</strong>
                  </td>
                </tr>

                <tr>
                  <td>
                    pawsome 스토어
                    <br />
                    (선택)
                  </td>
                  <td>상품 배송, 고객 상담 및 주문 결제</td>
                  <td>
                    – 구매자 정보(이메일, 이름, 휴대폰 번호), <br />– 수취인
                    정보(이름, 휴대폰 번호, 배송주소)
                    <br />– 주문정보
                    <br /> 1) 신용카드 결제 시 : 카드사명, 카드번호 <br />
                    2) 환불 시 : 예금주명. 계좌번호, 은행명{" "}
                  </td>
                  <td>
                    <strong>회원 탈퇴 시까지</strong>
                    <br />
                    ※단, 법정 의무 보유기간에 따라 보관
                  </td>
                </tr>
                <tr>
                  <td>
                    pawsome 컴백홈
                    <br />
                    (선택)
                  </td>
                  <td>
                    동물보호법령에 근거한 동물등록대행 서비스 제공 및 상품 배송,
                    고객 상담 및 주문 결제
                  </td>
                  <td>
                    – 이름
                    <br />– 휴대폰번호
                    <br />– 주민등록상 주소
                    <br />– 현 거주지 주소
                    <br />– 고유식별정보인 주민등록번호 또는 외국인등록번호
                    <br />– 구매자 정보(이메일, 이름, 휴대폰 번호),
                    <br />– 수취인 정보(이름, 휴대폰 번호, 배송주소)
                    <br />– 주문정보 <br />
                    1) 신용카드 결제 시 : 카드사명, 카드번호 <br />
                    2) 계좌이체 시 : 예금주명. 계좌번호, 은행명{" "}
                  </td>
                  <td>
                    <strong>회원 탈퇴 시 까지</strong>
                    <br />
                    ※단, 법정 의무 보유기간에 따라 보관
                    <br />
                    [고유 식별 정보]
                    <br />
                    동물등록절차상 지자체의 승인이 완료된 때까지
                  </td>
                </tr>
                <tr>
                  <td>
                    pawsome
                    <br />
                    크리에이터즈
                    <br />
                    (크리에이터 회원, 선택)
                  </td>
                  <td>크리에이터 대상 광고 중개</td>
                  <td>
                    – 크리에이터의 소셜 아이디
                    <br />– 크리에이터 소셜 계정의 URL
                    <br />– 크리에이터의 소셜 아이디 관련 공개된 프로필 이미지,
                    닉네임
                  </td>
                  <td>
                    <strong>회원 탈퇴시까지</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    pawsome
                    <br />
                    크리에이터즈
                    <br />
                    (크리에이터 회원, 선택)
                  </td>
                  <td>소득세법에 근거한 소득세 정산</td>
                  <td>
                    – 정산 정보: 예금주명, 계좌번호, 은행명
                    <br />– 생년월일 및 주민등록번호: 소득세법에 따라 정산을
                    위하여 수집
                  </td>
                  <td>
                    <strong>회원 탈퇴시까지</strong>
                    <br />
                    ※단, 법정 의무 보유기간에 따라 보관
                  </td>
                </tr>
              </tbody>
            </table>
          </figure>

          <p>
            ※ 법정 의무 보유기간에 따라 일정 기간 보관 후 파기하는 정보는 아래와
            같습니다.
          </p>

          <p>
            – 계약 또는 청약철회 등에 관한 기록 : 5년 (전자상거래등에서의
            소비자보호에 관한 법률)
            <br />– 대금결제 및 재화 등의 공급에 관한 기록 : 5년
            (전자상거래등에서의 소비자보호에 관한 법률)
            <br />– 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년
            (전자상거래등에서의 소비자보호에 관한 법률)
            <br />– 세법이 규정하는 모든 거래에 관한 장부 및 증빙서류: 5년
            (국세기본법)
            <br />– 방문(로그)에 관한 기록 : 3개월(통신비밀보호법)
          </p>

          <p>
            인터넷 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어
            수집될 수 있습니다.
          </p>

          <p>
            – IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록, 기기/브라우저
            정보
          </p>

          <h4 class="wp-block-heading">
            <strong>개인정보의 제3자 제공</strong>
          </h4>

          <p>
            회사는 정보주체의 별도 동의, 법률의 특별한 규정 등 개인정보 보호법
            제17조에 해당하는 경우 외에는 개인정보를 제3자에게 제공하지
            않습니다.
          </p>

          <h4 class="wp-block-heading">
            <strong>개인정보처리위탁</strong>
          </h4>

          <p>
            더 편리하고 나은 서비스를 제공하기 위해 업무 중 일부를 외부에
            위탁하고 있습니다. 위탁 내용은 아래와 같습니다
          </p>

          <figure class="wp-block-table">
            <table>
              <tbody>
                <tr>
                  <td>수탁업체</td>
                  <td>위탁내용</td>
                </tr>
                <tr>
                  <td>Amazon Web Service., Inc</td>
                  <td>웹서버 및 DB 보관</td>
                </tr>
                <tr>
                  <td>NHN한국사이버결제 주식회사</td>
                  <td>신용카드 결제 및 계좌이체</td>
                </tr>
                <tr>
                  <td>CJ대한통운(주)</td>
                  <td>배송</td>
                </tr>
                <tr>
                  <td>플래니터리헬스</td>
                  <td>동물등록대행</td>
                </tr>
                <tr>
                  <td>NICE평가정보(주)</td>
                  <td>본인인증</td>
                </tr>
                <tr>
                  <td>(주)채널코퍼레이션</td>
                  <td>고객상담</td>
                </tr>
                <tr>
                  <td>(주)프리마켓</td>
                  <td>배송 및 주문 관리</td>
                </tr>
                <tr>
                  <td>(주)카카오페이</td>
                  <td>신용카드 결제 및 계좌이체</td>
                </tr>
              </tbody>
            </table>
          </figure>

          <p>
            <strong>개인정보 국외 처리 위탁</strong>
          </p>

          <figure class="wp-block-table">
            <table>
              <thead>
                <tr>
                  <td>
                    <strong>업체명</strong>
                    <strong>(정보관리책임자 연락처)</strong>
                  </td>
                  <td>
                    <strong>국가</strong>
                  </td>
                  <td>
                    <strong>일시 및 방법</strong>
                  </td>
                  <td>
                    <strong>개인정보 항목</strong>
                  </td>
                  <td>
                    <strong>이용목적</strong>
                  </td>
                  <td>
                    <strong>
                      보유 및<br />
                      처리 기간
                    </strong>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
                <tr>
                  <td>
                    Amazon Web Services Inc
                    <br />
                    (aws-korea-privacy@amazon.com)
                  </td>
                  <td>싱가포르</td>
                  <td>네트워크를 이용한 원격지 전송</td>
                  <td>복구를 위해 필요한 데이터</td>
                  <td>재난, 재해 시 정상적인 서비스 제공을 위한 원격지 백업</td>
                  <td>위탁계약 종료 시 까지</td>
                </tr>
                <tr>
                  <td>
                    Amazon Web Services Inc
                    <br />
                    (aws-korea-privacy@amazon.com)
                  </td>
                  <td>미국</td>
                  <td>안전한 네트워크를 통해 전송</td>
                  <td>이메일 주소</td>
                  <td>메일 발송</td>
                  <td>위탁계약 종료 시 까지</td>
                </tr>
              </tbody>
            </table>
          </figure>

          <h4 class="wp-block-heading">
            <strong>정보주체와 법정대리인의 권리․의무 및 행사방법</strong>
          </h4>

          <p>
            1. 정보 주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련
            권리를 행사할 수 있습니다.
            <br />
            1) 개인정보 열람 요구
            <br />
            2) 오류 등이 있을 경우 정정 요구
            <br />
            3) 삭제 요구
            <br />
            4) 처리정지 요구
            <br />
            2. 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편,
            모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이
            조치하겠습니다.
            <br />
            3. 이용자가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한
            경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를
            이용하거나 제공하지 않습니다.
            <br />
            4. 제1항에 따른 권리 행사는 이용자의 법정대리인이나 위임을 받은 자
            등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법
            시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
            <br />
            5. 이용자는 개인정보 보호법 등 관계법령을 위반하여 회사가 처리하고
            있는 이용자 본인이나 타인의 개인정보 및 사생활을 침해하여서는 아니
            됩니다.
          </p>

          <h4 class="wp-block-heading">
            <strong>개인정보의 파기</strong>
          </h4>

          <p>
            1. 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
            불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
            <br />
            2. 회사는 다음의 방법으로 개인정보를 파기합니다.
          </p>

          <ul>
            <li>전자적 파일 : 파일 삭제 및 디스크 등 저장매체 포맷</li>

            <li>수기 문서 : 분쇄하거나 소각</li>
          </ul>

          <p></p>

          <h4 class="wp-block-heading">
            <strong>개인정보의 안전성 확보조치</strong>
          </h4>

          <p>
            회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
            있습니다.
          </p>

          <ul>
            <li>
              관리적 조치 : 내부관리계획 수립․시행, 직원․종업원 등에 대한 정기적
              교육
            </li>

            <li>
              기술적 조치 : 개인정보처리시스템(또는 개인정보가 저장된 컴퓨터)의
              비밀번호 설정 등 접근권한 관리, 백신소프트웨어 등 보안프로그램
              설치, 개인정보가 저장된 파일의 암호화
            </li>

            <li>
              물리적 조치 : 개인정보가 저장․보관된 장소의 시건, 출입통제 등
            </li>
          </ul>

          <h4 class="wp-block-heading">
            <strong>개인정보 보호책임자</strong>
          </h4>

          <p>
            회사는&nbsp;개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
            처리와 관련한 정보주체의 불만처리 및 피해구제를 처리하기 위하여
            아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>

          <p>개인정보 보호책임자</p>
          <p>성명 : 김대헌</p>
          <h4 class="wp-block-heading">
            <strong>개인정보 처리방침 변경</strong>
          </h4>

          <p>이 개인정보 처리방침은 2024. 09. 20.부터 적용됩니다.</p>

          <p>2024년 9월 20일 개인정보처리방침</p>
        </div>
      </ReactModal>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="이용약관"
        ariaHideApp={false}
        className="modal-content"
      >
        <h2>서비스 이용약관</h2>

        <h4>제1조 목적</h4>
        <p>
          본 이용약관은 “pawsome 주식회사”(이하 “사이트”)의 서비스의 이용조건과
          운영에 관한 제반사항 규정을 목적으로 합니다.
        </p>
        <h4>제2조 용어의 정의</h4>
        <ol>
          <li>
            본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.&nbsp;회원
            : 사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서,
            사이트와의 이용계약을 체결하고 사이트를 이용하는 이용자를 말합니다.
          </li>
          <li>
            이용계약 : 사이트 이용과 관련하여 사이트와 회원간에 체결 하는 계약을
            말합니다.
          </li>
          <li>
            회원 아이디(이하 “ID”) : 회원의 식별과 회원의 서비스 이용을 위하여
            회원별로 부여하는 고유한 문자와 숫자의 조합을 말합니다.
          </li>
          <li>
            비밀번호 : 회원이 부여받은 ID와 일치된 회원임을 확인하고 회원의
            권익보호를 위하여 회원이 선정한 문자와 숫자의 조합을 말합니다.
          </li>
          <li>
            운영자 : 서비스에 홈페이지를 개설하여 운영하는 운영자를 말합니다.
          </li>
          <li>해지 : 회원이 이용계약을 해약하는 것을 말합니다.</li>
        </ol>
        <h4>제3조 약관외 준칙</h4>
        <p>
          운영자는 필요한 경우 별도로 운영정책을 공지 안내할 수 있으며, 본
          약관과 운영정책이 중첩될 경우 운영정책이 우선 적용됩니다.
        </p>
        <h4>제4조 이용계약 체결</h4>
        <ol>
          <li>
            이용계약은 회원으로 등록하여 사이트를 이용하려는 자의 본 약관 내용에
            대한 동의와 가입신청에 대하여 운영자의 이용승낙으로 성립합니다.
          </li>
          <li>
            회원으로 등록하여 서비스를 이용하려는 자는 사이트 가입신청 시 본
            약관을 읽고 아래에 있는 “동의합니다”를 선택하는 것으로 본 약관에
            대한 동의 의사 표시를 합니다.
          </li>
        </ol>
        <h4>제5조 서비스 이용 신청</h4>
        <ol>
          <li>
            회원으로 등록하여 사이트를 이용하려는 이용자는 사이트에서 요청하는
            제반정보(이용자ID, 비밀번호, 닉네임 등)를 제공해야 합니다.
          </li>
          <li>
            타인의 정보를 도용하거나 허위의 정보를 등록하는 등 본인의 진정한
            정보를 등록하지 않은 회원은 사이트 이용과 관련하여 아무런 권리를
            주장할 수 없으며, 관계 법령에 따라 처벌 받을 수 있습니다.
          </li>
        </ol>
        <h4>제6조 개인정보처리방침</h4>
        <ol>
          <li>
            사이트 및 운영자는 회원가입시 제공한 개인정보 중 비밀번호를 가지고
            있지 않으며 이와 관련된 부분은 사이트의 개인정보처리방침을 따릅니다.
          </li>
          <li>
            운영자는 관계법령이 정하는 바에 따라 회원등록정보를 포함한 회원의
            개인정보를 보호하기 위하여 노력을 합니다.
          </li>
          <li>
            회원의 개인정보보호에 관하여 관계법령 및 사이트가 정하는
            개인정보처리방침에 정한 바에 따릅니다.
          </li>
          <li>
            단, 회원의 귀책사유로 인해 노출된 정보에 대해 운영자는 일체의 책임을
            지지 않습니다.
          </li>
          <li>
            운영자는 회원이 미풍양속에 저해되거나 국가안보에 위배되는 게시물 등
            위법한 게시물을 등록 · 배포할 경우 관련기관의 요청이 있을시 회원의
            자료를 열람 및 해당 자료를 관련기관에 제출할 수 있습니다.
          </li>
        </ol>
        <h4>제7조 운영자의 의무</h4>
        <ol>
          <li>
            운영자는 이용회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할
            경우에는 가급적 빨리 처리하여야 합니다. 다만, 개인적인 사정으로
            신속한 처리가 곤란한 경우에는 사후에 공지 또는 이용회원에게 쪽지,
            전자우편 등을 보내는 등 최선을 다합니다.
          </li>
          <li>
            운영자는 계속적이고 안정적인 사이트 제공을 위하여 설비에 장애가
            생기거나 유실된 때에는 이를 지체 없이 수리 또는 복구할 수 있도록
            사이트에 요구할 수 있습니다. 다만, 천재지변 또는 사이트나 운영자에
            부득이한 사유가 있는 경우, 사이트 운영을 일시 정지할 수 있습니다.
          </li>
        </ol>
        <h4>제8조 회원의 의무</h4>
        <ol>
          <li>
            회원은 본 약관에서 규정하는 사항과 운영자가 정한 제반규정, 공지사항
            및 운영정책 등 사이트가 공지하는 사항 및 관계법령을 준수하여야 하며,
            기타 사이트의 업무에 방해가 되는 행위, 사이트의 명예를 손상시키는
            행위를 해서는 안됩니다.
          </li>
          <li>
            회원은 사이트의 명시적 동의가 없는 한 서비스의 이용권한, 기타
            이용계약상 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로
            제공할 수 없습니다.
          </li>
          <li>
            이용고객은 아이디 및 비밀번호 관리에 상당한 주의를 기울여야 하며,
            운영자나 사이트의 동의 없이 제3자에게 아이디를 제공하여 이용하게 할
            수 없습니다.
          </li>
          <li>
            회원은 운영자와 사이트 및 제3자의 지적 재산권을 침해해서는 안됩니다.
          </li>
          <li>
            회원은 사회통념상 타인에게 혐오감을 줄 수 있는 콘텐츠를 사이트 내
            게재하여서는 안되며, 운영자는 회원이 이와 같은 콘텐츠를 게재하였음을
            발견 시 운영자는 즉각적으로 탈퇴 조치를 시행합니다.
          </li>
        </ol>
        <h4>제9조 서비스 이용시간</h4>
        <ol>
          <li>
            서비스 이용시간은 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴
            1일 24시간을 원칙으로 합니다. 단, 사이트는 시스템 정기점검, 증설 및
            교체를 위해 사이트가 정한 날이나 시간에 서비스를 일시중단 할 수
            있으며 예정된 작업으로 인한 서비스 일시 중단은 사이트의 홈페이지에
            사전에 공지하오니 수시로 참고하시길 바랍니다.
          </li>
          <li>
            단, 사이트는 다음 경우에 대하여 사전 공지나 예고없이 서비스를 일시적
            혹은 영구적으로 중단할 수 있습니다.
            <br />
            (1) 긴급한 시니다. 단, 사이트가 통제할 수 없는 사유로 발생한
            서비스의 중단에 대하여 사전공지가 불가능한 경우에는 사후공지로
            대신합니다.
          </li>
          <li>
            시스템 점검, 증설, 교체, 고장 혹은 오동작을 일으키는 경우
            <br />
            (2) 국가비상사태, 정전, 천재지변 등의 불가항력적인 사유가 있는 경우
            <br />
            (3) 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를
            중지한 경우
            <br />
            (4) 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는
            경우
          </li>
          <li>
            전항에 의한 서비스 중단의 경우 사이트는 사전에 공지사항 등을 통하여
            회원에게 통지 합
          </li>
        </ol>
        <h4>제10조 서비스 이용 해지</h4>
        <ol>
          <li>
            회원이 사이트와의 이용계약을 해지하고자 하는 경우에는 회원 본인이
            온라인을 통하여 등록해지신청을 하여야 합니다. 한편, 사이트
            이용해지와 별개로 사이트에 대한 이용계약 해지는 별도로 하셔야
            합니다.
          </li>
          <li>
            해지신청과 동시에 사이트가 제공하는 사이트 관련 프로그램이 회원관리
            화면에서 자동적으로 삭제됨으로 운영자는 더 이상 해지신청자의 정보를
            볼 수 없습니다.
          </li>
        </ol>
        <h4>제11조 서비스 이용 제한</h4>
        <ol>
          <li>
            회원은 다음 각 호에 해당하는 행위를 하여서는 아니되며 해당 행위를 한
            경우에 사이트는 회원의 서비스 이용 제한 및 적법한 조치를 취할 수
            있으며 이용계약을 해지하거나 기간을 정하여 서비스를 중지할 수
            있습니다.
            <br />
            (1) 회원 가입시 혹은 가입 후 정보 변경시 허위 내용을 등록하는 행위
            <br />
            (2) 타인의 사이트 이용을 방해하거나 정보를 도용하는 행위
            <br />
            (3) 사이트의 운영진, 직원 또는 관계자를 사칭하는 행위
            <br />
            (4) 사이트, 기타 제3자의 인격권 또는 지적재산권을 침해하거나 업무를
            방해하는 행위
            <br />
            (5) 다른 회원의 ID를 부정하게 사용하는 행위
            <br />
            (6) 다른 회원에 대한 개인정보를 그 동의 없이 수집, 저장, 공개하는
            행위
            <br />
            (7) 범죄와 결부된다고 객관적으로 판단되는 행위
            <br />
            (8) 기타 관련 법령에 위배되는 행위
          </li>
        </ol>
        <h4>제12조 게시물의 관리</h4>
        <ol>
          <li>
            회사는 항상 불량 게시물 및 자료에 대하여 모니터링을 하여야 하며,
            불량 게시물 및 자료를 발견하거나 신고를 받으면 해당 게시물 및 자료를
            삭제하고 이를 등록한 회원에게 주의를 주어야 합니다.
          </li>
          <li>
            한편, 이용회원이 올린 게시물에 대해서는 게시자 본인에게 책임이
            있으니 회원 스스로 본 이용약관에서 위배되는 게시물은 게재해서는
            안됩니다.
          </li>
          <li>
            정보통신윤리위원회 등 공공기관의 시정요구가 있는 경우 혹은 불량
            게시물로 판단되는 경우 회사는 회원의 사전 동의 없이 게시물을
            삭제하거나 이동 할 수 있습니다.
          </li>
          <li>
            불량게시물의 판단기준은 다음과 같습니다.
            <br />
            (1) 다른 회원 또는 제3자에게 심한 모욕을 주거나 명예를 손상시키는
            내용인 경우
            <br />
            (2) 공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는
            경우
            <br />
            (3) 불법복제 또는 해킹을 조장하는 내용인 경우
            <br />
            (4) 영리를 목적으로 하는 광고일 경우
            <br />
            (5) 범죄와 결부된다고 객관적으로 인정되는 내용일 경우. 단, 사전에
            허락을 받은 경우에는 이에 속하지 않음
            <br />
            (6) 다른 이용자 또는 제3자와 저작권 등 기타 권리를 침해하는 경우
            <br />
            (7) 기타 관계법령에 위배된다고 판단되는 경우
          </li>
          <li>
            &nbsp;사이트 및 운영자는 게시물 등에 대하여 제3자로부터 명예훼손,
            지적재산권 등의 권리 침해를 이유로 게시중단 요청을 받은 경우 이를
            임시로 게시중단(전송중단)할 수 있으며, 게시중단 요청자와 게시물
            등록자 간에 소송, 합의 기타 이에 준하는 관련기관의 결정 등이
            이루어져 사이트에 접수된 경우 이에 따릅니다.
          </li>
        </ol>
        <h4>제13조 게시물의 보관</h4>
        <ol>
          <li>
            사이트 운영자가 불가피한 사정으로 본 사이트를 중단하게 될 경우,
            회원에게 사전 공지를 하고 게시물의 이전이 쉽도록 모든 조치를 취하기
            위해 노력합니다.
          </li>
        </ol>
        <h4>제14조 게시물에 대한 저작권</h4>
        <ol>
          <li>
            회원이 사이트 내에 게시한 게시물의 저작권은 게시한 회원에게
            귀속됩니다. 다만, 사이트 운영자와 협의에 따라 에디터 및 작가로
            임명된 자가 작성하는 글에 대한 저작권은 사이트에게 귀속
            됩니다.&nbsp;
          </li>
          <li>
            사회통념상 허용하는 범위 안에서, 회사는 회원이 작성한 게시글을
            회사의 서비스를 홍보 목적으로 사용할 수 있습니다.&nbsp;
          </li>
          <li>
            회원은 서비스를 이용하여 취득한 정보를 임의 가공, 판매하는 행위 등
            서비스에 게재된 자료를 상업적으로 사용할 수 없습니다.
          </li>
          <li>
            운영자는 회원이 게시하거나 등록하는 사이트 내의 내용물, 게시 내용에
            대해 제12조 각 호에 해당된다고 판단되는 경우 사전통지 없이
            삭제하거나 이동 또는 등록 거부할 수 있습니다.
          </li>
        </ol>
        <h4>제15조 손해배상</h4>
        <ol>
          <li>
            본 사이트의 발생한 모든 민,형법상 책임은 회원 본인에게 1차적으로
            있습니다.
          </li>
          <li>
            본 사이트로부터 회원이 받은 손해가 천재지변 등 불가항력적이거나
            회원의 고의 또는 과실로 인하여 발생한 때에는 손해배상을 하지 하지
            않습니다.
          </li>
        </ol>
        <h4>제16조 면책</h4>
        <ol>
          <li>
            회사는 회원이 사이트의 서비스 제공으로부터 기대되는 이익을 얻지
            못하였거나 서비스 자료에 대한 취사선택 또는 이용으로 발생하는 손해
            등에 대해서는 책임이 면제됩니다.
          </li>
          <li>
            회사는 본 사이트의 서비스 기반 및 타 통신업자가 제공하는
            전기통신서비스의 장애로 인한 경우에는 책임이 면제되며 본 사이트의
            서비스 기반과 관련되어 발생한 손해에 대해서는 사이트의 이용약관에
            준합니다
          </li>
          <li>
            회사는 회원이 저장, 게시 또는 전송한 자료와 관련하여 일체의 책임을
            지지 않습니다.
          </li>
          <li>
            회사는 회원의 귀책사유로 인하여 서비스 이용의 장애가 발생한 경우에는
            책임지지 아니합니다.
          </li>
          <li>
            회사는 회원 상호간 또는 회원과 제3자 상호간, 기타 회원의 본 서비스
            내외를 불문한 일체의 활동(데이터 전송, 기타 커뮤니티 활동 포함)에
            대하여 책임을 지지 않습니다.
          </li>
          <li>
            회사는 회원이 게시 또는 전송한 자료 및 본 사이트로 회원이 제공받을
            수 있는 모든 자료들의 진위, 신뢰도, 정확성 등 그 내용에 대해서는
            책임지지 아니합니다.
          </li>
          <li>
            회사는 회원 상호간 또는 회원과 제3자 상호간에 서비스를 매개로 하여
            물품거래 등을 한 경우에 그로부터 발생하는 일체의 손해에 대하여
            책임지지 아니합니다.
          </li>
          <li>
            회사는 귀책사유 없이 회원간 또는 회원과 제3자간에 발생한 일체의
            분쟁에 대하여 책임지지 아니합니다.
          </li>
          <li>
            회사는 서버 등 설비의 관리, 점검, 보수, 교체 과정 또는 소프트웨어의
            운용 과정에서 고의 또는 고의에 준하는 중대한 과실 없이 발생할 수
            있는 시스템의 장애, 제3자의 공격으로 인한 시스템의 장애, 국내외의
            저명한 연구기관이나 보안관련 업체에 의해 대응방법이 개발되지 아니한
            컴퓨터 바이러스 등의 유포나 기타 운영자가 통제할 수 없는 불가항력적
            사유로 인한 회원의 손해에 대하여 책임지지 않습니다.
          </li>
        </ol>
        <p>부칙</p>
        <p>이 약관은 2017. 07. 03일부터 시행합니다.</p>

        <h4>제1조 목적</h4>
        <p>
          본 이용약관은 “pawsome 주식회사”(이하 “사이트”)의 서비스의 이용조건과
          운영에 관한 제반사항 규정을 목적으로 합니다.
        </p>
        <h4>제2조 용어의 정의</h4>
        <ol>
          <li>
            본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.&nbsp;회원
            : 사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서,
            사이트와의 이용계약을 체결하고 사이트를 이용하는 이용자를 말합니다.
          </li>
          <li>
            이용계약 : 사이트 이용과 관련하여 사이트와 회원간에 체결 하는 계약을
            말합니다.
          </li>
          <li>
            회원 아이디(이하 “ID”) : 회원의 식별과 회원의 서비스 이용을 위하여
            회원별로 부여하는 고유한 문자와 숫자의 조합을 말합니다.
          </li>
          <li>
            비밀번호 : 회원이 부여받은 ID와 일치된 회원임을 확인하고 회원의
            권익보호를 위하여 회원이 선정한 문자와 숫자의 조합을 말합니다.
          </li>
          <li>
            운영자 : 서비스에 홈페이지를 개설하여 운영하는 운영자를 말합니다.
          </li>
          <li>해지 : 회원이 이용계약을 해약하는 것을 말합니다.</li>
        </ol>
        <h4>제3조 약관외 준칙</h4>
        <p>
          운영자는 필요한 경우 별도로 운영정책을 공지 안내할 수 있으며, 본
          약관과 운영정책이 중첩될 경우 운영정책이 우선 적용됩니다.
        </p>
        <h4>제4조 이용계약 체결</h4>
        <ol>
          <li>
            이용계약은 회원으로 등록하여 사이트를 이용하려는 자의 본 약관 내용에
            대한 동의와 가입신청에 대하여 운영자의 이용승낙으로 성립합니다.
          </li>
          <li>
            회원으로 등록하여 서비스를 이용하려는 자는 사이트 가입신청 시 본
            약관을 읽고 아래에 있는 “동의합니다”를 선택하는 것으로 본 약관에
            대한 동의 의사 표시를 합니다.
          </li>
        </ol>
        <h4>제5조 서비스 이용 신청</h4>
        <ol>
          <li>
            회원으로 등록하여 사이트를 이용하려는 이용자는 사이트에서 요청하는
            제반정보(이용자ID, 비밀번호, 닉네임 등)를 제공해야 합니다.
          </li>
          <li>
            타인의 정보를 도용하거나 허위의 정보를 등록하는 등 본인의 진정한
            정보를 등록하지 않은 회원은 사이트 이용과 관련하여 아무런 권리를
            주장할 수 없으며, 관계 법령에 따라 처벌 받을 수 있습니다.
          </li>
        </ol>
        <h4>제6조 개인정보처리방침</h4>
        <ol>
          <li>
            사이트 및 운영자는 회원가입시 제공한 개인정보 중 비밀번호를 가지고
            있지 않으며 이와 관련된 부분은 사이트의 개인정보처리방침을 따릅니다.
          </li>
          <li>
            운영자는 관계법령이 정하는 바에 따라 회원등록정보를 포함한 회원의
            개인정보를 보호하기 위하여 노력을 합니다.
          </li>
          <li>
            회원의 개인정보보호에 관하여 관계법령 및 사이트가 정하는
            개인정보처리방침에 정한 바에 따릅니다.
          </li>
          <li>
            단, 회원의 귀책사유로 인해 노출된 정보에 대해 운영자는 일체의 책임을
            지지 않습니다.
          </li>
          <li>
            운영자는 회원이 미풍양속에 저해되거나 국가안보에 위배되는 게시물 등
            위법한 게시물을 등록 · 배포할 경우 관련기관의 요청이 있을시 회원의
            자료를 열람 및 해당 자료를 관련기관에 제출할 수 있습니다.
          </li>
        </ol>
        <h4>제7조 운영자의 의무</h4>
        <ol>
          <li>
            운영자는 이용회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할
            경우에는 가급적 빨리 처리하여야 합니다. 다만, 개인적인 사정으로
            신속한 처리가 곤란한 경우에는 사후에 공지 또는 이용회원에게 쪽지,
            전자우편 등을 보내는 등 최선을 다합니다.
          </li>
          <li>
            운영자는 계속적이고 안정적인 사이트 제공을 위하여 설비에 장애가
            생기거나 유실된 때에는 이를 지체 없이 수리 또는 복구할 수 있도록
            사이트에 요구할 수 있습니다. 다만, 천재지변 또는 사이트나 운영자에
            부득이한 사유가 있는 경우, 사이트 운영을 일시 정지할 수 있습니다.
          </li>
        </ol>
        <h4>제8조 회원의 의무</h4>
        <ol>
          <li>
            회원은 본 약관에서 규정하는 사항과 운영자가 정한 제반규정, 공지사항
            및 운영정책 등 사이트가 공지하는 사항 및 관계법령을 준수하여야 하며,
            기타 사이트의 업무에 방해가 되는 행위, 사이트의 명예를 손상시키는
            행위를 해서는 안됩니다.
          </li>
          <li>
            회원은 사이트의 명시적 동의가 없는 한 서비스의 이용권한, 기타
            이용계약상 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로
            제공할 수 없습니다.
          </li>
          <li>
            이용고객은 아이디 및 비밀번호 관리에 상당한 주의를 기울여야 하며,
            운영자나 사이트의 동의 없이 제3자에게 아이디를 제공하여 이용하게 할
            수 없습니다.
          </li>
          <li>
            회원은 운영자와 사이트 및 제3자의 지적 재산권을 침해해서는 안됩니다.
          </li>
          <li>
            회원은 사회통념상 타인에게 혐오감을 줄 수 있는 콘텐츠를 사이트 내
            게재하여서는 안되며, 운영자는 회원이 이와 같은 콘텐츠를 게재하였음을
            발견 시 운영자는 즉각적으로 탈퇴 조치를 시행합니다.
          </li>
        </ol>
        <h4>제9조 서비스 이용시간</h4>
        <ol>
          <li>
            서비스 이용시간은 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴
            1일 24시간을 원칙으로 합니다. 단, 사이트는 시스템 정기점검, 증설 및
            교체를 위해 사이트가 정한 날이나 시간에 서비스를 일시중단 할 수
            있으며 예정된 작업으로 인한 서비스 일시 중단은 사이트의 홈페이지에
            사전에 공지하오니 수시로 참고하시길 바랍니다.
          </li>
          <li>
            단, 사이트는 다음 경우에 대하여 사전 공지나 예고없이 서비스를 일시적
            혹은 영구적으로 중단할 수 있습니다.
            <br />
            (1) 긴급한 시스템 점검, 증설, 교체, 고장 혹은 오동작을 일으키는 경우
            <br />
            (2) 국가비상사태, 정전, 천재지변 등의 불가항력적인 사유가 있는 경우
            <br />
            (3) 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를
            중지한 경우
            <br />
            (4) 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는
            경우
          </li>
          <li>
            전항에 의한 서비스 중단의 경우 사이트는 사전에 공지사항 등을 통하여
            회원에게 통지 합니다. 단, 사이트가 통제할 수 없는 사유로 발생한
            서비스의 중단에 대하여 사전공지가 불가능한 경우에는 사후공지로
            대신합니다.
          </li>
        </ol>
        <h4>제10조 서비스 이용 해지</h4>
        <ol>
          <li>
            회원이 사이트와의 이용계약을 해지하고자 하는 경우에는 회원 본인이
            온라인을 통하여 등록해지신청을 하여야 합니다. 한편, 사이트
            이용해지와 별개로 사이트에 대한 이용계약 해지는 별도로 하셔야
            합니다.
          </li>
          <li>
            해지신청과 동시에 사이트가 제공하는 사이트 관련 프로그램이 회원관리
            화면에서 자동적으로 삭제됨으로 운영자는 더 이상 해지신청자의 정보를
            볼 수 없습니다.
          </li>
        </ol>
        <h4>제11조 서비스 이용 제한</h4>
        <ol>
          <li>
            회원은 다음 각 호에 해당하는 행위를 하여서는 아니되며 해당 행위를 한
            경우에 사이트는 회원의 서비스 이용 제한 및 적법한 조치를 취할 수
            있으며 이용계약을 해지하거나 기간을 정하여 서비스를 중지할 수
            있습니다.
            <br />
            (1) 회원 가입시 혹은 가입 후 정보 변경시 허위 내용을 등록하는 행위
            <br />
            (2) 타인의 사이트 이용을 방해하거나 정보를 도용하는 행위
            <br />
            (3) 사이트의 운영진, 직원 또는 관계자를 사칭하는 행위
            <br />
            (4) 사이트, 기타 제3자의 인격권 또는 지적재산권을 침해하거나 업무를
            방해하는 행위
            <br />
            (5) 다른 회원의 ID를 부정하게 사용하는 행위
            <br />
            (6) 다른 회원에 대한 개인정보를 그 동의 없이 수집, 저장, 공개하는
            행위
            <br />
            (7) 범죄와 결부된다고 객관적으로 판단되는 행위
            <br />
            (8) 기타 관련 법령에 위배되는 행위
          </li>
        </ol>
        <h4>제12조 게시물의 관리</h4>
        <ol>
          <li>
            회사는 항상 불량 게시물 및 자료에 대하여 모니터링을 하여야 하며,
            불량 게시물 및 자료를 발견하거나 신고를 받으면 해당 게시물 및 자료를
            삭제하고 이를 등록한 회원에게 주의를 주어야 합니다.
          </li>
          <li>
            한편, 이용회원이 올린 게시물에 대해서는 게시자 본인에게 책임이
            있으니 회원 스스로 본 이용약관에서 위배되는 게시물은 게재해서는
            안됩니다.
          </li>
          <li>
            정보통신윤리위원회 등 공공기관의 시정요구가 있는 경우 혹은 불량
            게시물로 판단되는 경우 회사는 회원의 사전 동의 없이 게시물을
            삭제하거나 이동 할 수 있습니다.
          </li>
          <li>
            불량게시물의 판단기준은 다음과 같습니다.
            <br />
            (1) 다른 회원 또는 제3자에게 심한 모욕을 주거나 명예를 손상시키는
            내용인 경우
            <br />
            (2) 공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는
            경우
            <br />
            (3) 불법복제 또는 해킹을 조장하는 내용인 경우
            <br />
            (4) 영리를 목적으로 하는 광고일 경우
            <br />
            (5) 범죄와 결부된다고 객관적으로 인정되는 내용일 경우. 단, 사전에
            허락을 받은 경우에는 이에 속하지 않음
            <br />
            (6) 다른 이용자 또는 제3자와 저작권 등 기타 권리를 침해하는 경우
            <br />
            (7) 기타 관계법령에 위배된다고 판단되는 경우
          </li>
          <li>
            &nbsp;사이트 및 운영자는 게시물 등에 대하여 제3자로부터 명예훼손,
            지적재산권 등의 권리 침해를 이유로 게시중단 요청을 받은 경우 이를
            임시로 게시중단(전송중단)할 수 있으며, 게시중단 요청자와 게시물
            등록자 간에 소송, 합의 기타 이에 준하는 관련기관의 결정 등이
            이루어져 사이트에 접수된 경우 이에 따릅니다.
          </li>
        </ol>
        <h4>제13조 게시물의 보관</h4>
        <ol>
          <li>
            사이트 운영자가 불가피한 사정으로 본 사이트를 중단하게 될 경우,
            회원에게 사전 공지를 하고 게시물의 이전이 쉽도록 모든 조치를 취하기
            위해 노력합니다.
          </li>
        </ol>
        <h4>제14조 게시물에 대한 저작권</h4>
        <ol>
          <li>
            회원이 사이트 내에 게시한 게시물의 저작권은 게시한 회원에게
            귀속됩니다. 다만, 사이트 운영자와 협의에 따라 에디터 및 작가로
            임명된 자가 작성하는 글에 대한 저작권은 사이트에게 귀속
            됩니다.&nbsp;
          </li>
          <li>
            사회통념상 허용하는 범위 안에서, 회사는 회원이 작성한 게시글을
            회사의 서비스를 홍보 목적으로 사용할 수 있습니다.&nbsp;
          </li>
          <li>
            회원은 서비스를 이용하여 취득한 정보를 임의 가공, 판매하는 행위 등
            서비스에 게재된 자료를 상업적으로 사용할 수 없습니다.
          </li>
          <li>
            운영자는 회원이 게시하거나 등록하는 사이트 내의 내용물, 게시 내용에
            대해 제12조 각 호에 해당된다고 판단되는 경우 사전통지 없이
            삭제하거나 이동 또는 등록 거부할 수 있습니다.
          </li>
        </ol>
        <h4>제15조 손해배상</h4>
        <ol>
          <li>
            본 사이트의 발생한 모든 민,형법상 책임은 회원 본인에게 1차적으로
            있습니다.
          </li>
          <li>
            본 사이트로부터 회원이 받은 손해가 천재지변 등 불가항력적이거나
            회원의 고의 또는 과실로 인하여 발생한 때에는 손해배상을 하지 하지
            않습니다.
          </li>
        </ol>
        <h4>제16조 면책</h4>
        <ol>
          <li>
            회사는 회원이 사이트의 서비스 제공으로부터 기대되는 이익을 얻지
            못하였거나 서비스 자료에 대한 취사선택 또는 이용으로 발생하는 손해
            등에 대해서는 책임이 면제됩니다.
          </li>
          <li>
            회사는 본 사이트의 서비스 기반 및 타 통신업자가 제공하는
            전기통신서비스의 장애로 인한 경우에는 책임이 면제되며 본 사이트의
            서비스 기반과 관련되어 발생한 손해에 대해서는 사이트의 이용약관에
            준합니다
          </li>
          <li>
            회사는 회원이 저장, 게시 또는 전송한 자료와 관련하여 일체의 책임을
            지지 않습니다.
          </li>
          <li>
            회사는 회원의 귀책사유로 인하여 서비스 이용의 장애가 발생한 경우에는
            책임지지 아니합니다.
          </li>
          <li>
            회사는 회원 상호간 또는 회원과 제3자 상호간, 기타 회원의 본 서비스
            내외를 불문한 일체의 활동(데이터 전송, 기타 커뮤니티 활동 포함)에
            대하여 책임을 지지 않습니다.
          </li>
          <li>
            회사는 회원이 게시 또는 전송한 자료 및 본 사이트로 회원이 제공받을
            수 있는 모든 자료들의 진위, 신뢰도, 정확성 등 그 내용에 대해서는
            책임지지 아니합니다.
          </li>
          <li>
            회사는 회원 상호간 또는 회원과 제3자 상호간에 서비스를 매개로 하여
            물품거래 등을 한 경우에 그로부터 발생하는 일체의 손해에 대하여
            책임지지 아니합니다.
          </li>
          <li>
            회사는 귀책사유 없이 회원간 또는 회원과 제3자간에 발생한 일체의
            분쟁에 대하여 책임지지 아니합니다.
          </li>
          <li>
            회사는 서버 등 설비의 관리, 점검, 보수, 교체 과정 또는 소프트웨어의
            운용 과정에서 고의 또는 고의에 준하는 중대한 과실 없이 발생할 수
            있는 시스템의 장애, 제3자의 공격으로 인한 시스템의 장애, 국내외의
            저명한 연구기관이나 보안관련 업체에 의해 대응방법이 개발되지 아니한
            컴퓨터 바이러스 등의 유포나 기타 운영자가 통제할 수 없는 불가항력적
            사유로 인한 회원의 손해에 대하여 책임지지 않습니다.
          </li>
        </ol>
        <p>부칙</p>
        <p>이 약관은 2017. 07. 03일부터 시행합니다.</p>

        <h4>제1조 목적</h4>
        <p>
          본 이용약관은 “pawsome 주식회사”(이하 “사이트”)의 서비스의 이용조건과
          운영에 관한 제반사항 규정을 목적으로 합니다.
        </p>
        <h4>제2조 용어의 정의</h4>
        <ol>
          <li>
            본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.&nbsp;회원
            : 사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서,
            사이트와의 이용계약을 체결하고 사이트를 이용하는 이용자를 말합니다.
          </li>
          <li>
            이용계약 : 사이트 이용과 관련하여 사이트와 회원간에 체결 하는 계약을
            말합니다.
          </li>
          <li>
            회원 아이디(이하 “ID”) : 회원의 식별과 회원의 서비스 이용을 위하여
            회원별로 부여하는 고유한 문자와 숫자의 조합을 말합니다.
          </li>
          <li>
            비밀번호 : 회원이 부여받은 ID와 일치된 회원임을 확인하고 회원의
            권익보호를 위하여 회원이 선정한 문자와 숫자의 조합을 말합니다.
          </li>
          <li>
            운영자 : 서비스에 홈페이지를 개설하여 운영하는 운영자를 말합니다.
          </li>
          <li>해지 : 회원이 이용계약을 해약하는 것을 말합니다.</li>
        </ol>
        <h4>제3조 약관외 준칙</h4>
        <p>
          운영자는 필요한 경우 별도로 운영정책을 공지 안내할 수 있으며, 본
          약관과 운영정책이 중첩될 경우 운영정책이 우선 적용됩니다.
        </p>
        <h4>제4조 이용계약 체결</h4>
        <ol>
          <li>
            이용계약은 회원으로 등록하여 사이트를 이용하려는 자의 본 약관 내용에
            대한 동의와 가입신청에 대하여 운영자의 이용승낙으로 성립합니다.
          </li>
          <li>
            회원으로 등록하여 서비스를 이용하려는 자는 사이트 가입신청 시 본
            약관을 읽고 아래에 있는 “동의합니다”를 선택하는 것으로 본 약관에
            대한 동의 의사 표시를 합니다.
          </li>
        </ol>
        <h4>제5조 서비스 이용 신청</h4>
        <ol>
          <li>
            회원으로 등록하여 사이트를 이용하려는 이용자는 사이트에서 요청하는
            제반정보(이용자ID, 비밀번호, 닉네임 등)를 제공해야 합니다.
          </li>
          <li>
            타인의 정보를 도용하거나 허위의 정보를 등록하는 등 본인의 진정한
            정보를 등록하지 않은 회원은 사이트 이용과 관련하여 아무런 권리를
            주장할 수 없으며, 관계 법령에 따라 처벌 받을 수 있습니다.
          </li>
        </ol>
        <h4>제6조 개인정보처리방침</h4>
        <ol>
          <li>
            사이트 및 운영자는 회원가입시 제공한 개인정보 중 비밀번호를 가지고
            있지 않으며 이와 관련된 부분은 사이트의 개인정보처리방침을 따릅니다.
          </li>
          <li>
            운영자는 관계법령이 정하는 바에 따라 회원등록정보를 포함한 회원의
            개인정보를 보호하기 위하여 노력을 합니다.
          </li>
          <li>
            회원의 개인정보보호에 관하여 관계법령 및 사이트가 정하는
            개인정보처리방침에 정한 바에 따릅니다.
          </li>
          <li>
            단, 회원의 귀책사유로 인해 노출된 정보에 대해 운영자는 일체의 책임을
            지지 않습니다.
          </li>
          <li>
            운영자는 회원이 미풍양속에 저해되거나 국가안보에 위배되는 게시물 등
            위법한 게시물을 등록 · 배포할 경우 관련기관의 요청이 있을시 회원의
            자료를 열람 및 해당 자료를 관련기관에 제출할 수 있습니다.
          </li>
        </ol>
        <h4>제7조 운영자의 의무</h4>
        <ol>
          <li>
            운영자는 이용회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할
            경우에는 가급적 빨리 처리하여야 합니다. 다만, 개인적인 사정으로
            신속한 처리가 곤란한 경우에는 사후에 공지 또는 이용회원에게 쪽지,
            전자우편 등을 보내는 등 최선을 다합니다.
          </li>
          <li>
            운영자는 계속적이고 안정적인 사이트 제공을 위하여 설비에 장애가
            생기거나 유실된 때에는 이를 지체 없이 수리 또는 복구할 수 있도록
            사이트에 요구할 수 있습니다. 다만, 천재지변 또는 사이트나 운영자에
            부득이한 사유가 있는 경우, 사이트 운영을 일시 정지할 수 있습니다.
          </li>
        </ol>
        <h4>제8조 회원의 의무</h4>
        <ol>
          <li>
            회원은 본 약관에서 규정하는 사항과 운영자가 정한 제반규정, 공지사항
            및 운영정책 등 사이트가 공지하는 사항 및 관계법령을 준수하여야 하며,
            기타 사이트의 업무에 방해가 되는 행위, 사이트의 명예를 손상시키는
            행위를 해서는 안됩니다.
          </li>
          <li>
            회원은 사이트의 명시적 동의가 없는 한 서비스의 이용권한, 기타
            이용계약상 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로
            제공할 수 없습니다.
          </li>
          <li>
            이용고객은 아이디 및 비밀번호 관리에 상당한 주의를 기울여야 하며,
            운영자나 사이트의 동의 없이 제3자에게 아이디를 제공하여 이용하게 할
            수 없습니다.
          </li>
          <li>
            회원은 운영자와 사이트 및 제3자의 지적 재산권을 침해해서는 안됩니다.
          </li>
          <li>
            회원은 사회통념상 타인에게 혐오감을 줄 수 있는 콘텐츠를 사이트 내
            게재하여서는 안되며, 운영자는 회원이 이와 같은 콘텐츠를 게재하였음을
            발견 시 운영자는 즉각적으로 탈퇴 조치를 시행합니다.
          </li>
        </ol>
        <h4>제9조 서비스 이용시간</h4>
        <ol>
          <li>
            서비스 이용시간은 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴
            1일 24시간을 원칙으로 합니다. 단, 사이트는 시스템 정기점검, 증설 및
            교체를 위해 사이트가 정한 날이나 시간에 서비스를 일시중단 할 수
            있으며 예정된 작업으로 인한 서비스 일시 중단은 사이트의 홈페이지에
            사전에 공지하오니 수시로 참고하시길 바랍니다.
          </li>
          <li>
            단, 사이트는 다음 경우에 대하여 사전 공지나 예고없이 서비스를 일시적
            혹은 영구적으로 중단할 수 있습니다.
            <br />
            (1) 긴급한 시스템 점검, 증설, 교체, 고장 혹은 오동작을 일으키는 경우
            <br />
            (2) 국가비상사태, 정전, 천재지변 등의 불가항력적인 사유가 있는 경우
            <br />
            (3) 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를
            중지한 경우
            <br />
            (4) 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는
            경우
          </li>
          <li>
            전항에 의한 서비스 중단의 경우 사이트는 사전에 공지사항 등을 통하여
            회원에게 통지 합니다. 단, 사이트가 통제할 수 없는 사유로 발생한
            서비스의 중단에 대하여 사전공지가 불가능한 경우에는 사후공지로
            대신합니다.
          </li>
        </ol>
        <h4>제10조 서비스 이용 해지</h4>
        <ol>
          <li>
            회원이 사이트와의 이용계약을 해지하고자 하는 경우에는 회원 본인이
            온라인을 통하여 등록해지신청을 하여야 합니다. 한편, 사이트
            이용해지와 별개로 사이트에 대한 이용계약 해지는 별도로 하셔야
            합니다.
          </li>
          <li>
            해지신청과 동시에 사이트가 제공하는 사이트 관련 프로그램이 회원관리
            화면에서 자동적으로 삭제됨으로 운영자는 더 이상 해지신청자의 정보를
            볼 수 없습니다.
          </li>
        </ol>
        <h4>제11조 서비스 이용 제한</h4>
        <ol>
          <li>
            회원은 다음 각 호에 해당하는 행위를 하여서는 아니되며 해당 행위를 한
            경우에 사이트는 회원의 서비스 이용 제한 및 적법한 조치를 취할 수
            있으며 이용계약을 해지하거나 기간을 정하여 서비스를 중지할 수
            있습니다.
            <br />
            (1) 회원 가입시 혹은 가입 후 정보 변경시 허위 내용을 등록하는 행위
            <br />
            (2) 타인의 사이트 이용을 방해하거나 정보를 도용하는 행위
            <br />
            (3) 사이트의 운영진, 직원 또는 관계자를 사칭하는 행위
            <br />
            (4) 사이트, 기타 제3자의 인격권 또는 지적재산권을 침해하거나 업무를
            방해하는 행위
            <br />
            (5) 다른 회원의 ID를 부정하게 사용하는 행위
            <br />
            (6) 다른 회원에 대한 개인정보를 그 동의 없이 수집, 저장, 공개하는
            행위
            <br />
            (7) 범죄와 결부된다고 객관적으로 판단되는 행위
            <br />
            (8) 기타 관련 법령에 위배되는 행위
          </li>
        </ol>
        <h4>제12조 게시물의 관리</h4>
        <ol>
          <li>
            회사는 항상 불량 게시물 및 자료에 대하여 모니터링을 하여야 하며,
            불량 게시물 및 자료를 발견하거나 신고를 받으면 해당 게시물 및 자료를
            삭제하고 이를 등록한 회원에게 주의를 주어야 합니다.
          </li>
          <li>
            한편, 이용회원이 올린 게시물에 대해서는 게시자 본인에게 책임이
            있으니 회원 스스로 본 이용약관에서 위배되는 게시물은 게재해서는
            안됩니다.
          </li>
          <li>
            정보통신윤리위원회 등 공공기관의 시정요구가 있는 경우 혹은 불량
            게시물로 판단되는 경우 회사는 회원의 사전 동의 없이 게시물을
            삭제하거나 이동 할 수 있습니다.
          </li>
          <li>
            불량게시물의 판단기준은 다음과 같습니다.
            <br />
            (1) 다른 회원 또는 제3자에게 심한 모욕을 주거나 명예를 손상시키는
            내용인 경우
            <br />
            (2) 공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는
            경우
            <br />
            (3) 불법복제 또는 해킹을 조장하는 내용인 경우
            <br />
            (4) 영리를 목적으로 하는 광고일 경우
            <br />
            (5) 범죄와 결부된다고 객관적으로 인정되는 내용일 경우. 단, 사전에
            허락을 받은 경우에는 이에 속하지 않음
            <br />
            (6) 다른 이용자 또는 제3자와 저작권 등 기타 권리를 침해하는 경우
            <br />
            (7) 기타 관계법령에 위배된다고 판단되는 경우
          </li>
          <li>
            &nbsp;사이트 및 운영자는 게시물 등에 대하여 제3자로부터 명예훼손,
            지적재산권 등의 권리 침해를 이유로 게시중단 요청을 받은 경우 이를
            임시로 게시중단(전송중단)할 수 있으며, 게시중단 요청자와 게시물
            등록자 간에 소송, 합의 기타 이에 준하는 관련기관의 결정 등이
            이루어져 사이트에 접수된 경우 이에 따릅니다.
          </li>
        </ol>
        <h4>제13조 게시물의 보관</h4>
        <ol>
          <li>
            사이트 운영자가 불가피한 사정으로 본 사이트를 중단하게 될 경우,
            회원에게 사전 공지를 하고 게시물의 이전이 쉽도록 모든 조치를 취하기
            위해 노력합니다.
          </li>
        </ol>
        <h4>제14조 게시물에 대한 저작권</h4>
        <ol>
          <li>
            회원이 사이트 내에 게시한 게시물의 저작권은 게시한 회원에게
            귀속됩니다. 다만, 사이트 운영자와 협의에 따라 에디터 및 작가로
            임명된 자가 작성하는 글에 대한 저작권은 사이트에게 귀속
            됩니다.&nbsp;
          </li>
          <li>
            사회통념상 허용하는 범위 안에서, 회사는 회원이 작성한 게시글을
            회사의 서비스를 홍보 목적으로 사용할 수 있습니다.&nbsp;
          </li>
          <li>
            회원은 서비스를 이용하여 취득한 정보를 임의 가공, 판매하는 행위 등
            서비스에 게재된 자료를 상업적으로 사용할 수 없습니다.
          </li>
          <li>
            운영자는 회원이 게시하거나 등록하는 사이트 내의 내용물, 게시 내용에
            대해 제12조 각 호에 해당된다고 판단되는 경우 사전통지 없이
            삭제하거나 이동 또는 등록 거부할 수 있습니다.
          </li>
        </ol>
        <h4>제15조 손해배상</h4>
        <ol>
          <li>
            본 사이트의 발생한 모든 민,형법상 책임은 회원 본인에게 1차적으로
            있습니다.
          </li>
          <li>
            본 사이트로부터 회원이 받은 손해가 천재지변 등 불가항력적이거나
            회원의 고의 또는 과실로 인하여 발생한 때에는 손해배상을 하지 하지
            않습니다.
          </li>
        </ol>
        <h4>제16조 면책</h4>
        <ol>
          <li>
            회사는 회원이 사이트의 서비스 제공으로부터 기대되는 이익을 얻지
            못하였거나 서비스 자료에 대한 취사선택 또는 이용으로 발생하는 손해
            등에 대해서는 책임이 면제됩니다.
          </li>
          <li>
            회사는 본 사이트의 서비스 기반 및 타 통신업자가 제공하는
            전기통신서비스의 장애로 인한 경우에는 책임이 면제되며 본 사이트의
            서비스 기반과 관련되어 발생한 손해에 대해서는 사이트의 이용약관에
            준합니다
          </li>
          <li>
            회사는 회원이 저장, 게시 또는 전송한 자료와 관련하여 일체의 책임을
            지지 않습니다.
          </li>
          <li>
            회사는 회원의 귀책사유로 인하여 서비스 이용의 장애가 발생한 경우에는
            책임지지 아니합니다.
          </li>
          <li>
            회사는 회원 상호간 또는 회원과 제3자 상호간, 기타 회원의 본 서비스
            내외를 불문한 일체의 활동(데이터 전송, 기타 커뮤니티 활동 포함)에
            대하여 책임을 지지 않습니다.
          </li>
          <li>
            회사는 회원이 게시 또는 전송한 자료 및 본 사이트로 회원이 제공받을
            수 있는 모든 자료들의 진위, 신뢰도, 정확성 등 그 내용에 대해서는
            책임지지 아니합니다.
          </li>
          <li>
            회사는 회원 상호간 또는 회원과 제3자 상호간에 서비스를 매개로 하여
            물품거래 등을 한 경우에 그로부터 발생하는 일체의 손해에 대하여
            책임지지 아니합니다.
          </li>
          <li>
            회사는 귀책사유 없이 회원간 또는 회원과 제3자간에 발생한 일체의
            분쟁에 대하여 책임지지 아니합니다.
          </li>
          <li>
            회사는 서버 등 설비의 관리, 점검, 보수, 교체 과정 또는 소프트웨어의
            운용 과정에서 고의 또는 고의에 준하는 중대한 과실 없이 발생할 수
            있는 시스템의 장애, 제3자의 공격으로 인한 시스템의 장애, 국내외의
            저명한 연구기관이나 보안관련 업체에 의해 대응방법이 개발되지 아니한
            컴퓨터 바이러스 등의 유포나 기타 운영자가 통제할 수 없는 불가항력적
            사유로 인한 회원의 손해에 대하여 책임지지 않습니다.
          </li>
        </ol>
        <p>부칙</p>
        <p>이 약관은 2017. 07. 03일부터 시행합니다.</p>
        <div className="modal-btn">
          <button onClick={closeModal}>닫기</button>
        </div>
      </ReactModal>
    </div>
  );
};

export default KakaoJoin;
