
import Main from "./components/Main";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useDispatch,useSelector } from "react-redux";
import  { LoadMyInfoAPI, LoadUserListAPI } from "./reducer/user";
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
  const {me} = useSelector((state)=>state.user);
  const posts = useSelector((state)=>state.post);
  const dispatch = useDispatch();

 
  useEffect(()=>{
    dispatch(LoadUserListAPI());
    localStorage.setItem("postList",JSON.stringify(posts));
  },[])
  
  useEffect(()=>{
    dispatch(LoadMyInfoAPI());
  },[]);

  

  return (
    <Wrapper>
    <Main/>
    </Wrapper>
  );
}

export default App;
