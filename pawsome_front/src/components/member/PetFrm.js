import { TbDog } from "react-icons/tb";
import { LuCat } from "react-icons/lu";
import { useRef, useState } from "react";

const PetFrm = ({ pet, setPet }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  const petImgRef = useRef(null);
  const [petImgPreview, setPetImgPreview] = useState(null);

  // 강아지 및 고양이 품종 목록
  const breeds = {
    dog: ["진돗개", "허스키", "웰시코기", "리트리버", "비숑 프리제"],
    cat: ["러시안 블루", "샴", "페르시안", "메인쿤", "스코티시 폴드"],
  };

  // 사진 미리보기
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPet((prevPet) => ({
        ...prevPet,
        petProfile: file,
      }));

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPetImgPreview(reader.result);
      };
    } else {
      setPetImgPreview("pet_img.png");
    }
  };

  return (
    <div className="pet-input-form">
      <div className="image-upload">
        <img
          alt="반려동물 이미지 미리보기"
          src={petImgPreview || `${backServer}/member/pet/pet_img.png`}
          className="pet-image"
          onClick={() => {
            petImgRef.current.click();
          }}
        />
        <label>
          <input
            ref={petImgRef}
            type="file"
            accept="image/*"
            name="petProfile"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
      </div>

      <div className="pet-input">
        <label htmlFor="petName">이름</label>
        <input
          type="text"
          id="petName"
          name="petName"
          value={pet.petName}
          onChange={handleInputChange}
        />
      </div>

      <div className="pet-input">
        <label htmlFor="petBirth">생년월일</label>
        <input
          type="date"
          name="petBirth"
          id="petBirth"
          value={pet.petBirth}
          onChange={handleInputChange}
        />
      </div>

      <div className="pet-breed">
        <div>종</div>
        <div className="pet-breed-wrap">
          <label htmlFor="dog" className="breed-label">
            <input
              type="radio"
              id="dog"
              name="petClasses"
              value="1"
              checked={pet.petClasses === "1"}
              onChange={handleInputChange}
              className="breed-input"
            />
            <TbDog className="breed-icon dog-icon" />
          </label>

          <label htmlFor="cat" className="breed-label">
            <input
              type="radio"
              id="cat"
              name="petClasses"
              value="2"
              checked={pet.petClasses === "2"}
              onChange={handleInputChange}
              className="breed-input"
            />
            <LuCat className="breed-icon cat-icon" />
          </label>
        </div>
      </div>

      <div className="pet-input breeds">
        <label>품종</label>
        <select
          name="petBreed"
          value={pet.petBreed}
          onChange={handleInputChange}
        >
          {pet.petClasses === "1" &&
            breeds.dog.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          {pet.petClasses === "2" &&
            breeds.cat.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
        </select>
      </div>

      <div className="pet-gender-wrap">
        <div className="pet-title">성별</div>
        <input
          type="radio"
          name="petGender"
          id="m"
          value="1"
          checked={pet.petGender === "1"}
          onChange={handleInputChange}
        />
        <label htmlFor="m">남</label>
        <input
          type="radio"
          name="petGender"
          id="f"
          value="2"
          checked={pet.petGender === "2"}
          onChange={handleInputChange}
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
          checked={pet.neutering === "1"}
          onChange={handleInputChange}
        />
        <label htmlFor="yes">YES</label>
        <input
          type="radio"
          name="neutering"
          id="no"
          value="2"
          checked={pet.neutering === "2"}
          onChange={handleInputChange}
        />
        <label htmlFor="no">NO</label>
      </div>

      <div className="pet-input">
        <label htmlFor="petWeight">몸무게</label>
        <input
          type="text"
          id="petWeight"
          name="petWeight"
          value={pet.petWeight}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default PetFrm;
