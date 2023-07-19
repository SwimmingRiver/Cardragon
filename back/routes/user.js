const express = require('express');
const bcrpyt = require('bcrypt');
const {User}=require('../models')
const passport = require('passport');

const router = express.Router();

router.post('/signin',(req,res,next)=>{
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
            return res.status(200).json(user);
        });
    })(req,res,next);
});//POST/user/signin

router.post('/',async (req,res,next)=>{ //POST/user
    try{
        const exUser = await User.findOne({
            where:{
                user_id:req.body.id,
            }
        })
        if(exUser){
           return res.status(403).send("사용중인 아이디 입니다");
        }
    const hashPw = await bcrpyt.hash(req.body.pw,12);
    await User.create({
        user_id:req.body.id,
        pw:hashPw,
        name:req.body.name,
        on:req.body.on
    });
    // res.setHeader('Access-Control-Allow-Oirgin','http://localhost:3000')  3000포트만 허용
    res.status(201).send('ok');

}catch(error){
    console.error(error);
    next(error);
    }
});

module.exports = router;