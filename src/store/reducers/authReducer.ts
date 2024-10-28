import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface User {
  firstName: string;
  lastName: string;
  email: string;
  communes: object[] | string[];
  friends: object[] | string[];
  profileUrl: string;
  comments: object[] | string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
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

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
