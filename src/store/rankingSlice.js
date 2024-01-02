import { createSlice } from "@reduxjs/toolkit";

export const rankingSlice = createSlice({
  name: "ranking",
  initialState: {
    website: {},
    page_ranking: 1,
  },
  reducers: {
    updatePage: (state, action) => {
      state.page_ranking = action.payload.index;
    },
  },
});
// Action creators are generated for each case reducer function
export const { updatePage } = rankingSlice.actions;
export default rankingSlice.reducer;
