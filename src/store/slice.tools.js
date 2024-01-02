import { createSlice } from "@reduxjs/toolkit";

export const toolsSlice = createSlice({
  name: "tools",
  initialState: {
    filter_word: "",
    filter_type: null,
    filter_license: null,

    filter_page: 1,

    tools_data: {},
    tools_data_filtered: {},

    tools_data_type: {},
    tools_data_licenses: {},
  },
  reducers: {
    setToolsData: (state, action) => {
      state.tools_data = action.payload.data;
      state.tools_data_filtered = action.payload.data;
    },
    setToolsDataTypes: (state, action) => {
      const objects = action.payload.data;
      const types = objects.map((object, index) => {
        return object["types"];
      });

      const types_array = types.flat();
      const unique_types_array = [...new Set(types_array)].sort();
      state.tools_data_type = unique_types_array;
    },
    setToolsDataLicense: (state, action) => {
      state.tools_data_licenses = action.payload.data;
    },
    updateToolFilterWord: (state, action) => {
      state.filter_word = action.payload.value;
    },
    updateToolFilterType: (state, action) => {
      state.filter_type = action.payload.value;
    },
    updateToolFilterLicense: (state, action) => {
      state.filter_license = action.payload.value;
    },
    filterTestData: (state) => {
      state.tools_data_filtered = {};
      state.tools_data_filtered = state.tools_data.filter(
        (tool) =>
          (state.filter_word === undefined || state.filter_word === ""
            ? true
            : tool.name
                .toLowerCase()
                .includes(state.filter_word.toLowerCase())) &&
          (state.filter_type === undefined ||
          state.filter_type === null ||
          state.filter_type === ""
            ? true
            : tool.types.includes(state.filter_type))
      );
    },
    resetToolFilter: (state) => {
      state.filter_word = "";
      state.filter_type = null;
      state.filter_license = null;
      state.filter_page = 1;
      state.tools_data_filtered = state.tools_data;
    },
    updateToolsFilterPage: (state, action) => {
      state.filter_page = action.payload.index;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  updateToolFilterWord,
  updateToolFilterType,
  updateToolFilterLicense,
  updateToolFilterPage,
  resetToolFilter,
  setToolsData,
  filterTestData,
  setToolsDataTypes,
  setToolsDataLicense,
  updateToolsFilterPage,
} = toolsSlice.actions;
export default toolsSlice.reducer;
