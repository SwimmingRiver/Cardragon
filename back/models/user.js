module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define('User',{ // Mysql에 user table 생성
        user_id:{ // 기본적으로 id가 들어있다.
            type:DataTypes.STRING(30),
            allowNull:false,
            unique:true,//중복 방지
        },
        name:{
            type:DataTypes.STRING(30),
            allowNull:false,
            unique:true,
        },
        pw:{
            type:DataTypes.STRING(100),
            allowNull:false,
            
        },
        on:{
            type:DataTypes.BOOLEAN(),
            allowNull:false,
            
        },
    },{
        charset:'utf8',
        collate:'utf8_general_ci',
    });
    User.assciate=(db)=>{
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post,{through:'Like', as:'Liked'});
    }
    return User;
}