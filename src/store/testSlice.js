import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "test",
  initialState: {
    filter_word: "",
    filter_isApplicable: null,
    filter_isPassed: null,
    filter_tag: null,
    filter_parent_tag: null,
    filter_level: null,
    filter_type: null,

    filter_page: 1,

    test_data: {},
    test_data_filtered: {},
  },
  reducers: {
    updateTestFilterWord: (state, action) => {
      state.filter_word = action.payload.word;
    },
    updateTestFilterIsApplicable: (state, action) => {
      state.filter_isApplicable = action.payload.value;
    },
    updateTestFilterIsPassed: (state, action) => {
      state.filter_isPassed = action.payload.value;
    },
    updateTestFilterLevel: (state, action) => {
      state.filter_level = action.payload.value;
    },
    updateTestFilterType: (state, action) => {
      state.filter_type = action.payload.value;
    },
    updateTestFilterTag: (state, action) => {
      state.filter_tag = action.payload.tag;
    },
    updateTestParentFilterTag: (state, action) => {
      state.filter_parent_tag = action.payload.tag;
    },
    resetTestFilter: (state) => {
      state.filter_word = "";
      state.filter_isApplicable = null;
      state.filter_isPassed = null;
      state.filter_parent_tag = null;
      state.filter_tag = null;
      state.filter_level = null;
      state.filter_type = null;
      state.filter_page = 1;
      state.test_data_filtered = {};
      state.test_data_filtered = state.test_data;
    },
    updateTestFilterPage: (state, action) => {
      state.filter_page = action.payload.index;
    },

    setTestData: (state, action) => {
      state.test_data = action.payload.data;
      state.test_data_filtered = action.payload.data;
    },

    filterTestData: (state) => {
      state.test_data_filtered = {};
      state.test_data_filtered = state.test_data.filter(
        (test) =>
          (state.filter_word === undefined || state.filter_word === ""
            ? true
            : test.name
                .toLowerCase()
                .includes(state.filter_word.toLowerCase())) &&
          (state.filter_isApplicable === undefined ||
          state.filter_isApplicable === null
            ? true
            : test.is_applicable === state.filter_isApplicable) &&
          (state.filter_isPassed === undefined || state.filter_isPassed === null
            ? true
            : test.is_passed === state.filter_isPassed) &&
          (state.filter_level === undefined || state.filter_level === null
            ? true
            : test.id_level == state.filter_level) &&
          (state.filter_type === undefined || state.filter_type === null
            ? true
            : test.type == state.filter_type) &&
          (state.filter_parent_tag === undefined ||
          state.filter_parent_tag === null
            ? true
            : test.parent_tag.includes(Number(state.filter_parent_tag))) &&
          (state.filter_tag === undefined || state.filter_tag == null
            ? true
            : test.tag.includes(Number(state.filter_tag)))
      );
    },
    updateTestDataIsApplicable: (state, action) => {
      const id = action.payload.id;
      const value = action.payload.value;
      let found = false;
      if (value !== undefined) {
        for (let i = 0; i < state.test_data.length && !found; i++) {
          if (state.test_data[i].id === id) {
            state.test_data[i].is_applicable = value;
            found = true;
          }
        }
        found = false;
        for (let i = 0; i < state.test_data_filtered.length && !found; i++) {
          if (state.test_data_filtered[i].id === id) {
            state.test_data_filtered[i].is_applicable = value;
            found = true;
          }
        }
      }
    },
    updateTestDataIsPassed: (state, action) => {
      const id = action.payload.id;
      const value = action.payload.value;
      let found = false;
      if (value !== undefined) {
        for (let i = 0; i < state.test_data.length && !found; i++) {
          if (state.test_data[i].id === id) {
            state.test_data[i].is_passed = value;
            found = true;
          }
        }
        found = false;
        for (let i = 0; i < state.test_data_filtered.length && !found; i++) {
          if (state.test_data_filtered[i].id === id) {
            state.test_data_filtered[i].is_passed = value;
            found = true;
          }
        }
      }
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  updateTestFilterWord,
  updateTestFilterIsApplicable,
  updateTestFilterIsPassed,
  updateTestFilterLevel,
  updateTestFilterTag,
  updateTestParentFilterTag,
  updateTestFilterType,
  updateTestFilterPage,
  resetTestFilter,
  setTestData,
  filterTestData,
  updateTestDataIsApplicable,
  updateTestDataIsPassed,
} = testSlice.actions;
export default testSlice.reducer;
