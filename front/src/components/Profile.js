import { steps } from "framer-motion";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
`;
function Profile(){
    const nowLogin = useSelector((state)=>state.user).find(v=>v.on===true).name;
    const nowPosts = useSelector(state=>state.post).filter(v=>v.user===nowLogin);
    const posts = useSelector(state=>state.post);
    const nowComments = posts.filter(post =>
        post.comments.some(comment => comment.user === nowLogin)
      );
    const nowLikes = posts.filter(v => v.liked.includes(nowLogin));
    
    console.log(nowLikes)
    return<Wrapper>
    <div>
    <h1>{nowLogin}'s profile</h1>
    </div>
    <h2>{nowLogin}'s posts</h2>
    {nowPosts? nowPosts.map((i)=><li>{i.postContents}</li>):"post your contents"}
    <br/>
    <h2>{nowLogin}'s comments</h2>
    {nowComments.map((i)=><li>{i.user}/{i.postContents}</li>)}
    <h2>{nowLogin}'s like</h2>
    {nowLikes.map((i)=><li>{i.user}/{i.postContents}</li>)}
    </Wrapper>
}
export default Profile;