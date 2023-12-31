import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import appleIcon from "../Images/apple-icon.png";
import axios from "axios";


const initialState=[
    {
        id:1,
        user:"master",//서버 만들면 사용자 개인번호 넣을지 고려해볼것
        postContents:"Hello World!!",
        hashtag:"SayHi",
        comments:[
            {user:"1",contents:"hihi"},
            {user:"unknown",contents:"dodo"},
        ],
        liked:[],
        share:[],
        images:[appleIcon],
    },  {
        id:2,
        user:"master",
        postContents:"안녕",
        hashtag:"SayHi",
        comments:[],
        liked:[],
        share:[],
        images:[],
    },

];

export const PostAPI = createAsyncThunk(
    'postSlice/post',
    async (data)=>{
        const res = await axios.post('http://localhost:3065/post',data,{
            withCredentials:true,
        });
        return res.data;
    }
);
export const CommentAPI = createAsyncThunk(
    'postSlice/comment',
    async (data)=>{
        const res = await axios.post(`http://localhost:3065/post/${data.postId}/comment`,data,{
            withCredentials:true,
        });
        return res;
   }
)
const postSlice =createSlice({
    name:"post",
    initialState,
    reducers:{
        LOAD_POST:(state,action)=>{
            state.push(action.payload);
        },
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
            localStorage.setItem('postList',JSON.stringify(state));
        },
        ADD_SHARE:(state,action)=>{
            const index = state.map((v) => v.id).indexOf(action.payload.id);
            const exPosts = JSON.parse(localStorage.getItem("postList"));
            exPosts[index].share.push(action.payload.user);
            state[index].share.push(action.payload.user);
            localStorage.setItem('postList',JSON.stringify(exPosts));
        },
        CANCEL_SHARE:(state,action)=>{
            const index = state.map((v) => v.id).indexOf(action.payload.id);
            const exPosts = JSON.parse(localStorage.getItem("postList"));
            exPosts[index].share.splice(exPosts[index].liked.indexOf(action.payload.user),1);
            state[index].share.splice(state[index].liked.indexOf(action.payload.name),1);
            localStorage.setItem('postList',JSON.stringify(state));
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(PostAPI.fulfilled,(state,action)=>{
            alert("Complete Post API");
        })
        builder.addCase(CommentAPI.fulfilled,(state,action)=>{
            alert("Complete Comment API");
        })
    }
})
export default postSlice;