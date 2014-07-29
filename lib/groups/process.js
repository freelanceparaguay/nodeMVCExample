/* 
 * App based in tutorial-> http://teknosains.com/i/contoh-modular-nodejs-dan-bootstrap-source-code-inside 
 * Example extended by http://otroblogdetecnologias.blogspot.com
 * Mail: freelanceparaguay@hotmail.com
 * Git Hub: https://github.com/freelanceparaguay
 * July 2014
 * 
 * */

var MODULE_TABLE='groups';

//firt function
exports.getRowServer = function(req,params, fn){
       
    req.getConnection(function(err,connection){
        
        var if_search = '';
        if(params.qsearch !='' && params.filter_by !='')
            if_search +=" AND "+params.filter_by+" LIKE '%"+params.qsearch+"%' ";
        if(params.qsearch !='' && params.filter_by=='')
            if_search +=" AND groupName LIKE '%"+params.qsearch+"%' ";
       
        var query = connection.query('SELECT * FROM '+MODULE_TABLE+' WHERE 1=1 '+if_search+' LIMIT ?,?',[params.offset,params.limit],function(err,rows)
        {            
            if(err)
                return fn(false,err);
     
            countAllUser(req,params,function(total){                
                console.log("Total data : %d",total);
                return fn(true,rows,total);
            });                           
         });         
         console.log(query.sql);
    });
   
};


function countAllUser(req,params,fn){
	
    req.getConnection(function(err,connection){        
        var if_search = '';
        if(params.qsearch !='' && params.filter_by !='')
            if_search +=" AND "+params.filter_by+" LIKE '%"+params.qsearch+"%' ";
        if(params.qsearch !='' && params.filter_by=='')
            if_search +=" AND groupName LIKE '%"+params.qsearch+"%' ";
        
        var query = connection.query('SELECT COUNT(id) as all_total FROM '+MODULE_TABLE+' WHERE 1=1 '+if_search+' ',function(err,rows)
        {        
            if(err){
            	return fn(err);
            }
            return fn(rows[0].all_total);
        });//query    
    });//getConnection
}//countAllUser


exports.saveRowServer = function (req,fn) {
	console.log("saveeee ---->>>");
    var temp = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
    	if(temp.idModal==''){
    		var insert = {
    				id:'0',
    				groupName:temp.field1Modal
    				};
    		connection.query("INSERT INTO "+MODULE_TABLE+" set ? ",insert, function(err, rows){
    			if (err){
    				return fn(false,err);
    			}
    			return fn(true," perfil created");                  
            });//connection.query
            
            }else{                
                var update;                    
                     update = {
                    		 groupName:temp.field1Modal
                             };
                connection.query("UPDATE "+MODULE_TABLE+" set ? WHERE id = ? ",[update,temp.idModal], function(err, rows)
                {          
                  if (err){
                	  return fn(false,err);
                  }
                  return fn(true," perfil Updated");                  
                });//connection.query              
            }//if(temp.idModal==''){
        });//getConnection()        
};//exports.save

exports.deleteRowServer = function(req,fn){     
     var temp = JSON.parse(JSON.stringify(req.body));     
     req.getConnection(function (err, connection) {        
        connection.query("DELETE FROM "+MODULE_TABLE+" WHERE id = ? ",[temp.id], function(err, rows)
        {            
             if(err)
                 return fn(false,err); 
            
             return fn(true," profile deleted");             
        });        
     });
};





10