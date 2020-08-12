const express=require('express');
const router=express.Router();
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

const accountSchema=require('../models/account');
const { response } = require('express');




router.get('/',(req,res,next)=>{
    res.render('index',{

        title:"Welcome to instagram"
    });
});


router.get('/register',(req,res,next)=>{
    res.render('register',{

        title:"Welcome to instagram"
    });
});

router.post('/login',(req,res,next)=>{

    const email=req.body.email;
    const password=req.body.password;

    accountSchema.findOne({where:{email:email}}).then(account=>{

        if (account) {
            bcryptjs.compare(password,account.password).then(isPasswordMatch=>{
                if (isPasswordMatch) {
                    res.redirect('/posts')
                }else{  
                    console.log("Password dont match");
                }
            })
        }
    });
});

router.post('/signup',(req,res,next)=>{
    const fullName=req.body.fullName; //we get it from register.ejs input "name"
    const email=req.body.email;
    const password=req.body.password;
    const avatar=req.file;

    console.log(avatar);


    accountSchema.findOne({where:{email:email}}).then(account=>{
        if (account) {
            console.log('User exist');
        }else{
            return bcryptjs.hash(password,12).then(hashPassword=>{
                accountSchema.create({
                    fullName:fullName,
                    email:email,
                    password:hashPassword,
                    avatar:avatar.filename
                }).then(newAccount=>{

                    const dataToToken={
                        id:newAccount.id,
                        name:newAccount.fullName,
                        avatar:newAccount.avatar
                    }

                    jwt.sign({dataToToken},'8VKO49MQna7ksldvKQbUlqB4yZw4Npes',(err,token)=>{
                        console.log(token);
                        res.redirect('/');
                    })
                    
                })
            })
        }
    })
    // console.log(jwt);
});

module.exports=router;