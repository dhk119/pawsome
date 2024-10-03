import { useEffect, useState } from "react";
import axios from "axios";
import PetFrm from "./PetFrm"; // PetFrm을 재사용
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const PetUpdate = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const { petNo } = useParams(); // URL에서 반려동물 ID 가져오기

  const [memberEmail] = useRecoilState(loginEmailState);
  const [pet, setPet] = useState({
    petName: "",
    petBirth: "",
    petClasses: "0",
    petBreed: "",
    petGender: "0",
    neutering: "0",
    petWeight: "0",
    petProfile: null,
  });

  // 기존 반려동물 데이터 가져오기
  useEffect(() => {
    axios
      .get(`${backServer}/member/petNo/${petNo}`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setPet(res.data);
        } else {
          Swal.fire({
            title: "반려동물 정보를 가져오는 데 실패했습니다.",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, [backServer, petNo]);

  // 반려동물 정보 수정
  const updatePet = () => {
    const form = new FormData();
    form.append("memberEmail", memberEmail);
    form.append("petName", pet.petName);
    form.append("petBirth", pet.petBirth);
    form.append("petClasses", pet.petClasses);
    form.append("petBreed", pet.petBreed);
    form.append("petGender", pet.petGender);
    form.append("neutering", pet.neutering);
    form.append("petWeight", pet.petWeight);
    if (pet.petProfile !== null) {
      form.append("petProfile1", pet.petProfile); // 프로필 이미지
    }

    axios
      .post(`${backServer}/member/updatePet/${petNo}`, form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "반려동물 정보가 수정되었습니다.",
            icon: "success",
          });
          navigate("/mypage/profile");
        } else {
          Swal.fire({
            title: "수정에 실패했습니다.",
            text: "다시 시도해주세요.",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="pet-input-body">
      <div className="pet-input-wrap">
        <h2>반려동물 정보 수정</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updatePet();
          }}
        >
          <PetFrm pet={pet} setPet={setPet} />
          <div className="pet-btn-insert-wrap">
            <button className="pet-insert-btn-wrap" type="submit">
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetUpdate;
