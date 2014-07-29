/* 
 * App based in tutorial-> http://teknosains.com/i/contoh-modular-nodejs-dan-bootstrap-source-code-inside 
 * Example extended by http://otroblogdetecnologias.blogspot.com
 * Mail: freelanceparaguay@hotmail.com
 * Git Hub: https://github.com/freelanceparaguay
 * July 2014
 * 
 * */

//exports.getProfilesList = function(req,idPerfil, fn){       
function getProfilesList(req,idPerfil, fn){
	req.getConnection(function(err,connection){        
        var query = connection.query('select m.moduleName, m.urlModule, g.groupName from modules as m, group_has_module gm, groups as g where g.id=gm.group_id and gm.module_id=m.id and g.id=?',[idPerfil],function(err,rows)    	    	    
        {            
            if(err){
                return fn(false,err);            	
            }else{
            	return fn(true,rows);
            }                                
         });

         console.log(query.sql);
    });   
}; //exports.getProfilesList


//exports.getUserIdProfile = function(req,userName, fn){
function getUserIdProfile(req,userName, fn){
	var subQuery=userName;
    req.getConnection(function(err,connection){    	    	
        var query = connection.query("select groups_id from users where username like '%"+subQuery+"%';",function(err,rows)
        {            
            if(err){
                return fn(false,err);            	
            }else{
            	return fn(true,rows[0].groups_id);
            }                                
         });

         console.log(query.sql);
    });
   
}; //exports.getUserIdProfile


exports.checkModuleAccess = function(req, fn){
	var access=-1;
//	console.log("usuario="+req.session.username+" user_id="+req.session.user_id);
	getUserIdProfile(req,req.session.username,function(status,userIdQ){		
//		console.log("ID Perfiles-->"+userIdQ);
		getProfilesList(req,userIdQ,function(status,dataMenu){
//	    	console.log(req.url+"\n");
//	    	console.log(req._parsedUrl.path+"\n");
	    	//-1 nada
	    	//0 esta encontrada
	    	for(var i=0;i<dataMenu.length;i++){
	    		if(req._parsedUrl.path.indexOf(dataMenu[i].urlModule,0)==0){
//	    			console.log("ENCONTRADO "+i);
	    			access=0; //encontrado
	    			break;
	    		}else{
	    			console.log("NOOO "+i);		    			
	    		}
	    	}
	    			    	
//	    	console.log(dataMenu);

	    	if(access>=0){
//	    		console.log("TIENE ACCESO AL MODULO");
	    	}else{
//	    		console.log("SIN ACCESO");
	    	}
	    	//0 si tiene acceso
	    	// -1 falso
    	    return fn(access,dataMenu); 
		});//getProfilesList						
	});	//getUserIdProfile
	
	
}//exports.checkModuleAccess

