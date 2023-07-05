import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../hooks/UseInput";
import postSlice from "../reducer/post";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useCallback, useRef, useState } from "react";

function PostForm(){
    const [text,onChangeText,setText]=useInput('');
    const [hashtag,onChangeHashTag,setHashTag]=useInput('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const imageInput = useRef();
    const me = useSelector((state)=>state.user).filter((v)=>v.on===true);
    const [uploadImage,setUploadImage] = useState([]);

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
            liked:[],
            share:[],
            images:uploadImage ?? uploadImage[0],
        }))
        setText('');
        setHashTag('');
        setUploadImage([]);
      return  alert("작성완료!")
    }
       return alert("입력하세요!!");
    }

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
      }, [imageInput.current]);

    const handleImageUpload = () => {
        const selectedImage = imageInput.current.files[0];
    
        if (!selectedImage) return; 
    
        const reader = new FileReader();
    
        reader.onload = () => {
          const imageUrl = reader.result;
          setUploadImage(prevUploadImage => [...prevUploadImage, imageUrl]);
        };
    
        reader.readAsDataURL(selectedImage);
      };
    return(<>
    <h1>PostForm</h1>
        <Form.Control as="textarea" placeholder="What happen?" value={text} required onChange={onChangeText}/>
        <Form.Control as="input" placeholder="add hashtag" value={hashtag} required onChange={onChangeHashTag}/>
       <input type="file" multiple hidden ref={imageInput} onChange={handleImageUpload} accept="image/*"/> 
       {uploadImage.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Preview ${index}`}
          style={{ width: '200px', height: '200px' }}
        />
      ))}
        <button onClick={onClickImageUpload}>이미지 업로드</button>
        <button onClick={onSubmit}>post</button>
    </>)
}
export default PostForm;