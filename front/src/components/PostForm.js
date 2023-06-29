import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../hooks/UseInput";
import postSlice from "../reducer/post";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

function PostForm(){
    const [text,onChangeText,setText]=useInput('');
    const [hashtag,onChangeHashTag,setHashTag]=useInput('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const me = useSelector((state)=>state.user).filter((v)=>v.on===true);
   
    const onSubmit=(e)=>{
        e.preventDefault();
         if(me.length===0){
             navigate("/sign_in");
           return alert("로그인이 필요합니다."); 
        }
        if(text !== ""&& hashtag!==""){
        dispatch(postSlice.actions.ADD_POST({
            id:"",
            user:me[0].id,
            postContents:text,
            hashtag,
            comments:[],
            liked:[]
        }))
        setText('');
        setHashTag('');
      return  alert("작성완료!")
    }
       return alert("입력하세요!!");
    }

    const onClick=()=>{
       
    }
    return(<>
    <h1>PostForm</h1>
        <Form.Control as="textarea" placeholder="What happen?" value={text} required onChange={onChangeText} onClick={onClick}/>
        <Form.Control as="input" placeholder="add hashtag" value={hashtag} required onChange={onChangeHashTag} onClick={onClick}/>
        <button onClick={onSubmit}>post</button>
    </>)
}
export default PostForm;