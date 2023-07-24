exports.isLoggedIn = (res,req,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(401).send('로그인이 필요합니다.');
    }
};

exports.isNotLoggedIn=(res,req,next)=>{
    if(!req.isAuthenticated()){
        next();
    }else{
        res.status(401).send('로그인하지않은 사용자만 접근이 가능합니다.');
    }
}