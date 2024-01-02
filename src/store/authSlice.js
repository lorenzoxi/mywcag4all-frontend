import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({

  name: 'auth',
  initialState: {
    user: { name: ""}
  },
  reducers: {
    addUser: (state,action) => {
      state.user = action.payload
    },
    removeUser: (state) => {
      state.user = {name: ""};
    },
  }
})
// Action creators are generated for each case reducer function
export const { addUser, removeUser } = authSlice.actions

export default authSlice.reducer