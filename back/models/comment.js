module.exports = (sequelize,DataTypes)=>{
    const Comment = sequelize.define('Comment',{
        content:{
            type:DataTypes.STRING(70),
            allowNull:false,
        },
        //UserId:{}, belongsTo 가 만듦
        //PostId:{},
    },{
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci',
    });
    Comment.assciate=(db)=>{
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    }
    return Comment;
}