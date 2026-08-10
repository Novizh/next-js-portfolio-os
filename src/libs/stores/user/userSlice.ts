import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserProfile, UserState } from "libs/interfaces/user";

const initialState: UserState = {
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    clearUser: (state) => {
      state.profile = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
