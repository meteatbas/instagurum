const express=require('express');
const router=express.Router();
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

const accountSchema=require('../models/account');
const postSchema=require('../models/post');
const { post } = require('.');


router.get('/profile/:id',(req,res,next)=>{
    const id=req.params.id;
        postSchema.findAll({where:{userid:id}}).then(posts=>{

        posts.sort(function(b,a){
            return a.id - b.id
        })
        console.log(posts.length);
        res.render('profile',{
            posts:posts
        });
    });

});


router.get('/',(req,res,next)=>{
    postSchema.findAll().then(posts=>{

        posts.sort(function(b,a){
            return a.id - b.id
        })

        res.render('posts',{
            posts:posts
        });
    });

});


router.post('/uploadImage',(req,res,next)=>{
    const token=req.body.token;
    const comment=req.body.comments;
    const image=req.file;

    jwt.verify(token,'8VKO49MQna7ksldvKQbUlqB4yZw4Npes',(err,data)=>{
        if(err){
            console.log('Your token is not valid');
        }else{
            

            postSchema.create({
                image:image.filename,
                comments:comment,
                userid:data.dataToToken.id,
                likes:0,
                fullName:data.dataToToken.name,
                avatar:data.dataToToken.avatar                
            }).then(upload=>{
                res.redirect('/posts');
            })

            
        }
    })

});

module.exports=router;