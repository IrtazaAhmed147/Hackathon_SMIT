import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  familyMembers: [],
  familyMember: {},
  familyLoading: false,
  familyError: null,
};

const familyMemberSlice = createSlice({
  name: "familyMember",
  initialState,
  reducers: {
    familyFetchStart: (state) => {
      state.familyLoading = true;
      state.familyError = null;
    },
    familyFetchSuccess: (state, { payload }) => {
      state.familyLoading = false;
      state.familyError = null;
      state.familyMembers = payload;
    },
    memberFetchSuccess: (state, { payload }) => {
      state.familyLoading = false;
      state.familyError = null;
      state.familyMember = payload;
    },
    familyFetchFailure: (state, action) => {
      state.familyLoading = false;
      state.familyError = action.payload;
    },
    familySuccess: (state) => {
      state.familyLoading = false;
      state.familyError = null;
    },
    resetFamilyMembers: (state) => {
            state.familyMembers = [];
            state.familyMember = {};
            state.familyLoading = false;
            state.familyError = null;
        },
  },
});

export const {
  familyFetchStart,
  familyFetchSuccess,
  familyFetchFailure,
  familySuccess,
  memberFetchSuccess,
  resetFamilyMembers
} = familyMemberSlice.actions;

export default familyMemberSlice.reducer;
