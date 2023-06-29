import { useInput } from "../hooks/UseInput";
import { useDispatch } from "react-redux";
import userSlice from "../reducer/user";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

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
      navigate("/sign_in");
    }
    
    return<>
      <h1>Sign_up</h1>
      <form onSubmit={onSubmit}>
      <input placeholder='id' value={id} onChange={setId}/>
      <input placeholder='name' value={name} onChange={setName}/>
      <input placeholder='pw' value={pw} onChange={setPw}/>
      <input placeholder='pw repeat' value={rePw} onChange={setRePw}/>
      <Button onClick={onSubmit} >sign_up</Button>
      </form>  
    </>
    
  }
  export default SignUp;