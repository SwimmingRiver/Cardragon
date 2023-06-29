import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Main from "./components/Main";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import userSlice from "./reducer/user";
import { useEffect } from "react";

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-contents:center;
  align-items:center;

`;

function App() {
  const me = useSelector((state)=>state.user);
  const posts = useSelector((state)=>state.post);
  useEffect(()=>{
    localStorage.setItem("userList",JSON.stringify(me));
    localStorage.setItem("postList",JSON.stringify(posts));
  },[])
  
    
  const dispatch = useDispatch();


  return (
    <Wrapper>
    <Main/>
    </Wrapper>
  );
}

export default App;
