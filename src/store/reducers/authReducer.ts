import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Commune } from "./CommuneReducer";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  communes: Commune[];
  friends: User[] | string[];
  profile_uri: string;
  comments: object[] | string[];
  createdAt: string;
  updatedAt: string;
  savedCommune: string[];
  savedThreads: string[];
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
    saveThread: (state, action: PayloadAction<{ _id: string }>) => {
      state.user?.savedThreads.push(action.payload._id)
    },
    login: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    joinCommune: (state, action: PayloadAction<Commune>) => {
      state.user?.communes.push(action.payload)
    },

    //logic might be broken
    leaveCommune: (state, action: PayloadAction<string>) => {
      if (state.user) {
        const communeIds = state.user.communes.map((commune) => commune._id)
        const index = communeIds.indexOf(action.payload)
        state.user.communes.splice(index, 1)
      }
    }
  },
});

export const { login, logout, updateUser, joinCommune, leaveCommune, saveThread } = authSlice.actions;
export default authSlice.reducer;
