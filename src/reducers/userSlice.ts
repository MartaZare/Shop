import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  currentUser: string;
}

const initialState: UserState = {
  currentUser: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
