const express = require('express');
const bcrpyt = require('bcrypt');
const {User, Post}=require('../models')
const passport = require('passport');

const router = express.Router();

router.get('/',async(req,res,next)=>{
   try{
    if(req.user){
        const fullUserWithoutPassword = await User.findOne({
            where:{id:req.user.id},
            attributes:{
                exclude:['pw']
            },
        });
        res.status(200).json(fullUserWithoutPassword);
    }else{
        res.status(200).json(null);
    }
    
    }catch(error){
        console.error(error);
        next(error);
    }
})

const {isLoggedIn,isNotLoggedIn} = require('./middlewares');

router.post('/signin',isNotLoggedIn,(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            console.error(err);
           return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user,async(signinErr)=>{
            if(signinErr){
                console.error(signinErr);
                return next(signinErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where:{id:user.id},
                attributes:{
                    exclude:['pw']
                },
            })
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req,res,next);
});//POST/user/signin

router.post('/',isNotLoggedIn,async (req,res,next)=>{ //POST/user
    try{
        const exUser = await User.findOne({
            where:{
                user_id:req.body.user_id,
            }
        })
        if(exUser){
           return res.status(403).send("사용중인 아이디 입니다");
        }
    const hashPw = await bcrpyt.hash(req.body.pw,12);
    await User.create({
        user_id:req.body.user_id,
        pw:hashPw,
        name:req.body.name,
    });
    // res.setHeader('Access-Control-Allow-Oirgin','http://localhost:3000')  3000포트만 허용
    res.status(201).send('ok');

}catch(error){
    console.error(error);
    next(error);
    }
});

router.post('/logout',isLoggedIn,(req,res)=>{
    req.logout(() => {
        res.redirect('/');
        });
    req.session.destroy();
    res.send('ok');
})

module.exports = router;