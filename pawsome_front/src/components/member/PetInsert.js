import { useState } from "react";
import axios from "axios";
import PetFrm from "./PetFrm"; // PetFrm을 재사용
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./member.css";

const PetInsert = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

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

  const insertPet = (e) => {
    if (
      !pet.petName ||
      !pet.petBirth ||
      !pet.petBreed ||
      pet.petClasses === "0" ||
      pet.petGender === "0" ||
      pet.neutering === "0" ||
      !pet.petWeight
    ) {
      Swal.fire({
        title: "모두 입력해주세요.",
        text: "입력되지 않은 정보가 있습니다.",
        icon: "warning",
      });
      return;
    }

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
      form.append("petProfile1", pet.petProfile);
    }
    axios
      .post(`${backServer}/member/insertPet`, form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "반려동물이 등록되었습니다!",
            text: "성공적으로 등록되었습니다.",
            icon: "success",
          });
          navigate("/mypage/profile");
        } else {
          Swal.fire({
            title: "에러가 발생했습니다.",
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
        <h2>반려동물 등록</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            insertPet();
          }}
        >
          <PetFrm pet={pet} setPet={setPet} />
          <div className="pet-btn-insert-wrap">
            <button className="pet-insert-btn-wrap" type="submit">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetInsert;
