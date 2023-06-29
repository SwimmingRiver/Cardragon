import Routers from "../routers/routers";
import {Link} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import styled from "styled-components";
import { Search } from "react-bootstrap-icons";
import { useInput } from "../hooks/UseInput";
import userSlice from "../reducer/user";

const Wrapper = styled.div`

    display:flex;
    justify-contents:center;
    align-items:center;
    height:100vh;
    width:60vw;
    background-color:#F8F9F9 ;
`;
const Header = styled.div`
    display:flex;
    justify-content:space-between;
    border:solid 1px black;
    width:60vw;
`;

function Main(){
    const dispatch = useDispatch();
    const me = useSelector((state)=>state.user);
    const posts = useSelector((state)=>state.post);
    const nowLogin = useSelector((state)=>state.user).find(v=>v.on===true);
    const LogOut=()=>{
        console.log(nowLogin)
        let index = me.map((v)=>v.on).indexOf(true);
        dispatch(userSlice.actions.USER_LOG_OUT(me[index]));
    }
    const {keyWord,setKeyWord} = useInput('');
    return<>
    <Header>
    <Link to="/">Title</Link>
    <div>
    <input placeholder="search" onChange={setKeyWord}/><Search cursor="pointer"/>
    </div>
    {nowLogin?<Link to="/profile">profile</Link>:<Link to="/sign_in">sign_in</Link>}
    {nowLogin?<button onClick={LogOut}>logout</button>:null}
    </Header>
    <h1>main</h1>
    <Wrapper>
    <Routers/>
    </Wrapper>
    </>
}
export default Main