import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addCommune, Commune } from "./CommuneReducer";


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
    updateCommune: (state, payload) => {
      state.user?.communes.push(payload)
    }
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
