const express = require('express');
const cors = require('cors');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const app =  express();

db.sequelize.sync()
.then(()=>{
    console.log("연결 성공");
})
.catch(console.error);

app.use(cors({
    origin:'*',
    credentials:false,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


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