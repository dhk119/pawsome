import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist"; //새로고침해도 데이터 저장되어있게

const { persistAtom } = recoilPersist();
const loginEmailState = atom({
  key: "loginEmailState",
  default: "test",
  effects_UNSTABLE: [persistAtom], //새로고침해도 데이터 저장되어있게
});
const memberLevelState = atom({
  key: "memberLevelState",
  default: 0,
});

const memberNicknameState = atom({
  key: "memberNicknameState",
  default: "test2",
  effects_UNSTABLE: [persistAtom], //새로고침해도 데이터 저장되어있게
});

const isLoginState = selector({
  key: "isLoginState",
  get: (state) => {
    const loginEmail = state.get(loginEmailState);
    const memberLevel = state.get(memberLevelState);
    const memberNickname = state.get(memberNicknameState);
    return loginEmail !== "" && memberLevel !== 0 && memberNickname !== "";
  },
});

export { loginEmailState, memberLevelState, isLoginState, memberNicknameState };
