import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    updateUser: (state,action)=>{
      state.user = {...state.user,...action.payload}
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("user doesnt exist");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, { payload: { post: newPost } }) => {
      state.posts = state.posts.map((post) =>
        post._id === newPost._id ? newPost : post
      );
    },
    deletePost:(state,{payload:{id}})=>{
      state.posts = state.posts.filter(post=>post._id!==id)
    }
  },
});

export const { setFriends, setLogin, setLogout, setMode, setPost, setPosts ,deletePost,updateUser} =
  authSlice.actions;
export default authSlice.reducer;
