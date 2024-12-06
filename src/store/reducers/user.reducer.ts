import { createSlice } from "@reduxjs/toolkit";

export interface IUserState {
  access_token: string;
  id_patient: string;
  id: string;
  email: string;
  name: string;
  last_name: string;
  full_name: string;
  phone: string;
  avatar: string;
  id_pet: string;
  isPet: boolean;
  parentesco: string;
  id_parentesco: string;
  id_principal: string;
  id_paciente_principal: string;
  vinculado?: number;
  first_time?: boolean;
}

const UserEmptyState: IUserState = {
  access_token: "",
  id_patient: "",
  id: "",
  email: "",
  name: "",
  last_name: "",
  full_name: "",
  phone: "",
  avatar: "",
  id_pet: "",
  isPet: false,
  parentesco: "",
  id_parentesco: "",
  id_principal: "",
  id_paciente_principal: "",
  vinculado: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState: UserEmptyState,
  reducers: {
    createToken: (_state, action) => {
      return action.payload;
    },
    modifyUser: (_state, action) => {
      return {
        ..._state,
        ...action.payload,
      };
    },
    resetUser: () => {
      return UserEmptyState;
    },
  },
});

export const { createToken, modifyUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
