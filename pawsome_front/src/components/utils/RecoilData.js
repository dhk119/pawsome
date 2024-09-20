import { atom, selector } from "recoil";

const loginEmailState = atom({
  key: "loginEmailState",
  default: "test",
});
const loginNicknameState = atom({
  key: "loginNicknameStaet",
  default: "",
});
const memberLevelState = atom({
  key: "memberLevelState",
  default: 0,
});

const isLoginState = selector({
  key: "isLoginState",
  get: (state) => {
    const loginEmail = state.get(loginEmailState);
    const memberLevel = state.get(memberLevelState);
    const loginNickname = state.get(loginNicknameState);
    return loginEmail !== "" && memberLevel !== 0;
  },
});

export { loginEmailState, memberLevelState, isLoginState, loginNicknameState };
