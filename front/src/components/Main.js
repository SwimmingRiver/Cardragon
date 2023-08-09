import Routers from "../routers/routers";
import {Link} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import styled from "styled-components";
import {BoxArrowInRight} from 'react-bootstrap-icons'
import { useInput } from "../hooks/UseInput";
import {LogOutAPI, userSlice} from "../reducer/user";
import SearchForm from "./Search";

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

    width:60vw;
`;
const StyledLink = styled(Link)`
    font-family: 'Bebas Neue', sans-serif;
    color:#1565C0
    font-size:50px;
    text-decoration:none;
    &:hover{
        color:#1565C0
    }
`;

function Main(){
    const dispatch = useDispatch();
    const {me} = useSelector((state)=>state.user);
    const posts = useSelector((state)=>state.post);
    
    const LogOut=()=>{
        let index = me.map((v)=>v.on).indexOf(true);
        dispatch(userSlice.actions.USER_LOG_OUT(me[index]));
        dispatch(LogOutAPI())
    }

    return<>
    <Header>
    <StyledLink to="/"><h1 style={{"color":"#1565C0",fontSize:"35px"}}>Cardragon</h1></StyledLink>
    <SearchForm/>
    {me?<Link to="/profile">profile</Link>:<Link to="/sign_in"><BoxArrowInRight style={{color:"black",fontSize:"50px"}}/></Link>}
    {me?<button onClick={LogOut}>logout</button>:null}
    </Header>
    <h1>main</h1>
    <Wrapper>
    <Routers/>
    </Wrapper>
    </>
}
export default Main