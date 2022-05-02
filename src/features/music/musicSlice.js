import { createSlice } from "@reduxjs/toolkit";

export const musicSlice = createSlice({
  name: "music",
  initialState: {
    isPlaying: false,
  },
  reducers: {
    togglePlaying: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { togglePlaying } = musicSlice.actions;

export default musicSlice.reducer;
