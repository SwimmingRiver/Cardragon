module.exports = (sequelize,DataTypes)=>{
    const Post = sequelize.define('Post',{
        user_id:{ // 기본적으로 id가 들어있다.
            type:DataTypes.STRING(30),
            allowNull:false,
            unique:true,//중복 방지
        },
        content:{
            type:DataTypes.STRING(140),
            allowNull:false,
        },

    },{
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci',
    });
    Post.assciate=(db)=>{
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag,{through:'PostHashtag'});
        db.Post.hasMany(db.Commnent);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User,{through:'Like',as:'Likers'});
        db.Post.belongsTo(db.Post,{as:"Shared"});
    }
    return Post;
}