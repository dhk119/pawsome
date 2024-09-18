import { atom, selector } from "recoil";

const loginEmailState = atom({
  key: "loginEmailState",
  default: "test",
});

const memberTypeState = atom({
  key: "memberTypeState",
  default: 0,
});

const isLoginState = selector({
  key: "isLoginState",
  get: (state) => {
    const loginEmail = state.get(loginEmailState);
    const memberType = state.get(memberTypeState);
    return loginEmail !== "" && memberType !== 0;
  },
});

export { loginEmailState, memberTypeState, isLoginState };
