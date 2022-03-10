const express=require('express');
const app=express();
const Pool=require('pg').Pool;
const path=require('path');
const authRouter=require("./src/Routers/auth_Router");
const expressLayout=require('express-ejs-layouts');
const flash=require('connect-flash');
const session=require('express-session');

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const poolInstance=require("./src/config/database");

require('dotenv').config();
app.set('view engine','ejs');
app.use(expressLayout);

app.use(express.static('public'));

app.set('views',path.resolve(__dirname,'./src/views'));

//req ten gelen degerleri okumak için urlencoded yapmamız lazım
app.use(express.urlencoded({extended: true }));

app.use(session({
   secret:'process.env.SESSION_SECRET',
   resave:false,
   saveUninitialized:true
 }));

app.use(flash());
app.use((req,res,next)=>{
  res.locals.loginMistakes=req.flash('loginMistakes');
  res.locals.roleFail=req.flash('roleFail');
  next();
});

app.use('/',authRouter);


app.listen(process.env.PORT,()=>{
    console.log(`Server ${process.env.PORT}portundan ayaklandi`)
    poolInstance.pool.connect(err => {
        if (err) {
          console.error('connection error', err.stack)
        } else {
          console.log('DB connected')
        }
      });
   
});

