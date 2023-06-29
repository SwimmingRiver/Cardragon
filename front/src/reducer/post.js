import { createSlice } from "@reduxjs/toolkit";

const initialState=[
    {
        id:1,
        user:"master",//서버 만들면 사용자 개인번호 넣을지 고려해볼것
        postContents:"Hello World!!",
        hashtage:"",
        comments:[
            {user:"1",contents:"hihi"},
            {user:"unknown",contents:"dodo"},
        ],
        liked:[],
    },  {
        id:2,
        user:"master",
        postContents:"안녕",
        hashtage:"",
        comments:[],
        liked:[]
    }
];

const postSlice =createSlice({
    name:"post",
    initialState,
    reducers:{
        ADD_POST:(state,action)=>{
            state.push(action.payload);
            localStorage.setItem("postList",JSON.stringify(state))
        },
        ADD_COMMENTS:(state,action)=>{
            const index = state.map((v) => v.id).indexOf(action.payload.id);
            state[index].comments.push({user:action.payload.user,contents:action.payload.comments})
        },
        ADD_LIKE:(state,action)=>{
            const index = state.map((v) => v.id).indexOf(action.payload.id);
            const exPosts = JSON.parse(localStorage.getItem("postList"));
            exPosts[index].liked.push(action.payload.user);
            state[index].liked.push(action.payload.user);
            localStorage.setItem('postList',JSON.stringify(exPosts));
        },
        CANCEL_LIKE:(state,action)=>{
            const index = state.map((v) => v.id).indexOf(action.payload.id);
            const exPosts = JSON.parse(localStorage.getItem("postList"));
            exPosts[index].liked.splice(exPosts[index].liked.indexOf(action.payload.user),1);
            state[index].liked.splice(state[index].liked.indexOf(action.payload.name),1);
        }
    }
})
export default postSlice;