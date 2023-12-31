const express = require('express');

const router = express.Router();
const {Post,Image,Comment,User} = require('../models');
const {isLoggedIn} = require('./middlewares');

router.post('/',isLoggedIn,async(req,res,next)=>{
  try{
    const post = await Post.create({
      content:req.body.postContents,
      UserId:req.user.id,
     });
     const fullPost = await Post.findOne({
        where:{id:post.id},
        include:[{
            model:Image,
        },{
            model:Comment,
            attributes: ['id', 'name'],
        },{
            model:User,
            attributes: ['id', 'name'],
        },{
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        }]
     })
     res.status(201).json(fullPost);
  }catch(error){
    console.error(error);
    next(error);
  }
});

router.post('/:postId/comment',isLoggedIn,async(req,res,next)=>{
    try{
     const post= await Post.findOne({
        where:{id:req.params.postId}
      })  
      if(!post){
        return res.status(403).send('존재하지 않는 게시글입니다.');
      }
      const comment = await Comment.create({
        content:req.body.postContents,
        PostId:req.params.postId,
        UserId:req.user.id,
       });
       res.status(201).json(comment);
    }catch(error){
      console.error(error);
      next(error);
    }
  });

router.delete('/',(req,res)=>{

});

module.exports = router;