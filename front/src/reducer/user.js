import { createSlice } from "@reduxjs/toolkit";

const initialState=[
    {
        id:"master",
        name:"master",
        pw:"1",
        on:false,
    },
    {
        id:"1",
        name:"1",
        pw:"1",
        on:false,
    }
]

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        USER_SIGN_UP:(state,action)=>{
            state.push(action.payload);
            localStorage.setItem("userList",JSON.stringify(state))
        },
        USER_SIGN_IN:(state,action)=>{
           let index = state.map((i)=>i.id).indexOf(action.payload.id);
           state[index].on =true
        }, 
        USER_LOG_OUT: (state, action) => {
            const index = state.map((v) => v.id).indexOf(action.payload.id);
            state[index].on = false;
          },
    }
})

export default userSlice;