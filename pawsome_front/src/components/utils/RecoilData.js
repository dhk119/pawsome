import { atom, selector } from "recoil";

const loginEmailState = atom({
  key: "loginEmailState",
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
    return loginEmail !== "test" && memberLevel !== 0;
  },
});

export { loginEmailState, memberLevelState, isLoginState };
