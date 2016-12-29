var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var users=[];
app.set('view engine','ejs');
app.set('views',path.resolve('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve('public')));
app.get('/signup', function(req, res) {
    res.render('signup',{});
    var content = fs.readFileSync('./user.json', 'utf8');
    content = content || '[]';
    content = JSON.parse(content);

});
app.post('/signup', function(req, res) {
    users.push(req.body);
    res.redirect('/login');

});
app.get('/login',function(req,res){
    res.render('login',{});
});

app.post('/login',function(req,res){
    var userNew=users.find(function (item){
        console.log(item.username);
        console.log(req.body.username);
        return item.username==req.body.username&&item.password==req.body.password;

});
    if(userNew) {
        res.redirect('/welcome');
    }else{
        res.redirect('/login');
    }
});
app.get('/welcome',function (req,res){
    res.render('welcome',{});
});


app.listen(8080);