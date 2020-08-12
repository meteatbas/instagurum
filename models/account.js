const Sequelize=require('sequelize');
const connection=require('../controllers/connection');

const Account=connection.define('account',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    fullName:{type:Sequelize.STRING,allowNull:false},
    email:{type:Sequelize.STRING,allowNull:false},
    password:{type:Sequelize.STRING,allowNull:false},
    avatar:{type:Sequelize.STRING},
});

module.exports=Account;