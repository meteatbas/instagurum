const Sequelize=require('sequelize');
const connection=require('../controllers/connection');

const Post=connection.define('post',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    image:{type:Sequelize.STRING,allowNull:false},
    comments:{type:Sequelize.STRING,allowNull:false},
    userid:{type:Sequelize.INTEGER,allowNull:false},
    likes:{type:Sequelize.INTEGER},
    fullName:{type:Sequelize.STRING,allowNull:false},
    avatar:{type:Sequelize.STRING},
    
});

module.exports=Post;