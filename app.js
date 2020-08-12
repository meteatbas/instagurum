//Import libraries
const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const multer=require('multer');
const { request } = require('http');

//Create App
const instaApp=express();


//ejs
instaApp.set('view engine','ejs');
instaApp.set('views','views');


//body parser
instaApp.use(bodyParser.urlencoded({extended:false}));
instaApp.use(bodyParser.json());
instaApp.locals.moment=require('moment');



//multer
instaApp.use(express.static(path.join(__dirname,'public')));
instaApp.use('/images',express.static('images'));


//controllers
const indexController=require('./controllers/index');
const postsController=require('./controllers/post');
const connectionController=require('./controllers/connection');



//multer
const fileStorage=multer.diskStorage({
    destination:(request,file,callback)=>{
        callback(null,'public/images');
    },
    filename:(request,file,callback)=>{
        callback(null,file.originalname);
    }
});

instaApp.use(multer({storage:fileStorage,limits:{fileSize:2500000362}}).single('image'));


instaApp.use('/',indexController);
instaApp.use('/posts',postsController);

const port=7070;

connectionController.sync().then(results=>{
    instaApp.listen(port,function(){
        // console.log(results);
        console.log('Server is running on port:'+port);
    });
}).catch(err=>{
    console.log(err);
});

