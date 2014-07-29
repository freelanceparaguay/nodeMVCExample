/*--------------------------------------------------------------
Login Check Logic
=====================
1. First Chek wether requested Username exist in DB (fetch_user)
2. no return Error,
3. if yes, get the password_hash n salt
4. Authenticate them, match the password hash to salt given (authenticate)
5. Done

----------------------------------------------------------------*/


/*fetch the User*/
function fetch_user(req, done){
	console.log("dentro de function fetch_user(req, done)");

     req.getConnection(function (err, connection) {

         var query = connection.query("SELECT * FROM users WHERE ??  = ? ",['username',req.body.username],function(err, rows, fields){    	 
        	console.log("rows"+rows);        	
            if (err){
            
            	console.log("Error %s", err);
            	done(false);    
            }	
            else{
            
	            if(rows.length  > 0)   
	              done(rows); 
	            else 
	            	done(false);           	
            }
        });       
     });
 	console.log("final de function fetch_user(req, done)");
}

/*Authenticate the Password*/
function authenticate(req,hash, fn2) {
	console.log("dentro de authenticate(req,hash, fn)");
 	 if(!module.parent) 
  		console.log('authenticating %s:%s', req.body.username, req.body.password);
 	console.log("antes de llamada fetch_user(req, function(jsonData)");
    fetch_user(req, function(jsonData) {
    	console.log("cuerpo fetch_user");
    	console.log("jsonData="+jsonData);
    	
        if(!jsonData)
            return fn2(false);
            
        if(jsonData[0].username==req.body.username){
        	
        	/*From database*/
        	var password_salt =  jsonData[0].password_salt;
        	var password_hash =  jsonData[0].password_hash;
        	//req.body.password lo que viene del form
        	//convierte el pass a un hash y lo compara
        	hash(req.body.password,password_salt, function(err, hash_pass){  	           
			    if (err) {			    	
			    	console.log(err);
			    	return fn2(false);
			    }
			    
			    if(password_hash == hash_pass){ //check if the hash is the same			    	
			    	var arr_ret = new Array();
			    	var obj = {};
					obj['username'] = jsonData[0].username;
					obj['user_id']  = jsonData[0].id;
					arr_ret.push(obj);
			    	
			    	//console.log("Password match");
			    	return fn2(arr_ret);
			    	
			    }else{
			     
			    	console.log("Password did not match");
			    	console.log("Colocar "+hash_pass);			    	
			        return fn2(false);			  
			    }
			});
        }
        else{
        	
        	console.log("No username match in DB");
        	return fn2(false);
        }
    });
 	console.log("despues de llamada fetch_user(req, function(jsonData)");
	console.log("final de authenticate(req,hash, fn)"); 	
}


exports.check = function (req,hash, fn1) {
	console.log("dentro de la funcion exports.check--->>>");
   authenticate(req,hash, function(result){
	   console.log("en sub funcion llamada authenticate");
	   console.log("resultado authenticate -->"+result);	   
     if(!result)
         return fn1(false);
	
      req.session.regenerate(function(){
        
        req.session.username = result[0].username;
        req.session.user_id = result[0].user_id;
        
        console.log("User { Username :%s , ID : %d } is Logged in",req.session.username,req.session.user_id);
        return fn1(true);
        
      });
       
  });
	console.log("dentro de la funcion exports.check final--->>>");
};


/*------------------------------------------
SEEDING is importan to put a First user 
along with the password and username
------------------------------------------*/

exports.seeding = function(req,hash,fn){
    
    /*----------------------------------------------
        Set it in Global like this,so it can be accessed
        inside the callback function below
     ------------------------------------------------*/
    var users = {
      tj: { username: 'admin' }  // set username
    };
    
    //set password = ganjar
    hash('admin', function(err, salt, hash){
    
        if (err) throw err;
         
         
         users.tj.salt = salt;
         users.tj.hash = hash;
      
         /*Seeding db*/
         req.getConnection(function (err, connection) {
      
            var exape = {username:users.tj.username,password_salt:users.tj.salt,password_hash:users.tj.hash};
            connection.query("INSERT INTO users set ? ",exape, function(err, rows){
      
	          if (err) {
	            
	          	  return fn(false,err); 
	          	   
	          }else{
	          	
	          	  return fn(true," Seeding's done");
	          }

	        });
        });

    }); //end of hash
      
};
