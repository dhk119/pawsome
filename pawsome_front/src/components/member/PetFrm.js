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
  const [originalPetProfile, setOriginalPetProfile] = useState(null);

  // 강아지 및 고양이 품종 목록
  const breeds = {
    dog: [
      "",
      "진돗개",
      "허스키",
      "웰시코기",
      "비숑 프리제",
      "푸들",
      "말티즈",
      "시츄",
      "포메라니안",
      "불독",
      "슈나우저",
      "치와와",
      "요크셔 테리어",
      "스피츠",
      "래브라도 리트리버",
      "프렌치 불독",
      "믹스견",
      "시바견",
      "퍼그",
      "닥스훈트",
      "사모예드",
      "차우차우",
      "아키타",
      "골든 리트리버",
      "코카 스파니엘",
      "케인 코르소",
      "로트와일러",
      "저먼 셰퍼드",
    ],
    cat: [
      "",
      "러시안 블루",
      "샴",
      "페르시안",
      "메인쿤",
      "스코티시 폴드",
      "코리안 숏헤어",
      "아비시니안",
      "벵갈",
      "랙돌",
      "노르웨이 숲",
      "스핑크스",
      "브리티시 숏헤어",
      "먼치킨",
      "터키시 앙고라",
      "샤르트뢰",
      "히말라얀",
      "봄베이",
      "데본 렉스",
      "오리엔탈 숏헤어",
      "터키시 반",
      "아메리칸 숏헤어",
      "셀커크 렉스",
      "버만",
      "네벨룽",
      "사바나",
    ],
  };

  // 사진 미리보기 및 초기 이미지 설정
  useEffect(() => {
    if (pet.petProfile && typeof pet.petProfile === "string") {
      // pet.petProfile에 이미 서버 경로가 포함된 경우 다시 붙이지 않도록 확인
      if (pet.petProfile.startsWith("http")) {
        setPetImgPreview(pet.petProfile);
      } else {
        setPetImgPreview(`${backServer}/member/pet/${pet.petProfile}`);
      }
    } else if (pet.petProfile instanceof File) {
      // 새로 업로드한 파일인 경우
      const reader = new FileReader();
      reader.readAsDataURL(pet.petProfile);
      reader.onloadend = () => {
        setPetImgPreview(reader.result);
      };
    } else {
      setPetImgPreview(`${backServer}/member/pet/pet_img.png`);
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
      // 파일 선택 취소 시 기존 이미지로 돌아감
      setPetImgPreview(originalPetProfile);
      setPet((prevPet) => ({
        ...prevPet,
        petProfile: originalPetProfile, // 기존 프로필 이미지로 되돌림
      }));
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
              checked={String(pet.petClasses) === "1"}
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
              checked={String(pet.petClasses) === "2"}
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
          value="남"
          checked={String(pet.petGender).trim() === "남"}
          onChange={handleInputChange}
        />
        <label htmlFor="m">남</label>
        <input
          type="radio"
          name="petGender"
          id="f"
          value="여"
          checked={String(pet.petGender).trim() === "여"}
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
          type="number"
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
