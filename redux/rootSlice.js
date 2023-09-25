import { createSlice } from "@reduxjs/toolkit";
import {
  signin,
  signup,
  signout,
  updateuser,
  getposts,
  addcomment,
  createpost,
} from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  user: null,
  posts: null,
  error: null,
  isLoading: false,
  isLoggined: false,
};

const rootSlice = createSlice({
  name: "main",
  initialState,

  extraReducers: (builder) => {
    builder

      .addCase(signin.pending, handlePending)
      .addCase(signin.rejected, handleRejected)
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateuser.pending, handlePending)
      .addCase(updateuser.rejected, handleRejected)
      .addCase(updateuser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signup.pending, handlePending)
      .addCase(signup.rejected, handleRejected)
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signout.pending, handlePending)
      .addCase(signout.rejected, handleRejected)
      .addCase(signout.fulfilled, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getposts.pending, handlePending)
      .addCase(getposts.rejected, handleRejected)
      .addCase(getposts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addcomment.pending, handlePending)
      .addCase(addcomment.rejected, handleRejected)
      .addCase(addcomment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createpost.pending, handlePending)
      .addCase(createpost.rejected, handleRejected)
      .addCase(createpost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const rootReducer = rootSlice.reducer;
