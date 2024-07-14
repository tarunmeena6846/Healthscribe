import { atom } from "recoil";

export interface User {
  email: string;
}

export const userState = atom<User | null>({
  key: "userState",
  default: { email: "" },
});
