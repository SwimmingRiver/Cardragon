import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducer/user";
import postSlice from "../reducer/post";
import SearchSlice from "../reducer/search";

const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        post:postSlice.reducer,
        search:SearchSlice.reducer,
    }
})
export default store;