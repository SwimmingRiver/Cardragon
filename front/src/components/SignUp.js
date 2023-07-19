import { useInput } from "../hooks/UseInput";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userSlice,SignUpAPI } from "../reducer/user";

const Wrapper =styled.div`
  border:solid 1px black;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center space-around;
  
  height:100vh;
  width:60vw;
`;
const SignUp=()=>{
    const [id,setId]=useInput("");
    const [pw,setPw]=useInput("");
    const [name,setName]=useInput("");
    const [rePw,setRePw]=useInput("");
    
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const onSubmit=(e)=>{
      e.preventDefault();
      dispatch(userSlice.actions.USER_SIGN_UP({
        id,
        pw,
        name,
        on:false,
      }))
      dispatch(SignUpAPI({
        id,
        pw,
        name,
        on:false,
      }));
      navigate("/sign_in");
    }
    
    return<>
      <form onSubmit={onSubmit}>
        <Wrapper>
      <h1>Sign_up</h1>
      <div style={{paddingBottom:"10px"}}>
      <Form.Control as="input" placeholder='id' value={id} onChange={setId}/>
      </div>
      <div style={{paddingBottom:"10px"}}>

      <Form.Control as="input" placeholder='name' value={name} onChange={setName}/>
      </div>
      <div style={{paddingBottom:"10px"}}>

      <Form.Control as="input" placeholder='pw' value={pw} onChange={setPw}/>
      </div>
      <div style={{paddingBottom:"10px"}}>

      <Form.Control as="input" placeholder='pw repeat' value={rePw} onChange={setRePw}/>
      </div>
      <Button onClick={onSubmit} >sign_up</Button>
        </Wrapper>
      </form>  
    </>
    
  }
  export default SignUp;