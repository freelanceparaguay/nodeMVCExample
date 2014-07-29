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
var hash = require('../../pass').hash;
var pagination = require('../../pagination');
var accessMenu = require('../../accessMenu');


app.set('views',__dirname);
app.set('view engine','ejs');

//set module properties
var MODULE_TITLE='Usuarios';
var MODULE_NAME='users';
var MODULE_URL='/users';
var MODULE_NAME_PAGE_RENDER='index'; //without extension .ejs

var LIMIT = pagination.LIMIT;
                
app.get(MODULE_URL,function(req,res){
	//---------------------BEGIN CHECK STATUS-----------------------------------
    if(!req.session.username){
	    res.redirect('/logout');
	} else {
	//si definido entonces, comprobar menues
		accessMenu.checkModuleAccess(req,function(status,dataMenu){
			//-1 not found
			//0 or other access activated
			if(status<0){
	    	    res.redirect('/logout');
			}else{
			  	//--------------------BEGIN BUSSINES LOGIC----------------------------------
	
    var curr_page = (req.query.page != undefined) ? req.query.page : 1;
    var filter_by = (req.query.f != undefined) ? req.query.f : "";
    var qsearch = (req.query.q != undefined) ? req.query.q : "";
    var page  = (req.query.page != undefined) ? req.query.page : 0;
    var offset= (page==0) ? 0 : (page - 1) * LIMIT;
      
    /*Params for DB*/
    var xparams = {    
         curr_page: curr_page,
         filter_by: filter_by,
         qsearch  : qsearch,
         offset   : offset,
         limit    : LIMIT
    }
    
    process.getUser(req,xparams,function(status,data,total_data){
       
       var url = MODULE_URL+'?sort_by='+filter_by+'&q='+qsearch+'&page=';
       //params used in page rendering
       var params = {        
            title : MODULE_TITLE,
            data  : data,
    		dataMenu : dataMenu,  //draw menus urls from BD          
            total_data : total_data,
            pagination : pagination.paging(total_data,curr_page,url),
            curr_page  : curr_page,
            curr_filt  : filter_by,
            curr_search: qsearch,
            sess_user  :(req.session.username) ? req.session.username : '',
            curr_module:MODULE_URL
       };
              
       res.render(MODULE_NAME_PAGE_RENDER,params);     
    });

    
  	//--------------------END BUSSINES LOGIC----------------------------------							
			}//else if(status<0){
		});	//checkModuleAccess	
	}//!req.session.username
//---------------------END CHECK STATUS-----------------------------------    
    
    
});//app.get

app.post(MODULE_URL+'/save',function(req,res){
	//---------------------BEGIN CHECK STATUS-----------------------------------
    if(!req.session.username){
	    res.redirect('/login');
	} else {
	//si definido entonces, comprobar menues
		accessMenu.checkModuleAccess(req,function(status,dataMenu){
			//-1 not found
			//0 or other access activated
			if(status<0){
	    	    res.redirect('/login');
			}else{
  	//--------------------BEGIN BUSSINES LOGIC----------------------------------	
    
    process.save(req,hash,function(status,msg){        
        console.log("Status : %s , message : %s ",status ,msg);
        res.type('json');
        if(!status){
            res.send({ status:"false"});        	
        }
           
        res.send({ status:"true"});           
   });//process.save

  	//--------------------END BUSSINES LOGIC----------------------------------    
			}//else if(status<0){
		});	//checkModuleAccess	
	}//!req.session.username
	//---------------------END CHECK STATUS-----------------------------------
    
});//app.post

app.post(MODULE_URL+'/delete',function(req,res){
	//---------------------BEGIN CHECK STATUS-----------------------------------
    if(!req.session.username){
	    res.redirect('/login');
	} else {
	//si definido entonces, comprobar menues
		accessMenu.checkModuleAccess(req,function(status,dataMenu){
			//-1 not found
			//0 or other access activated
			if(status<0){
	    	    res.redirect('/login');
			}else{
  	//--------------------BEGIN BUSSINES LOGIC----------------------------------
				
				process.delete_user1(req,function(status,msg){
					console.log("Status : %s , message : %s ",status ,msg);
					res.type('json');
					if(!status)
						res.send({ status:"false"});
					res.send({ status:"true"});
				});//delete_user1
				
  	//--------------------END BUSSINES LOGIC----------------------------------
    		}//else if(status<0){
		});	//checkModuleAccess	
	}//!req.session.username
//---------------------END CHECK STATUS-----------------------------------
    
});//app.post
