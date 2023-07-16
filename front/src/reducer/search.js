import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:"",
};

const SearchSlice=createSlice({
    name:"Search",
    initialState,
    reducers:{
        input:(state,action)=>{
            state.value = action.payload;
        },
        reset:(state)=>{
            state.value='';
        }
    }
})

export default SearchSlice;