const passport = require('passport');
const {Strategy}=require('passport-local');
const {User}=require('../models');
const bcrpyt = require('bcrypt');
module.exports=()=>{
    passport.use(new Strategy({
        usernameField:'id',
        passwordField:'pw',
    },async (id,password,done)=>{
     try{
        const user = await User.findOne({
            where:{user_id:id}
        });
        if(!user){
          return done(null,false,{reason:'존재하지 않는 사용자입니다.'});
        }
        const result = await bcrpyt.compare(password,user.pw);
        if(result){
            return done(null,user);
        }
        return done(null,false,{reason:"잘못된 암호입니다."})
     }catch(error){
        console.error(error);
        return done(error);
     }
        
    }));
}