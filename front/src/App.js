
import Main from "./components/Main";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useDispatch,useSelector } from "react-redux";
import userSlice from "./reducer/user";
import { useEffect, useState } from "react";
import axios from "axios";
import postSlice from "./reducer/post";

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-contents:center;
  align-items:center;

`;


function App() {
  const me = useSelector((state)=>state.user);
  const posts = useSelector((state)=>state.post);
  const dispatch = useDispatch();

  const dummyUrl = "https://jsonplaceholder.typicode.com/posts";
  const [dummyData,setDummyData]=useState([]);

  const LoadDummyData=async()=>{
    const res = await axios.get(dummyUrl);
    const arr = res.data;
    const dummyArr = arr.filter((v)=>v.userId===1)
    dummyArr.map((i)=>
    dispatch(postSlice.actions.ADD_POST({
      id:i.id+2,
        user:i.userId,
        postContents:i.title,
        hashtag:"Dummy",
        comments:[
        ],
        liked:[],
        share:[],
        images:[],
    }))
    )
  }
useEffect(()=>{
  LoadDummyData();
  
},[])

  useEffect(()=>{
    localStorage.setItem("userList",JSON.stringify(me));
    localStorage.setItem("postList",JSON.stringify(posts));
  },[])
  

    
  

  return (
    <Wrapper>
    <Main/>
    </Wrapper>
  );
}

export default App;