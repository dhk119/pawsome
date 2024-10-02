import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";

const PetView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const petNo = params.petNo;
  const [pet, setPet] = useState({});
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${backServer}/member/petNo/${petNo}`)
      .then((res) => {
        console.log("반려동물 정보 " + res.data);
        setPet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="pet-input-form">
      <div>{pet.petName}</div>
      <div>{pet.petClasses}</div>
      <div>{pet.petBreed}</div>
    </div>
  );
};

export default PetView;
