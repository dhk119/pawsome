import "./mypage.css";
// import * as TbIcons from "react-icons/tb";
import { TbDog } from "react-icons/tb";
import { LuCat } from "react-icons/lu";
import { loginEmailState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";

const PetInsert = () => {
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);

  return (
    <div className="pet-input-body">
      <div className="pet-input-wrap">
        <h2>반려동물 등록</h2>
        <form>
          <div className="pet-input">
            <label>이름</label>
            <input type="text" />
          </div>
          <div className="pet-input">
            <label>생년월일</label>
            <input type="date" />
          </div>
          <div className="pet-breed">
            <label htmlFor="dog" className="breed-label">
              <input
                type="radio"
                id="dog"
                name="breed"
                value="1"
                className="breed-input"
              />
              <TbDog className="breed-icon dog-icon" />
            </label>

            <label htmlFor="cat" className="breed-label">
              <input
                type="radio"
                id="cat"
                name="breed"
                value="2"
                className="breed-input"
              />
              <LuCat className="breed-icon cat-icon" />
            </label>
          </div>
          <div className="pet-input">
            <label>품종</label>
            <input type="text" />
          </div>
          <div className="pet-gender">
            <div>성별</div>
            <div className="pet-gender-wrap">
              <input type="radio" name="gender" id="m" value="1" />
              <label htmlFor="m">남</label>
              <input type="radio" name="gender" id="f" value="2" />
              <label htmlFor="f">여</label>
            </div>
          </div>
          <div>
            <label>중성화 여부</label>
            <input type="radio" name="neutering" value="1" />
            <input type="radio" name="neutering" value="2" />
          </div>
          <div className="pet-input">
            <label>몸무게</label>
            <input type="text" />
          </div>
          <div>
            <button>등록</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetInsert;
