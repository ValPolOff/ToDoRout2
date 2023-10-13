const sequelize = require('../db')

const {DataTypes} = require('sequelize')

const User = sequelize.define('User',{
    id:{type:DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
    email:{type:DataTypes.STRING, unique:true},
    password:{type:DataTypes.STRING},
    role:{type:DataTypes.STRING, defaultValue: "USER"},
})

const Post = sequelize.define('Post',{
    id:{type:DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
    text:{type:DataTypes.STRING},
    data:{type:DataTypes.INTEGER},
    completed:{type:DataTypes.BOOLEAN, defaultValue: false},
    //role:{type:DataTypes.BOOLEAN, defaultValue: false},
})



module.exports = {
    User,
    Post,
}