const Sequelize=require('sequelize');

const connection=new Sequelize(
    'instagraph_db',
    'root',
    'sananelo10',
    {
        dialect:'mysql',
        host:'localhost'
    }
    
);

module.exports=connection;