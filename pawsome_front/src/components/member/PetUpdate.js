import axios from "axios";
import { useNavigate } from "react-router-dom";
import PetFrm from "./PetFrm";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";

const PetUpdate = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [memberEmail] = useRecoilState(loginEmailState);
  const [pet, setPet] = useState({
    petNo: "",
    petName: "",
    petBirth: "",
    petClasses: "0",
    petBreed: "",
    petGender: "0",
    neutering: "0",
    petWeight: "0",
    petProfile: null,
  });

  useEffect(() => {
    axios
      .get(`${backServer}/member/petNo/${pet.petNo}`)
      .then((res) => {
        console.log(res);
        setPet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const petUpdate = () => {
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
      .patch(`${backServer}/member/pet`, form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          navigate(`/mypage/profile`);
        } else {
          //실패 시 로직
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
            petUpdate();
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

export default PetUpdate;
