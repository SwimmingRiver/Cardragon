
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
    display:flex;
    justify-content:center;
    height:100vh;
    width:60vw;
`;

const ProfileCard = styled.div`
    border: solid 1px black;
    border-radius: 10px;
    width:30vw;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-contents:space-around;
    align-items:center;
  
`;
function Profile(){
    const {me} = useSelector((state)=>state.user)
    const posts = useSelector(state=>state.post);
    // const nowComments = posts.filter(post =>
    //     post.comments.some(comment => comment.user === nowLogin)
    //   );
    // const nowLikes = posts.filter(v => v.liked.includes(nowLogin));
    if(!me){
        return 'loading user data...';
    }
    return(
    <Wrapper>
    <ProfileCard>
    <div>
    <h1>{me.name}'s profile</h1>
    </div>
    <h2>{me.name}'s posts</h2>
    {/* {nowPosts? nowPosts.map((i)=><li>{i.postContents}</li>):"post your contents"} */}
    <div>
    <h2>{me.name}'s comments</h2>
    {/* {nowComments.map((i)=><li>{i.user}/{i.postContents}</li>)} */}
    </div>
    <div>
    <h2>{me.name}'s like</h2>
    {/* {nowLikes.map((i)=><li>{i.user}/{i.postContents}</li>)} */}
    </div>
    </ProfileCard>
    </Wrapper>
    )
}
export default Profile;