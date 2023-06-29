import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../hooks/UseInput";
import userSlice from "../reducer/user";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";


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
    <h1>Sign_in</h1>
    <form onSubmit={onSubmit}>
    <input placeholder='id' value={id} onChange={setId}/>
    <input placeholder='pw' value={pw} onChange={setPw}/>
    <Button type="button" onClick={onSubmit}>sign in</Button>
    <Link to="/sign_up">sign_up</Link>
    </form>
    </>)
  }
  export default SignIn;