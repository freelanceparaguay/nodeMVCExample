var express = require('express');
var app = module.exports = express();
var process = require('./process');
var pagination = require('../../pagination');
var accessMenu = require('../../accessMenu');

app.set('views',__dirname);
app.set('view engine','ejs');


//set module properties
var MODULE_TITLE='Pruebas APIS';
var MODULE_NAME='apis';
var MODULE_URL='/apis';
var MODULE_NAME_PAGE_RENDER='index'; //without extension .ejs

//limit total rows to display in html
//used in paging
var LIMIT = pagination.LIMIT;

//------------------------------------------
// Set routes y methods GET and POST
//------------------------------------------
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
			     
			    //params used in pagination
			    var xparams = {    
			         curr_page: curr_page,
			         filter_by: filter_by,
			         qsearch  : qsearch,
			         offset   : offset,
			         limit    : LIMIT
			    }
			    
			    process.getRowServerHeader(req,xparams,function(status,data,total_data){
			    	//set and url, this is useful when the client make querys
			    	//Example '/profiles?sort_by='+filter_by+'&q='+qsearch+'&page=';
			    	//
			       var url = MODULE_URL+'?sort_by='+filter_by+'&q='+qsearch+'&page=';

			       //params used in page rendering
			       var params = {        
			            title : MODULE_TITLE,
			            data  : data,
			    		dataMenu : dataMenu,  //draw menus urls from BD 
			    		dataDetails: [],
			            total_data : total_data,
			            pagination : pagination.paging(total_data,curr_page,url),
			            curr_page  : curr_page,
			            curr_filt  : filter_by,
			            curr_search: qsearch,
			            sess_user  :(req.session.username) ? req.session.username : '',
			            curr_module:MODULE_URL
			       };
			       //debug this
			       //console.log(params);
			       //verificar dentro de los arhivos .ejs, el arreglo data. El mismo contiene
			       //datos de la BD para desplegarlos
			       if(data.length){ 
			    	   process.getRowServerDetail(req,data[0].id,function(status,dataDetails){
				    		params.dataDetails=dataDetails;
				    		//arma con detalles
					       res.render(MODULE_NAME_PAGE_RENDER,params);				    	
			    	   });//details
			       }else{
			    	   //arma sin detalles
				       res.render(MODULE_NAME_PAGE_RENDER,params);
			       }//undefined     


			    });			    			    
			  	//--------------------END BUSSINES LOGIC----------------------------------							
			}//else if(status<0){
		});	//checkModuleAccess	
	}//!req.session.username
	//---------------------END CHECK STATUS-----------------------------------
    
});//app.get


app.get(MODULE_URL+"/detail",function(req,res){
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
				var idQuery;			    
			    if(req.query.idQuery == undefined){
			    	idQuery="1";
			    }else{
			    	idQuery=req.query.idQuery;
			    }
			    			    			       
				    process.getRowServerDetail(req,idQuery,function(status,dataDetails){
					       //params used in page rendering
					       var params = {        
					            title : MODULE_TITLE,
					            dataDetails  : dataDetails,
					            sess_user  :(req.session.username) ? req.session.username : ''
					       };
					       
				    	res.render("details",params);				    	
				    });//details
     
			    
			  	//--------------------END BUSSINES LOGIC----------------------------------							
			}//else if(status<0){
		});	//checkModuleAccess	
	}//!req.session.username
	//---------------------END CHECK STATUS-----------------------------------
    
});//app.get

//APIS PARA JSON
//ejemplo de llamada
//http://127.0.0.1:3720/groupsmodules/detailJSON?idQuery=1
app.get(MODULE_URL+"/detailJSON",function(req,res){
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
				var idQuery;			    
			    if(req.query.idQuery == undefined){
			    	idQuery="1";
			    }else{
			    	idQuery=req.query.idQuery;
			    }			    			    			       
				    process.getRowServerDetail(req,idQuery,function(status,dataDetails){
					       res.json(dataDetails);			    	
				    });//details     			    
			  	//--------------------END BUSSINES LOGIC----------------------------------							
			}//else if(status<0){
		});	//checkModuleAccess	
	}//!req.session.username
	//---------------------END CHECK STATUS-----------------------------------    
});//app.get



