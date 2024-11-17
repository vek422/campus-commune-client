import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Commune } from "./CommuneReducer";


interface User {
  firstName: string;
  lastName: string;
  email: string;
  communes: Commune[] | string[];
  friends: User[] | string[];
  profileUrl: string;
  comments: object[] | string[];
  createdAt: string;
  updatedAt: string;
  globalRole: {
    name: string;
    permissions: string[];
  }
  _id: string;
}


export interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    login: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    joinCommune: (state, action: PayloadAction<string>) => {
      console.log("Joining commune reducer")
      state.user?.communes.push(action.payload)
    },
    leaveCommune: (state, action: PayloadAction<string>) => {
      state.user.communes.splice(state.user.communes.indexOf(action.payload), 1)
    }
  },
});

export const { login, logout, updateUser, joinCommune, leaveCommune } = authSlice.actions;
export default authSlice.reducer;
