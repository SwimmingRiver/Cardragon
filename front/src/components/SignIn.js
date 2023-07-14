import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../hooks/UseInput";
import {userSlice} from "../reducer/user";
import { Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  border:solid 1px black;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center space-around;
  
  height:100vh;
  width:60vw;
`;

const SignIn=()=>{
    const [id,setId]=useInput("");
    const [pw,setPw]=useInput("");
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const UserList = useSelector((state)=>state.user);
    const onSubmit=(e)=>{
      e.preventDefault();
      if(!UserList.map((i)=>i.id).includes(id)){
        console.error("없는 회원입니다.")
        return alert("없는 회원입니다.");
      }
      if(UserList[UserList.map((i)=>i.id).indexOf(id)].pw !== pw){
        console.error("잘못된 암호입니다.");
        return alert("잘못된 암호입니다.");
      }
      dispatch(userSlice.actions.USER_SIGN_IN({
        id,
        pw
      }))
      navigate("/");
    }
    return(
    <>

    <form onSubmit={onSubmit}>
      <Wrapper>
      <h1>Sign In</h1>
      <div style={{paddingBottom: "10px"}}>
    <Form.Control as='input' placeholder='id' value={id} onChange={setId}/>
      </div>
      <div style={{paddingBottom: "10px"}}> 

    <Form.Control as='input' placeholder='pw' value={pw} onChange={setPw}/>
      </div>

    <Button type="button" onClick={onSubmit}>sign in</Button>
    <div style={{textAlign:"center"}}>
    <Link to="/sign_up">sign_up</Link>
    </div>
      </Wrapper>
    </form>
    </>)
  }
  export default SignIn;