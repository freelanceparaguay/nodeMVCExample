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
var process = require('./process');
var pagination = require('../../pagination');
var accessMenu = require('../../accessMenu');


app.set('views',__dirname);
app.set('view engine','ejs');

app.get('/dashboard',function(req,res){
	//---------------------BEGIN CHECK STATUS-----------------------------------
    if(!req.session.username){
	    res.redirect('/logout');
	} else {
	//si definido entonces, comprobar menues
		accessMenu.checkModuleAccess(req,function(status,dataMenu){
			//-1 not found
			//0 or other access activated
			if(status<0){
//	    	    res.redirect('/logout');
			}else{
			  	//--------------------BEGIN BUSSINES LOGIC----------------------------------    
    
				res.render('dashboard.ejs',{        
					sess_user : (req.session.username) ? req.session.username : '',
					dataMenu : dataMenu
				});
    
  	//--------------------END BUSSINES LOGIC----------------------------------							
			}//else if(status<0){
		});	//checkModuleAccess	
	}//!req.session.username
	//---------------------END CHECK STATUS-----------------------------------
    
});//app.get
