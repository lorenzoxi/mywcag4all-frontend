import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "wcag",
  initialState: {
    wcag_criteria_data: {},
  },
  reducers: {
    setWcagCriteria: (state, action) => {
      state.test_data = action.payload.data;
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
  setWcagCriteria,
  updateTestDataIsApplicable,
  updateTestDataIsPassed,
} = testSlice.actions;
export default testSlice.reducer;
