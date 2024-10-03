import { TbDog } from "react-icons/tb";
import { LuCat } from "react-icons/lu";
import { useRef, useState, useEffect } from "react";

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

  // 사진 미리보기 및 초기 이미지 설정
  useEffect(() => {
    if (pet.petProfile && typeof pet.petProfile === "string") {
      // 기존에 저장된 파일인 경우
      setPetImgPreview(`${backServer}/member/pet/${pet.petProfile}`);
    } else if (pet.petProfile instanceof File) {
      // 새로 업로드한 파일인 경우
      const reader = new FileReader();
      reader.readAsDataURL(pet.petProfile);
      reader.onloadend = () => {
        setPetImgPreview(reader.result);
      };
    } else {
      setPetImgPreview("/images/default-pet.png");
    }
  }, [pet.petProfile, backServer]);

  // 사진 미리보기 처리
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
      setPetImgPreview("/images/default-pet.png");
    }
  };

  return (
    <div className="pet-input-form">
      <div className="image-upload">
        <img
          alt="반려동물 이미지 미리보기"
          src={petImgPreview}
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
          value={pet.petName || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="pet-input">
        <label htmlFor="petBirth">생년월일</label>
        <input
          type="date"
          name="petBirth"
          id="petBirth"
          value={pet.petBirth ? pet.petBirth.split(" ")[0] : ""}
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
              checked={String(pet.petClasses) === "1"} // 문자열 비교로 변경
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
              checked={String(pet.petClasses) === "2"} // 문자열 비교로 변경
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
          value={pet.petBreed || ""}
          onChange={handleInputChange}
        >
          {/* 종에 따라 품종 리스트 보여줌 */}
          {String(pet.petClasses) === "1" &&
            breeds.dog.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          {String(pet.petClasses) === "2" &&
            breeds.cat.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
        </select>
      </div>

      <div className="pet-gender-wrap">
        <div>성별</div>
        <input
          type="radio"
          name="petGender"
          id="m"
          value="1"
          checked={String(pet.petGender).trim() === "1"} // 공백 제거
          onChange={handleInputChange}
        />
        <label htmlFor="m">남</label>
        <input
          type="radio"
          name="petGender"
          id="f"
          value="2"
          checked={String(pet.petGender).trim() === "2"} // 공백 제거
          onChange={handleInputChange}
        />
        <label htmlFor="f">여</label>
      </div>

      <div className="pet-neutering">
        <div>중성화 여부</div>
        <input
          type="radio"
          name="neutering"
          id="yes"
          value="1"
          checked={String(pet.neutering) === "1"} // 문자열 비교로 변경
          onChange={handleInputChange}
        />
        <label htmlFor="yes">YES</label>
        <input
          type="radio"
          name="neutering"
          id="no"
          value="2"
          checked={String(pet.neutering) === "2"} // 문자열 비교로 변경
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
          value={pet.petWeight || ""}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default PetFrm;
