const express = require('express');
const cors = require('cors');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const dotenv = require('dotenv');

const passportConfig = require('./passport');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

dotenv.config();
const app =  express();


db.sequelize.sync()
.then(()=>{
    console.log("연결 성공");
})
.catch(console.error);

passportConfig();

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized:false,
    resave:false,
    secret:process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
      },
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.send("hello express");
});

app.get('/',(req,res)=>{
    res.send("hello api");
})

app.get('/posts',(req,res)=>{
    res.json([
        {id:1,content:"hello express"},
        {id:2,content:"hello express2"},
        {id:3,content:"hello express3"},
    ]);
});

app.use('/post',postRouter);
app.use('/user',userRouter);

app.listen(3065,()=>{
    console.log("server working...");
});