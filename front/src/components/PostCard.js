import { Button, ButtonGroup } from "react-bootstrap";
import styled from "styled-components";
import { ArrowRepeat, ChatDots, Star, StarFill } from "react-bootstrap-icons";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { useDispatch, useSelector } from "react-redux";
import postSlice from "../reducer/post";
import { useNavigate } from "react-router-dom";
import ZoomImage from "./ZoomImage";

const Wrapper = styled.div`
    border: solid 1px black;
    border-radius: 10px;
    width:30vw;
    height:60vh;
    display:flex;
    justify-contents:space-around;
    align-items:center;
  
`;
const Content = styled.div`
border: solid 1px black;
    border-radius: 10px;
    width:30vw;
    height:60vh;
    `;
const Head = styled.div`
    font-size:20px;
    margin: 10px 0 -5px 15px;
    display:flex;
    justify-content:center;
`;
const Text = styled.div`
font-size:20px;
display:flex;
    justify-content:center;
`;
const ButtonWrapper=styled.div`
    display:flex;
    justify-contents:space-between;
    border:solid 1px black; 
`;
const ButtonItem=styled.div`
    border:solid 1px black;
    font-size:30px;
    width:10vw;
    text-align:center;
    transition: border-width 0.3s, border-color 0.3s;
    @keyframes border-animation {
        0% {
          border-width: 1.2px; /* 시작 지점의 테두리 두께 */
          border-color: transparent transparent transparent transparent; /* 시작 지점의 테두리 색상 */
        }
        20% {
          border-width: 1.2px; /* 오른쪽으로 두꺼워지는 지점의 테두리 두께 */
          border-color: black transparent transparent transparent; /* 오른쪽으로 두꺼워지는 지점의 테두리 색상 */
        }
        40% {
          border-width: 1.2px; /* 아래로 두꺼워지는 지점의 테두리 두께 */
          border-color: black black transparent transparent; /* 아래로 두꺼워지는 지점의 테두리 색상 */
        }
        60% {
          border-width: 1.2px; /* 왼쪽으로 두꺼워지는 지점의 테두리 두께 */
          border-color: black black black transparent; /* 왼쪽으로 두꺼워지는 지점의 테두리 색상 */
        }
        80% {
            border-width: 1.2px; /* 종료 지점의 테두리 두께 */
            border-color: transparent transparent transparent black; /* 종료 지점의 테두리 색상 */
          }
        100% {
          border-width: 1.2px; /* 종료 지점의 테두리 두께 */
          border-color: transparent transparent transparent transparent; /* 종료 지점의 테두리 색상 */
        }
      }
    &:hover{
        animation: border-animation 0.8s linear forwards; 
    }
    
`;
const StyledImg = styled.img`
    width:100px;
    height:100px;
    
`;
const ImgWrapper = styled.div`
    width:10vw;
    height:10vh;
    border: solid 1px black;
`;



function PostCard(props){
    const [like,setLike] = useState(false);
    const [commentLoad,setCommendLoad] = useState(false);
    const [shareToggle,setShareToggle]=useState(false);
    const nowLogin = useSelector((state)=>state.user).find(v=>v.on===true);
    const [zoomToggle,setZoomToggle]=useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const LikeHandler =()=>{
        if(!nowLogin){return alert("로그인이 필요합니다")}
        
        if(!props.like.includes(nowLogin.name)){
            setLike(true);
            
            dispatch(postSlice.actions.ADD_LIKE({
                id:props.id,
                user:nowLogin.name
            }))
            
        }
        if(props.like.includes(nowLogin.name)){
            setLike(false);
            dispatch(postSlice.actions.CANCEL_LIKE({
                id:props.id,
                user:nowLogin.name
            }))
        }
    }
    
    const ShareHandler=()=>{
        if(!nowLogin){return alert("로그인이 필요합니다")}

        if(!props.share.includes(nowLogin.name)){
            setShareToggle(true);
            
            dispatch(postSlice.actions.ADD_SHARE({
                id:props.id,
                user:nowLogin.name
            }))
            
        }
        if(props.share.includes(nowLogin.name)){
            setShareToggle(false);
            dispatch(postSlice.actions.CANCEL_SHARE({
                id:props.id,
                user:nowLogin.name
            }))
        }
    }
    const ZoomHandler=()=>{
        setZoomToggle((prev)=>!prev)
    }
    return(
        <>
        <Wrapper>
            {zoomToggle?<ZoomImage onClick={ZoomHandler} image={props.image}/>:(
            <Content>
            <Head>
        <h1>{props.user}</h1>
            </Head>
            <hr/>
            {props.image.length>0?<StyledImg src={props.image} onClick={ZoomHandler} />:null}
            
            <Text>
        <p>{props.contents}</p>
            </Text>
            <hr/>
            <Text>
            <p>    
            #{props.hashtag}
            </p>
            </Text>
        <ButtonWrapper>
            <ButtonItem onClick={LikeHandler}>
                {props.like.includes(nowLogin?.name)?<StarFill style={{color:"#f85710"}}/>:<Star style={{color:"#f85710"}}/>}
                <div>{props.like.length}</div>
            </ButtonItem>
            <ButtonItem onClick={()=>{setCommendLoad((prev)=>!prev)}}>
                <ChatDots style={{color:"green"}} />
                <div>{props.comments.length}</div>
            </ButtonItem>
            <ButtonItem onClick={ShareHandler}>
                <ArrowRepeat style={{color:"skyblue"}}/>
                <div>{props.share.length}</div>
            </ButtonItem>
        </ButtonWrapper>
        {commentLoad?<CommentForm id={props.id} user={props.user} contents={props.contents}/>:null}
        {props.comments.map((i,index)=><li key={index}>{i.user}/{i.contents}</li>)}
        
            </Content>)}
        </Wrapper>
    </>)
}
export default PostCard;