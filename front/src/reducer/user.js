import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
];

export const SignUpAPI = createAsyncThunk(
    'userSlice/post',
    async (data)=>{
        const res = await axios.post('http://localhost:3065/user',data,{
            withCredentials:true,
        });
        return res.body;
    }
);

export const SignInAPI = createAsyncThunk(
    'userSlice/signIn',
    async (data)=>{
        const res = await axios.post('http://localhost:3065/user/signin',data,{
            withCredentials:true,
        });
        return res.body;
    }
);

export const LogOutAPI = createAsyncThunk(
    'userSlice/logOut',
    async (data)=>{
        const res = await axios.post('http://localhost:3065/user/logout',{
            withCredentials:true,
        });
        return res;
    }
);

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        USER_SIGN_UP:(state,action)=>{
            state.push(action.payload);
            localStorage.setItem("userList",JSON.stringify(state))
        },
        USER_SIGN_IN:(state,action)=>{
           let index = state.map((i)=>i.id).indexOf(action.payload.id);
           state[index].on =true;
           const getUserList = JSON.parse(localStorage.getItem('userList'));
           const updatedUserList = getUserList.map((user,num) => {
            if (num === index) {
              return { ...user, on: true }; // on 값을 true로 변경 (원하는 값으로 변경 가능)
            } else {
              return user; // 변경할 필요가 없는 경우 기존 객체 그대로 반환
            }
          });
          localStorage.setItem('userList',JSON.stringify(updatedUserList))
        }, 
        USER_LOG_OUT: (state, action) => {
            const index = state.map((v) => v.id).indexOf(action.payload.id);
            state[index].on = false;
          },
    },
    extraReducers:(builder)=>{
        builder.addCase(SignUpAPI.fulfilled,(state,action)=>{

            alert("Complete Sign up API");
        })
        builder.addCase(SignInAPI.fulfilled,(state,action)=>{

            alert("Complete Sign in API");
        })
        builder.addCase(LogOutAPI.fulfilled,(state,action)=>{
            alert('Complete Log out API');
        })
    },
})

