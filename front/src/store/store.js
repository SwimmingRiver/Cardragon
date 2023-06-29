import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducer/user";
import postSlice from "../reducer/post";

const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        post:postSlice.reducer,
    }
})
export default store;