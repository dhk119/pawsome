import "./mypage.css";
// import * as TbIcons from "react-icons/tb";

import { loginEmailState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import { useState } from "react";
import PetFrm from "./PetFrm";
import axios from "axios";

const PetInsert = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  //반려동물 정보 등록시 전송할 데이터
  const [memberEmail, setMemberEmail] = useRecoilState(loginEmailState);
  const [petName, setPetName] = useState("");
  const [petBirth, setPetBirth] = useState("");
  const [petClasses, setPetClasses] = useState(0);
  const [petBreed, setPetBreed] = useState("");
  const [neutering, setNeutering] = useState(0);
  const [petProfile, setPetProfile] = useState("");
  const [petWeight, setPetWeight] = useState(0);

  // const changePet = (e) => {
  //   const name = e.target.name;
  //   setPet({ ...pet, [name]: e.target.value });
  // };

  const insertPet = () => {
    axios
      .post(`${backServer}/member/pet`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
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
          <PetFrm
            memberEmail={memberEmail}
            petName={petName}
            setPetName={setPetName}
            petBirth={petBirth}
            setPetBirth={setPetBirth}
            petClasses={petClasses}
            setPetClasses={setPetClasses}
            petBreed={petBreed}
            setPetBreed={setPetBreed}
            neutering={neutering}
            setNeutering={setNeutering}
            petProfile={petProfile}
            setPetProfile={setPetProfile}
            petWeight={petWeight}
            setPetWeight={setPetWeight}
          />
        </form>
      </div>
    </div>
  );
};

export default PetInsert;
