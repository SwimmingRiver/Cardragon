import {useInput} from '../hooks/UseInput';
import { Form } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import postSlice from '../reducer/post';
import { useNavigate } from 'react-router-dom';



function CommentForm(props){
    const [comment,onChangeComment,setComment]=useInput('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const nowLogin = useSelector((state)=>state.user).find(v=>v.on===true);
    const write=()=>{
       if(!nowLogin){
        navigate("/sign_in")
        return alert("로그인이 필요합니다");
       }
        dispatch(postSlice.actions.ADD_COMMENTS(
            {
                id:props.id,
                user:nowLogin.name,
                comments:comment
            }  
        ))
        setComment('');
    }
    return<>
        <div style={{border:'solid 1px black'}}>
        <h1>CommentForm/{props.user}/{props.contents}</h1>
        <Form.Control as="textarea" placeholder="write comment" required value={comment} onChange={onChangeComment}/>
        
        <div >     
        <button onClick={write}>write</button>
        </div>
        </div>

        </>
}
export default CommentForm;