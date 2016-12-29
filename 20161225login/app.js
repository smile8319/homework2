var express = require('express');
var app = express();

var path = require('path');

var fs = require('fs');
var bodyParser=require('body-parser');

var cookieParser=require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'lee'
}));
app.use(express.static(path.resolve()));
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('.html',require('ejs').__express);

//var users=[];
function read(callback){
    fs.readFile('./user.json','utf8',function(err,users){
        try{
            users = JSON.parse(users);
        }catch(err){
            users = [];
        }
        callback(users);
    })
}
function save(users,callback){
    fs.writeFile('./user.json',JSON.stringify(users),function(err){
        callback();
    })
}
app.get('/signup', function (req, res) {
    res.render('signup',{error:req.session.error})
});
app.post('/signup', function (req, res) {
    var user=req.body;
    read(function (users) {
        console.log(users);
        var oldUserName = users.find(function (item) {
            return item.username == user.username;
        });
        if(oldUserName){
            req.session.error = '用户名已存在 请重新注册';
            res.redirect('/signup');
        }else{
            req.session.error = '注册成功';
            users.push(user);
            save(users,function(){
                res.redirect('/signin')
            })

        }
    })

});

app.get('/signin', function (req, res) {
    res.render('signin',{error:req.session.error})
});

app.post('/signin', function (req, res) {
    var user=req.body;
    var users=read(function(users){
        var oldUserName = users.find(function (item) {
            return item.username == user.username && item.password == user.password;

        });

        if(oldUserName){
            req.session.username=user.username;
            res.redirect('/welcome')
        }else{
            req.session.error = '用户名或密码错误 请重新输入';
            res.redirect('/signin');

        }


    });


});


app.get('/welcome', function (req, res) {
    res.render('welcome',{username:req.session.username});
});


app.listen(8080);