import { useSelector } from "react-redux";
import PostCard from "./PostCard";
import styled from "styled-components";
import { Button, Carousel } from "react-bootstrap";
import { useRef, useState } from "react";

const CarouselWrapper = styled.div`

    width: 30vw;
    height: 60vh;
`;
const StyledCarousel = styled(Carousel)`
  
.carousel-indicators{
  display:none;
  
}
  .carousel-inner {
    .carousel-item {
      transition: transform 0.6s ease-in-out;
    }
  }
  .carousel-control-next-icon,
  .carousel-control-prev-icon,
  .carousel-control-next,
  .carousel-control-prev{
    height:60vh;
    width:2vw;
    opacity:0;
    &:hover{
      transition:  0.5s ease-in-out;
      background-color:grey;
      opacity:1;
      border-radius:10px;
    }
  }   
`;
const NoRes =()=>{
  return<h1>no result</h1>
}

 

function PostList(){
   const UserName=useSelector((state)=>state.user);
   const Contents = useSelector((state)=>state.post);
   const searchedKeyword = useSelector((state)=>state.search.value);

  const carouselRef = useRef(null);
   return(
   <CarouselWrapper>
    PostList
    <StyledCarousel ref={carouselRef} interval={null}>
      {Contents.map((i)=>
      searchedKeyword!==""?(i.hashtag.toLowerCase() === searchedKeyword.toLowerCase()?
       (<Carousel.Item key={i.id}>
        <PostCard 
          user={i.user} 
          id={i.id} 
          contents={i.postContents} 
          hashtag={i.hashtag} 
          comments={i.comments} 
          like={i.liked}
          share={i.share}
          image={i.images}
          />
        </Carousel.Item>):null
      ):<Carousel.Item key={i.id}>
        <PostCard 
          user={i.user} 
          id={i.id} 
          contents={i.postContents} 
          hashtag={i.hashtag} 
          comments={i.comments} 
          like={i.liked}
          share={i.share}
          image={i.images}
          />
          </Carousel.Item>
        )}
    </StyledCarousel>
    </CarouselWrapper>
    )
}
export default PostList;
