/* 
 * App based in tutorial-> http://teknosains.com/i/contoh-modular-nodejs-dan-bootstrap-source-code-inside 
 * Example extended by http://otroblogdetecnologias.blogspot.com
 * Mail: freelanceparaguay@hotmail.com
 * Git Hub: https://github.com/freelanceparaguay
 * July 2014
 * 
 * */

var express = require('express');
var app = module.exports = express();
var http = require('http');
var mysql = require('mysql');

var connection  = require('express-myconnection');

/*----------------------------------
    Setup main environments
------------------------------------*/
app.set('port',process.env.PORT || 3720);
app.use(express.logger('dev'));
app.set('views',__dirname);
app.use(express.static(__dirname + '/public')); // set this for static load assests

app.set('view engine','ejs');
/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/
//set password and data base
app.use(
        connection(mysql,{
                host: 'localhost',
                user: 'usuario',
                password : 'miclave',
                port : 3306, //port mysql
                database:'nodeDataBase'
         },'request')
);


/*-----------------------------------
    Set routes and middleware
-----------------------------------*/

//this is how to get the current url, it would be useful in future
app.use(setCurrentUrl);

function setCurrentUrl(req, res, next) {
	console.log("req.originalUrl->"+req.originalUrl);
	app.set('CURR_URL', req.protocol + '://' + req.get('host') + req.originalUrl);
    next();
}

//need to be Above app.router
app.use(express.cookieParser('codetrash.com, very secret ssssstttt'));
app.use(express.session());

/*----------------------------------------------------------
Every lib/module folder created, need to be registered here
------------------------------------------------------------*/
var login = require('./lib/login');
var users = require('./lib/users');
var dashboard = require('./lib/dashboard');
var groups = require('./lib/groups');
var modules = require('./lib/modules');
var groupsModules = require('./lib/groupsModules');
var apis = require('./lib/apis');

//add a line with your module
app.use(express.json());
app.use(express.urlencoded());
app.use(login);
app.use(users);
app.use(dashboard);
app.use(groups);
app.use(modules);
app.use(groupsModules);
app.use(apis);
/*---------------------------------------------
Let's handle some Errors
----------------------------------------------*/
app.use(function(req,res,fn){

    res.render('error_page',{status:404,url:req.url,error:'Oooops ! Page not Found'});
});

app.use(function(err, req, res, next){

  res.render('error_page', {
      status: err.status || 500
    , error: err
  });
});


app.use(app.router);

/*Create server*/
http.createServer(app).listen(app.get('port'),function(){

    console.log('Listening port : %s ', app.get('port'));
});
