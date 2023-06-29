import PostForm from "./PostForm";
import styled from "styled-components";
import PostList from "./PostList";
import Search from "./Search";

const Wrapper = styled.div`
    border: solid 1px green;
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-contents:center;
`;

function Home(){
    return<>
    <Wrapper>
    Home
    <PostForm/>
    <PostList/>
    </Wrapper>
    </>
}
export default Home;