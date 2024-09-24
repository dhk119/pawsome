import { atom, selector } from "recoil";

const loginEmailState = atom({
  key: "loginEmailState",
  default: "test",
});
const memberLevelState = atom({
  key: "memberLevelState",
  default: 0,
});

const memberNicknameState = atom({
  key: "memberNicknameState",
  default: "test2",
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
