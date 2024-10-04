import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // useNavigate 추가
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import Swal from "sweetalert2"; // 삭제 확인용
import "./PetView.css";

const PetView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const petNo = params.petNo;
  const [pet, setPet] = useState({});
  const [loginEmail] = useRecoilState(loginEmailState);
  const navigate = useNavigate(); // useNavigate 훅

  useEffect(() => {
    axios
      .get(`${backServer}/member/petNo/${petNo}`)
      .then((res) => {
        console.log("반려동물 정보: ", res.data);
        setPet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backServer, petNo]);

  // 날짜 형식을 'yyyy-mm-dd'로 변환하는 함수
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(); // 생일만 표시
  };

  // 수정하기 버튼 클릭 시 PetUpdate 페이지로 이동
  const handleUpdate = () => {
    navigate(`/petUpdate/${petNo}`); // 해당 반려동물 번호로 이동
  };

  // 반려동물 삭제 기능
  const handleDelete = () => {
    Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      text: "이 작업은 되돌릴 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${backServer}/member/deletePet/${petNo}`)
          .then((res) => {
            Swal.fire({
              title: "삭제되었습니다!",
              icon: "success",
            });
            navigate("/mypage/profile");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <>
      <div className="pet-container">
        <h2 className="pet-title">반려동물 상세보기</h2>
        <div className="pet-profile">
          <img
            className="pet-image"
            src={
              pet.petProfile
                ? `${backServer}/member/pet/${pet.petProfile}`
                : "/images/default-pet.png"
            }
            alt={pet.petName}
          />
        </div>
        <table className="pet-table">
          <tbody>
            <tr>
              <th>이름</th>
              <td>{pet.petName}</td>
            </tr>
            <tr>
              <th>품종</th>
              <td>{pet.petBreed}</td>
            </tr>
            <tr>
              <th>분류</th>
              <td>{pet.petClasses === 1 ? "강아지" : "고양이"}</td>
            </tr>
            <tr>
              <th>생일</th>
              <td>{formatDate(pet.petBirth)}</td>
            </tr>
            <tr>
              <th>성별</th>
              <td>{pet.petGender === "남" ? "수컷" : "암컷"}</td>
            </tr>
            <tr>
              <th>중성화 여부</th>
              <td>{pet.neutering === 1 ? "예" : "아니오"}</td>
            </tr>
            <tr>
              <th>체중</th>
              <td>{pet.petWeight} kg</td>
            </tr>
          </tbody>
        </table>

        <div className="pet-btn-wrap">
          <button className="pet-update-btn" onClick={handleUpdate}>
            수정하기
          </button>
          <button className="pet-delete-btn" onClick={handleDelete}>
            삭제하기
          </button>
        </div>
      </div>
      <div className="pet-mbti-link">
        <Link to="/service/mbti">
          <img src="/image/dogBTI.jpg" alt="Pet MBTI" />
        </Link>
      </div>
    </>
  );
};

export default PetView;
