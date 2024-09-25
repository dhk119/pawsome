import { useState } from "react";
import "./mypage.css";
import { TbDog } from "react-icons/tb";
import { LuCat } from "react-icons/lu";

const PetFrm = (props) => {
  console.log(props);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const memberEmail = props.memberEmail;
  const petName = props.petName;
  const setPetName = props.setPetName;
  const petBirth = props.petBirth;
  const setPetBirth = props.setPetBirth;
  const petClasses = props.petClasses;
  const setPetClasses = props.setPetClasses;
  const petBreed = props.petBreed;
  const setPetBreed = props.setPetBreed;
  const petGender = props.petGender;
  const setPetGender = props.setPetGender;
  const neutering = props.neutering;
  const setNeutering = props.setNeutering;
  const petProfile = props.petProfile;
  const setPetProfile = props.setPetProfile;
  const petWeight = props.petWeight;
  const setPetWeight = props.setPetWeight;

  const [selectedBreed, setSelectedBreed] = useState("");

  const addFileChange = (e) => {
    props.setPetProfile(e.target.files[0]);
  };

  return (
    <div className="pet-input-form">
      <div className="image-upload">
        <img className="pet-image" />
        <label>
          <input type="file" onChange={addFileChange} />
        </label>
      </div>

      <div className="pet-input">
        <label htmlFor="petName">이름</label>
        <input
          type="text"
          id="petName"
          name="petName"
          value={petName}
          onChange={setPetName}
        />
      </div>

      <div className="pet-input">
        <label htmlFor="petBirth">생년월일</label>
        <input
          type="date"
          name="petBirth"
          id="petBirth"
          value={petBirth}
          onChange={setPetBirth}
        />
      </div>

      <div className="pet-breed">
        <div>종</div>
        <div className="pet-breed-wrap">
          <label htmlFor="dog" className="breed-label">
            <input
              type="radio"
              id="dog"
              name="breed"
              value="1"
              checked={petClasses}
              onChange={setPetClasses}
            />
            <TbDog className="breed-icon dog-icon" />
          </label>

          <label htmlFor="cat" className="breed-label">
            <input
              type="radio"
              id="cat"
              name="breed"
              value="2"
              checked={petClasses}
              onChange={setPetClasses}
            />
            <LuCat className="breed-icon cat-icon" />
          </label>
        </div>
      </div>

      <div className="pet-input breeds">
        <label>품종</label>
        <select
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
        >
          <option value="진돗개">진돗개</option>
          <option value="허스키">허스키</option>
          <option value="웰시코기">웰시코기</option>
          <option value="리트리버">리트리버</option>
          <option value="비숑 프리제">비숑 프리제</option>
        </select>
      </div>

      <div className="pet-gender-wrap">
        <div className="pet-title">성별</div>
        <input
          type="radio"
          name="gender"
          id="m"
          value="1"
          checked={props.petGender === 1}
          onChange={setPetGender}
        />
        <label htmlFor="m">남</label>
        <input
          type="radio"
          name="gender"
          id="f"
          value="2"
          checked={props.petGender === 2}
          onChange={setPetGender}
        />
        <label htmlFor="f">여</label>
      </div>

      <div className="pet-neutering">
        <div className="pet-title">중성화 여부</div>
        <input
          type="radio"
          name="neutering"
          id="yes"
          value="1"
          checked={neutering === 1}
          onChange={setNeutering}
        />
        <label htmlFor="yes">YES</label>
        <input
          type="radio"
          name="neutering"
          id="no"
          value="2"
          checked={neutering === 2}
          onChange={setNeutering}
        />
        <label htmlFor="no">NO</label>
      </div>

      <div className="pet-input">
        <label htmlFor="petWeight">몸무게</label>
        <input
          type="text"
          id="petWeight"
          name="petWeight"
          value={petWeight}
          onChange={setPetWeight}
        />
      </div>
      <div className="pet-insert-btn">
        <button type="submit">등록하기</button>
      </div>
    </div>
  );
};

export default PetFrm;
