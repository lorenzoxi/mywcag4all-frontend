import { createSlice } from "@reduxjs/toolkit";

export const websiteSlice = createSlice({
  name: "website",
  initialState: {
    website: {},
    data_websites: {},
    page_website: 1,
  },
  reducers: {
    setWebsitesData: (state, action) => {
      state.data_websites = action.payload.data;
    },
    addWebsite: (state, action) => {
      state.website = action.payload;
    },
    removeWebsite: (state) => {
      state.website = {};
    },
    updatePage: (state, action) => {
      state.page_website = action.payload.index;
    },
  },
});
// Action creators are generated for each case reducer function
export const { addWebsite, removeWebsite, updatePage, setWebsitesData } = websiteSlice.actions;
export default websiteSlice.reducer;
