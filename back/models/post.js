module.exports = (sequelize,DataTypes)=>{
    const Post = sequelize.define('Post',{
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