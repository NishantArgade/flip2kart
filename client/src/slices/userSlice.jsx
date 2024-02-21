import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: {},
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload
    },
    getUserData: (state) => {
      return state.data
    },
    resetUserData: (state) => {
      state.data = {}
    },
  },
})

export const { setUserData, getUserData, resetUserData } = userSlice.actions

export default userSlice.reducer
